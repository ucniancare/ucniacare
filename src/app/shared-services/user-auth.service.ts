import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { catchError, finalize, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { DataSecurityService } from './data-security.service';
import { LOCALSTORAGECONSTS } from '../constants/local-storage.constants';
import { User } from '../shared-interfaces/user';
import { EmailJsService } from './email-js.service';
import { OTPTemplateForm } from '../shared-interfaces/otp';
import { OTPModel } from '../shared-models/otp.model';
import { MessageService } from 'primeng/api';
import { ChangePasswordService } from '../change-password/change-password.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(
        private firebaseService: FirebaseService,
        private localStorageService: LocalStorageService,
        private userService: UserService,
        private emailJsService: EmailJsService,
        private messageService: MessageService,
        private changePasswordService: ChangePasswordService,
        private router: Router
    ) {

    }

    public loginUser(idNumber: string, password: string): Observable<User | null> {
        return this.firebaseService.authenticateUser$(idNumber, password).pipe(
            switchMap((user: UserAccount | null) => {                
                if (!user) return of(null);

                if (user.isFirstLogin) {
                    this.changePasswordService.changePasswordData.set({
                        userAccountData: user,
                        changePasswordType: 'changePasswordFirstTime'
                    });
                    this.router.navigate(['/change-password']);
                    return of(null);
                }

                // Set local storage for userAccount
                this.localStorageService.set(LOCALSTORAGECONSTS.USERACCOUNT, user);
                this.userService.setCurrentUserAccount(user);

                return this.firebaseService.updateData$(COLLECTION.USERACCOUNTS.COLLECTIONNAME, user.id!, { isLoggedIn: true, lastLogin: new Date() }).pipe(
                    switchMap(() => 
                        this.firebaseService.getDataByField$<User>(
                            COLLECTION.USERS.COLLECTIONNAME,
                            COLLECTION.USERS.FIELDS.USERACCOUNTID,
                            this.userService.getCurrentUserAccount()?.id
                        )
                    ),
                    map(users => {
                        const updatedUser = users[0] ?? null;
                        if (updatedUser) {
                            this.localStorageService.set(LOCALSTORAGECONSTS.USER, updatedUser);
                            this.userService.setCurrentUser(updatedUser);
                        }
                        return updatedUser;
                      }),
                    catchError(() => {
                        this.userService.clearUserServiceData();
                        return of(null);
                    })
                )
            }),
            catchError(() => of(null)) 
        );
    }

    public logoutUser(): Observable<boolean> {
        return this.firebaseService.updateData$(COLLECTION.USERACCOUNTS.COLLECTIONNAME, this.userService.getCurrentUserAccount()!.id!, { isLoggedIn: false, }).pipe(
            map(() => {
                this.localStorageService.clear();
                this.userService.clearUserServiceData();
                return true;
            }),
            catchError(() => {
                this.userService.clearUserServiceData();
                return of(false);
            })
        );
    }

    public sendOTP(data: OTPTemplateForm): Observable<boolean> {
        return this.firebaseService.getAllData$<OTPTemplateForm>(COLLECTION.OTPS.COLLECTIONNAME, OTPModel.fromJson).pipe(
            take(1), 
            switchMap((otps: OTPTemplateForm[]) => {
                const existingOTP = otps.find(otp => otp.email === data.email);
                
                if (existingOTP && existingOTP.validUntil) {
                    const validUntilDate = new Date(existingOTP.validUntil);
                    const currentTime = new Date();
                    
                    if (currentTime < validUntilDate) {
                        const remainingTime = Math.ceil((validUntilDate.getTime() - currentTime.getTime()) / (1000 * 60)); // minutes
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'OTP Already Sent',
                            detail: `An email has already been sent to this address. You can request a new OTP in ${remainingTime} minute(s).`,
                            life: 5000
                        });
                        return of(false);
                    }
                    
                }

                return this.firebaseService.deleteDataByField$(COLLECTION.OTPS.COLLECTIONNAME, COLLECTION.OTPS.FIELDS.EMAIL, data.email).pipe(
                    switchMap(() => 
                        this.firebaseService.addData$<OTPTemplateForm>(COLLECTION.OTPS.COLLECTIONNAME, data, OTPModel.toJson, OTPModel.fromJson)
                    )
                );
            }),
            switchMap(result => {
                if (result === false) {
                    return of(false);
                }
                
                if (result) {
                    return this.emailJsService.sendEmail(data);
                } else {
                    console.error('Failed to add OTP to Firebase');
                    return of(false);
                }
            }),
            map((result) => {
                return result;  
            }),
            catchError((error) => {
                console.error('Error in OTP process:', error);
                return of(false);
            })
        );
    }




}
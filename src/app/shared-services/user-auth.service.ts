import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { catchError, finalize, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { DataSecurityService } from './data-security.service';
import { LOCALSTORAGECONSTS } from '../constants/local-storage.constants';
import { User } from '../shared-interfaces/user';
import { EmailJsService } from './email-js.service';


@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(
        private firebaseService: FirebaseService,
        private localStorageService: LocalStorageService,
        private userService: UserService,
        private emailJsService: EmailJsService
    ) {

    }

    public loginUser(idNumber: string, password: string): Observable<UserAccount | null> {
        return this.firebaseService.authenticateUser$(idNumber, password).pipe(
            switchMap(user => {                
                if (!user) return of(null);

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
        console.log('user',this.userService.getCurrentUserAccount());
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

    public sendOTP(data: Record<string, unknown>): Observable<boolean> {
        return this.emailJsService.sendEmail(data).pipe(
            map((result) => {
                return result;
            }),
            catchError((error) => {
                console.error('Error sending OTP:', error);
                return of(false);
            })
        );
    }




}
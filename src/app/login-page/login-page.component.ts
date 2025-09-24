import { Component, computed, OnInit, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../shared-services/firebase.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserAccount } from '../shared-interfaces/user-account';
import { UserAccountModel } from '../shared-models/user-account.model';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserAuthService } from '../shared-services/user-auth.service';
import { MessageModule } from 'primeng/message';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { SpinnerOverlayService } from '../shared-services/primeng-services/spinner-overlay.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarOverlayService } from '../shared-services/primeng-services/progress-bar-overlay.service';
import { DataSecurityService } from '../shared-services/data-security.service';
import { User } from '../shared-interfaces/user';
import { UserService } from '../shared-services/user.service';
import { UserModel } from '../shared-models/user.model';
import { OTPTemplateForm } from '../shared-interfaces/otp';
import { OTPUtil } from '../shared-utils/otp-util';
import { InputOtpModule } from 'primeng/inputotp';
import { ChangePasswordData, ChangePasswordService } from '../change-password/change-password.service';
import { PasswordModule } from 'primeng/password';
@Component({
    selector: 'app-login-page',
    imports: [
        DividerModule, 
        ButtonModule, 
        InputTextModule,
        CardModule,
        FloatLabelModule,
        CommonModule,
        FormsModule,
        MessageModule,
        ProgressBarModule,
        ReactiveFormsModule,
        InputOtpModule,
        PasswordModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: true,
})
export class LoginPageComponent implements OnInit{

    protected loginErrorMessage = signal<string>('');
    protected isLoading = signal<boolean>(false);
    protected pageState = signal<string>('login');
    protected header = signal<string>('Login to your account');
    protected isOTPSent = signal<boolean>(false);
    protected otp = signal<string>('');

    protected loginForm = new FormGroup({
        idNumber: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    protected forgotPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    constructor(
        private firebaseService: FirebaseService, 
        private router: Router,
        private messageService: MessageService,
        private userAuthService: UserAuthService,
        private localStorageService: LocalStorageService,
        private spinnerOverlayService: SpinnerOverlayService,
        private progressBarOverlayService: ProgressBarOverlayService,
        private dataSecurityService: DataSecurityService,
        private userService: UserService,
        private changePasswordService: ChangePasswordService
    ) {
    }

    ngOnInit(): void {
        this.pageState.set('login');
        this.header.set('Login to your account');
    }

    protected login(): void {
        this.isLoading.set(true);
        this.progressBarOverlayService.show();
        this.loginErrorMessage.set(''); // Clear previous errors
        
        this.userAuthService.loginUser(this.loginForm.get('idNumber')?.value?.toString() || '', this.loginForm.get('password')?.value?.toString() || '').pipe(
            tap((user: User | null) => {
                if (user) {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Welcome!', 
                        detail: 'Login successful',
                        life: 3000
                    });
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.loginErrorMessage.set('Invalid ID number or password.');
                }
            }),
            catchError(error => {
                console.error('Login error:', error);
                this.loginErrorMessage.set('An error occurred during login. Please try again.');
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Login Failed', 
                    detail: 'An error occurred during login. Please try again.',
                    life: 5000
                });
                return of(null);
            }),
            finalize(() => {
                this.progressBarOverlayService.hide();
                this.isLoading.set(false);
            })
        ).subscribe();
    }

    public addUserForTesting(): void {
        // const password = '123';
        // const userAccount: UserAccount = {
        //     ucIdNumber: '123',
        //     password: this.dataSecurityService.encryptData(password),
        //     isLoggedIn: false,
        //     lastLogin: new Date(),
        //     metaData: {
        //         createdAt: new Date(),
        //         createdBy: '123123123',
        //         updatedAt: new Date(),
        //         updatedBy: '123123123'
        //     }
        // }

        // this.firebaseService.addData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, userAccount).pipe(
        //     tap(user => console.log('user added: ', user)),
        //     catchError(err => {
        //         return of(null);
        //     })
        // ).subscribe();

    }

    // public addUser() {
    //     const user: User = {
    //         userAccountId: this.userService.currentUserAccount()?.id,
    //         firstName: 'Super',
    //         lastName: 'Admin',
    //         middleName: '',
    //         extName: '',
    //         sex: 'Male',
    //         email: 'super@admin.com',
    //         phoneNumber: '09997527570',
    //         dateOfBirth: new Date(),
    //         maritalStatus: 'Single',
    //         userRoles: ['admin'],
    //         profilePicture: '',
    //         metaData: {
    //             createdAt: new Date(),
    //             createdBy: '123123123',
    //             updatedAt: new Date(),
    //             updatedBy: '123123123'
    //         }
    //     }
    
    //     this.firebaseService.addData$<User>(COLLECTION.USERS.COLLECTIONNAME, user, UserModel.toJson, UserModel.fromJson).pipe(
    //         tap(user => console.log('user added: ', user)),
    //         catchError(err => {
    //             return of(null);
    //         })
    //     ).subscribe();
    // }


    


    protected setForgotPasswordState(): void {
        this.pageState.set('forgotPassword');
        this.header.set('Forgot Password');
        this.loginErrorMessage.set(''); // Clear any login errors
        this.forgotPasswordForm.reset(); // Reset forgot password form
    }

    protected setLoginState(): void {
        this.pageState.set('login');
        this.header.set('Login to your account');
        this.loginErrorMessage.set('');
        this.loginForm.reset();
    }

    protected disableLoginButton(): boolean {
        return !this.loginForm.get('idNumber')?.value || !this.loginForm.get('password')?.value || this.isLoading();
    }

    protected disableForgotPasswordButton(): boolean {
        return this.forgotPasswordForm.invalid || this.isLoading();
    }

    protected forgotPassword(): void {
        this.isLoading.set(true);
        this.spinnerOverlayService.show('Verifying email...');
        this.firebaseService.getDataByField$<User>(COLLECTION.USERS.COLLECTIONNAME, COLLECTION.USERS.FIELDS.EMAIL, this.forgotPasswordForm.get('email')?.value || '').pipe(
            tap(users => {
                if (users && users.length > 0) {
                    // Email exists, proceed to send OTP
                    this.spinnerOverlayService.show('Sending OTP...');
                    
                    const data: OTPTemplateForm = OTPUtil.generateOTP(this.forgotPasswordForm.get('email')?.value || '');
                    this.userAuthService.sendOTP(data).pipe(
                        tap(success => {
                            if (success) {
                                this.messageService.add({ 
                                    severity: 'success', 
                                    summary: 'Email Sent!', 
                                    detail: 'Please check your email for the reset code. The code will expire in 15 minutes.',
                                    life: 5000
                                });
                                this.isOTPSent.set(true);
                            } else {
                                this.messageService.add({ 
                                    severity: 'error', 
                                    summary: 'Error', 
                                    detail: 'Failed to send reset code. Please try again.',
                                    life: 5000
                                });
                            }
                        }),
                        catchError(error => {
                            console.error('Send OTP error:', error);
                            this.messageService.add({ 
                                severity: 'error', 
                                summary: 'Error', 
                                detail: 'An unexpected error occurred while sending the reset code. Please try again later.',
                                life: 5000
                            });
                            return of(false);
                        }),
                        finalize(() => {
                            this.spinnerOverlayService.hide();
                            this.isLoading.set(false);
                        })
                    ).subscribe();
                }
            }),
            catchError(error => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Email Not Found', 
                    detail: 'The email address you entered is not associated with any account. Please check your email and try again.',
                    life: 5000
                });
                this.spinnerOverlayService.hide();
                this.isLoading.set(false);
                return of(null);
            })
        ).subscribe();
    }

    protected verifyOTP(): void {
        this.isLoading.set(true);
        this.spinnerOverlayService.show('Verifying OTP...');
        
        this.firebaseService.getDataByField$<OTPTemplateForm>(COLLECTION.OTPS.COLLECTIONNAME, COLLECTION.OTPS.FIELDS.EMAIL, this.forgotPasswordForm.get('email')?.value || '').pipe(
            tap(otp => {
                if (otp.length > 0) {
                    const otpData: OTPTemplateForm = otp[0];;
                    if (otpData.validUntil && otpData.validUntil > new Date().toISOString()) {
                        if (otpData.otp === this.otp()) {
                            this.firebaseService.getDataByField$<User>(
                                COLLECTION.USERS.COLLECTIONNAME, 
                                COLLECTION.USERS.FIELDS.EMAIL, 
                                this.forgotPasswordForm.get('email')?.value || ''
                            ).pipe(
                                tap(users => {
                                    if (users.length > 0) {
                                        const user = users[0];
                                        this.firebaseService.getData$<UserAccount>(
                                            COLLECTION.USERACCOUNTS.COLLECTIONNAME, 
                                            user.userAccountId || ''
                                        ).pipe(
                                            tap((userAccount: UserAccount) => {
                                                const changePasswordData: ChangePasswordData = {
                                                    userAccountData: userAccount,
                                                    changePasswordType: 'changePassword'
                                                };
                                                this.changePasswordService.changePasswordData.set(changePasswordData);
                                                this.router.navigate(['/change-password']);
                                            })
                                        ).subscribe();
                                    }
                                })
                            ).subscribe();
                            
                        }
                        else {
                            this.messageService.add({ 
                                severity: 'error', 
                                summary: 'Error', 
                                detail: 'Invalid OTP. Please try again.',
                                life: 5000
                            });
                        }
                    }
                    else {
                        this.messageService.add({ 
                            severity: 'error', 
                            summary: 'Error', 
                            detail: 'OTP has expired. Please request a new OTP.',
                            life: 5000
                        });
                    }
                }
            }),
            catchError(error => {
                console.error('Verify OTP error:', error);
                return of(null);
            }),
            finalize(() => {
                this.spinnerOverlayService.hide();
                this.isLoading.set(false);
            })
        ).subscribe();
    }

    protected resendOTP(): void {

        this.isLoading.set(true);
        this.spinnerOverlayService.show('Resending OTP...');

        this.otp.set('');
        const data: OTPTemplateForm = OTPUtil.generateOTP(this.forgotPasswordForm.get('email')?.value || '');
        this.firebaseService.deleteDataByField$(COLLECTION.OTPS.COLLECTIONNAME, COLLECTION.OTPS.FIELDS.EMAIL, data.email).pipe(
            switchMap(() => 
                this.userAuthService.sendOTP(data)
            ),
            tap(success => {
                if (success) {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Email Sent!', 
                        detail: 'A new reset code has been sent to your email. The code will expire in 15 minutes.',
                        life: 5000
                    });
                } else {
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Failed to Resend', 
                        detail: 'Failed to resend the reset code. Please try again.',
                        life: 5000
                    });
                }
            }),
            catchError(error => {
                console.error('Resend OTP error:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'An unexpected error occurred while resending. Please try again later.',
                    life: 5000
                });
                return of(false);
            }),
            finalize(() => {
                this.spinnerOverlayService.hide();
                this.isLoading.set(false);
            })
        ).subscribe();
    }

}

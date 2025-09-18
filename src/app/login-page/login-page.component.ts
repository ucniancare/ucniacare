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
import { catchError, finalize, of, tap } from 'rxjs';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserAuthService } from '../shared-services/user-auth.service';
import { MessageModule } from 'primeng/message';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { SpinnerOverlayService } from '../shared-services/spinner-overlay.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarOverlayService } from '../shared-services/progress-bar-overlay.service';
import { DataSecurityService } from '../shared-services/data-security.service';
import { User } from '../shared-interfaces/user';
import { UserService } from '../shared-services/user.service';
import { UserModel } from '../shared-models/user.model';
import { OTPTemplateForm } from '../shared-services/email-js.service';
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
        ReactiveFormsModule
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
        private userService: UserService
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
        
        this.userAuthService.loginUser(this.loginForm.get('idNumber')?.value || '', this.loginForm.get('password')?.value || '').pipe(
            tap(user => {
                if (user) {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Welcome!', 
                        detail: 'Login successful',
                        life: 3000
                    });
                    this.router.navigate(['/dashboard']);
                } else {
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
        //     ucIdNumber: 'admin',
        //     password: this.dataSecurityService.encrypData(password),
        //     isLoggedIn: false,
        //     lastLogin: new Date(),
        //     metaData: {
        //         createdAt: new Date(),
        //         createdBy: '123123123',
        //         updatedAt: new Date(),
        //         updatedBy: '123123123'
        //     }
        // }

        // this.firebaseService.addData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, userAccount, UserAccountModel.toJson, UserAccountModel.fromJson).pipe(
        //     tap(user => console.log('user added: ', user)),
        //     catchError(err => {
        //         return of(null);
        //     })
        // ).subscribe();

    }

    protected setForgotPasswordState(): void {
        this.pageState.set('forgotPassword');
        this.header.set('Forgot Password');
        this.loginErrorMessage.set(''); // Clear any login errors
        this.forgotPasswordForm.reset(); // Reset forgot password form
    }

    protected setLoginState(): void {
        this.pageState.set('login');
        this.header.set('Login to your account');
        this.loginErrorMessage.set(''); // Clear any login errors
        this.loginForm.reset(); // Reset login form
    }

    protected disableLoginButton(): boolean {
        return !this.loginForm.get('idNumber')?.value || !this.loginForm.get('password')?.value || this.isLoading();
    }

    protected disableForgotPasswordButton(): boolean {
        return this.forgotPasswordForm.invalid || this.isLoading();
    }

    protected forgotPassword(): void {
        const code: string = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('code: ', code);
        this.isLoading.set(true);
        this.spinnerOverlayService.show('Sending reset email...');

        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000);
        
        const data: OTPTemplateForm = {
            email: this.forgotPasswordForm.get('email')?.value || '',
            otp: code,
            time: expirationTime.toLocaleTimeString() 
        }

        this.userAuthService.sendOTP(data).pipe(
            tap(success => {
                if (success) {
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Email Sent!', 
                        detail: 'Please check your email for the reset code. The code will expire in 15 minutes.',
                        life: 5000
                    });
                } 
        
                else {
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Failed to Send Email', 
                        detail: 'Unable to send reset email. Please check your email address and try again.',
                        life: 5000
                    });
                }
            }),
            catchError(error => {
                console.error('Forgot password error:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'An unexpected error occurred. Please try again later.',
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

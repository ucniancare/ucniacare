import { Component, computed, OnInit, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        ProgressBarModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: true,
})
export class LoginPageComponent implements OnInit{


    protected idNumber: string = '';
    protected password: string = '';

    protected loginErrorMessage = signal<string>('');
    protected isLoading = signal<boolean>(false);

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
    }

    protected login(): void {
        this.isLoading.set(true);
        this.progressBarOverlayService.show();
        this.userAuthService.loginUser(this.idNumber, this.password).pipe(
            tap(user => {
                if (user) {
                    this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Login successful' });
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.loginErrorMessage.set('Invalid ID number or password.');
                }
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

    protected disableLoginButton(): boolean {
        return !this.idNumber || !this.password || this.isLoading();
    }

}

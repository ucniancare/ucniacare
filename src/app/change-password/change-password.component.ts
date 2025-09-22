import { Component, computed, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Route, Router, RouterModule } from '@angular/router';
import { ChangePasswordData, ChangePasswordService } from './change-password.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirebaseService } from '../shared-services/firebase.service';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserAccount } from '../shared-interfaces/user-account';
import { SpinnerOverlayService } from '../shared-services/primeng-services/spinner-overlay.service';
import { catchError, finalize, of, tap, switchMap } from 'rxjs';
import { DataSecurityService } from '../shared-services/data-security.service';
import { DialogOverlayService } from '../shared-services/primeng-services/dialog-overlay.service';
import { CHANGE_PASSWORD_TYPE } from './change-password.consts';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'change-password',
    imports: [
        ButtonModule, 
        InputTextModule,
        CardModule,
        FloatLabelModule,
        CommonModule,
        FormsModule,
        PasswordModule,
        RouterModule,
        MessageModule
    ],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css',
    standalone: true,
})
export class ChangePasswordComponent implements OnInit{

    protected isLoading = signal<boolean>(false);
    protected password = signal<string>('');
    protected confirmPassword = signal<string>('');
    protected changePasswordMessage = signal<string>('');
    protected changePasswordData = signal<ChangePasswordData | null>(null);


    constructor(
        private changePasswordService: ChangePasswordService,
        private messageService: MessageService,
        private firebaseService: FirebaseService,
        private spinnerOverlayService: SpinnerOverlayService,
        private dataSecurityService: DataSecurityService,
        private dialogOverlayService: DialogOverlayService,
        private router: Router,
        private confirmationService: ConfirmationService
    ){

    }

    ngOnInit(): void {
        this.changePasswordData.set(this.changePasswordService.changePasswordData());
        this.changePasswordMessage.set(this.changePasswordData()?.changePasswordType === CHANGE_PASSWORD_TYPE.CHANGE_PASSWORD_FIRST_TIME ? 'Since this is your first time logging in, we require you to change your password.' : '');
    }

    protected onChangePassword(): void {
        if (this.password() === this.confirmPassword()) {
            this.isLoading.set(true);
            this.spinnerOverlayService.show('Updating password...');

            const encrypedPassword = this.dataSecurityService.encryptData(this.password());
            const userId = this.changePasswordData()!.userAccountData?.id || '';
            const isFirstTimeLogin = this.changePasswordData()?.changePasswordType === CHANGE_PASSWORD_TYPE.CHANGE_PASSWORD_FIRST_TIME;

            this.firebaseService.updateData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, userId, { password: encrypedPassword }).pipe(
                switchMap(success => {
                    if (success && isFirstTimeLogin) {
                        return this.firebaseService.updateData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, userId, { isFirstLogin: false });
                    }
                    return of(success);
                }),
                tap(success => {
                    if (success) {
                        this.confirmationService.confirm({
                            target: event?.target as EventTarget,
                            message: 'Your password has been changed successfully.',
                            header: 'Success',
                            icon: 'pi pi-check',
                            rejectVisible: false,
                            acceptButtonProps: {
                                label: 'OK',
                                severity: 'primary',
                                size: 'small',
                            },
                
                            accept: () => {
                                this.router.navigate(['/login']);
                            },
                            reject: () => {
                                this.router.navigate(['/login']);
                            },
                        });
                    }
                }),
                catchError(error => {
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.message });
                    return of(null);
                }),
                finalize(() => {
                    this.isLoading.set(false);
                    this.spinnerOverlayService.hide();
                })
            ).subscribe();
        } 
        
        else {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Passwords does not match' });
        }
    }


    protected disableChangePasswordButton(): boolean {
        return !this.password() || !this.confirmPassword();
    }


}

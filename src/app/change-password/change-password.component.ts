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
import { catchError, finalize, of, tap } from 'rxjs';
import { DataSecurityService } from '../shared-services/data-security.service';
import { DialogOverlayService } from '../shared-services/primeng-services/dialog-overlay.service';

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
        RouterModule
    ],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css',
    standalone: true,
})
export class ChangePasswordComponent implements OnInit{

    protected isLoading = signal<boolean>(false);
    protected password = signal<string>('');
    protected confirmPassword = signal<string>('');

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
    }

    protected onChangePassword(): void {
        if (this.password() === this.confirmPassword()) {
            this.isLoading.set(true);
            this.spinnerOverlayService.show('Updating password...');

            const encrypedPassword = this.dataSecurityService.encryptData(this.password());
            this.firebaseService.updateData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, this.changePasswordData()!.userAccountData?.id || '', { password: encrypedPassword }).pipe(
                tap(success => {
                    if (success) {
                        if (this.changePasswordData()?.changePasswordType === 'changePassword') {
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

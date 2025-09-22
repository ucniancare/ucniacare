import { Injectable, signal } from '@angular/core';
import { UserAccount } from '../shared-interfaces/user-account';
import { CHANGE_PASSWORD_TYPE } from './change-password.consts';

export interface ChangePasswordData {
    userAccountData: UserAccount | null;
    changePasswordType: string;
}

@Injectable({
    providedIn: 'root'
})

export class ChangePasswordService {

    public changePasswordData = signal<ChangePasswordData>({
        userAccountData: null,
        changePasswordType: CHANGE_PASSWORD_TYPE.CHANGE_PASSWORD
    });
    
    
}
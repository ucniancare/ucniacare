import { Injectable, signal } from '@angular/core';
import { UserAccount } from '../shared-interfaces/user-account';

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
        changePasswordType: 'changePassword'
    });
    
    
}
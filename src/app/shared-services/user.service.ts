import { Injectable, signal } from '@angular/core';
import { UserAccount } from '../shared-interfaces/user-account';
import { User } from '../shared-interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public currentUserAccount = signal<UserAccount | null>(null);
    public currentUser = signal<User | null>(null);
    
    constructor(
    ) {

    }

    public setCurrentUserAccount(user: UserAccount | null): void {
        this.currentUserAccount.set(user);
    }

    public getCurrentUserAccount(): UserAccount | null {
        return this.currentUserAccount() || null;
    }

    public setCurrentUser(user: User | null): void {
        this.currentUser.set(user);
    }

    public getCurrentUser(): User | null {
        return this.currentUser() || null;
    }

    public clearUserServiceData(): void {
        this.currentUserAccount.set(null);
        this.currentUser.set(null);
    }




}
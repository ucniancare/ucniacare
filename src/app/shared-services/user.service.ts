import { Injectable, signal } from '@angular/core';
import { UserAccount } from '../shared-interfaces/user-account';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public currentUser = signal<UserAccount | null>(null);

    constructor(
    ) {

    }

    public setCurrentUser(user: UserAccount | null): void {
        this.currentUser.set(user);
    }

    public getCurrentUser(): UserAccount | null {
        return this.currentUser() || null;
    }




}
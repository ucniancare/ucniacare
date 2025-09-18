import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LOCALSTORAGECONSTS } from '../constants/local-storage.constants';
import { User } from '../shared-interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    canActivate(): boolean {
        const userAccount: UserAccount | null = this.localStorageService.get(LOCALSTORAGECONSTS.USERACCOUNT);
        const user: User | null = this.localStorageService.get(LOCALSTORAGECONSTS.USER);

        if (userAccount && user) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}

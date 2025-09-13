import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    canActivate(): boolean {
        const user = this.localStorageService.get<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME);

        if (user) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}

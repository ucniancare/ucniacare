import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const user = this.localStorageService.get<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME);

        if (user) {
            return true; 
        } else {
            this.router.navigate(['/login']); 
            return false;
        }
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LOCALSTORAGECONSTS } from '../constants/local-storage.constants';
import { User } from '../shared-interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const userAccount: UserAccount | null = this.localStorageService.get(LOCALSTORAGECONSTS.USERACCOUNT);
        const user: User | null = this.localStorageService.get(LOCALSTORAGECONSTS.USER);
        
        if (userAccount && user) {
            return true; 
        } else {
            this.router.navigate(['/login']); 
            return false;
        }
    }
}

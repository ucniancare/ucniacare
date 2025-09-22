import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangePasswordData, ChangePasswordService } from '../change-password/change-password.service';

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordGuard implements CanActivate {

    constructor(
        private changePasswordService: ChangePasswordService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const changePasswordData: ChangePasswordData = this.changePasswordService.changePasswordData();
        if (changePasswordData.userAccountData) {
            return true; 
        } 
        
        else {
            this.router.navigate(['/login']); 
            return false;
        }
    }
}

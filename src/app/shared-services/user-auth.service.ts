import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { catchError, finalize, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { DataSecurityService } from './data-security.service';


@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(
        private firebaseService: FirebaseService,
        private localStorageService: LocalStorageService,
        private userService: UserService,
    ) {

    }

    public loginUser(idNumber: string, password: string): Observable<UserAccount | null> {
        return this.firebaseService.authenticateUser$(idNumber, password).pipe(
            switchMap(user => {                
                if (!user) return of(null);
                return this.firebaseService.updateData$(COLLECTION.USERACCOUNTS.COLLECTIONNAME, user.id!, { isLoggedIn: true, lastLogin: new Date() }).pipe(
                    map((user) => {
                        this.localStorageService.set(COLLECTION.USERACCOUNTS.COLLECTIONNAME, user);
                        this.userService.setCurrentUser(user);
                        return user;
                    }),
                    catchError(() => of(null))
                )
            }),
            catchError(() => of(null)) 
        );
    }

    public logoutUser(): Observable<boolean> {
        console.log('user',this.userService.getCurrentUser());
        return this.firebaseService.updateData$(COLLECTION.USERACCOUNTS.COLLECTIONNAME, this.userService.getCurrentUser()!.id!, { isLoggedIn: false, }).pipe(
            map(() => {
                this.localStorageService.clear();
                this.userService.setCurrentUser(null);
                return true;
            }),
            catchError(() => of(false))
        );
    }




}
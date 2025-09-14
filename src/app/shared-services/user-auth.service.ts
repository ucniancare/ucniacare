import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { catchError, finalize, from, map, Observable, of, tap } from 'rxjs';
import { UserAccount } from '../shared-interfaces/user-account';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(
        private firebaseService: FirebaseService,
        private localStorageService: LocalStorageService
    ) {

    }

    public loginUser(idNumber: string, password: string): Observable<UserAccount | null> {
        return this.firebaseService.authenticateUser$(idNumber, password).pipe(
            map(user => user), 
            catchError(() => of(null)) 
        );
    }

    public logoutUser(): void {
        this.localStorageService.remove(COLLECTION.USERACCOUNTS.COLLECTIONNAME);
    }




}
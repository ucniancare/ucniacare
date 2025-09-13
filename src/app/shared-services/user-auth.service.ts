import { Injectable } from '@angular/core';
import FirebaseService from './firebase.service';
import { from, Observable } from 'rxjs';
import { UserAccount } from '../shared-interfaces/user-account';


@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    constructor(private firebaseService: FirebaseService ) {

    }





}
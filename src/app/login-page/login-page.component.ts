import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../shared-services/firebase.service';
import { catchError, of, tap } from 'rxjs';
import { User } from '../shared-interfaces/user';
import { UserModel } from '../shared-models/user.model';

@Component({
    selector: 'app-login-page',
    imports: [
        DividerModule, 
        ButtonModule, 
        InputTextModule,
        CardModule,
        FloatLabelModule,
        CommonModule,
        FormsModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: true
})
export class LoginPageComponent {


    protected username: string = '';
    protected password: string = '';

    protected addedUser = signal<User | null>(null);
    protected allUsers = signal<User[]>([]);

    constructor(private firebaseService: FirebaseService) {

    }

    protected addUser(): void {

        const newUser: User = {
            name: 'Test 2',
            email: 'Test 2',
            password: 'Test 2'
        };
        this.firebaseService.addData$<User>('users', newUser, UserModel.toJson, UserModel.fromJson).pipe(
            tap((user) => {
                this.addedUser.set(user);
            }),
            catchError(err => {
                return of(null);
            })
        ).subscribe();
    }

    protected getAllUsers(): void {
        this.firebaseService.getAllData$<User>('users', UserModel.fromJson).pipe(
            tap((users: User[]) => {
                this.allUsers.set(users);
            }),
            catchError(err => {
                return of(null);
            })
        ).subscribe();
    }



}

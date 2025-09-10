import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../shared-services/firebase.service';

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

    constructor(private firebaseService: FirebaseService) {

    }

    addUser() {
        this.firebaseService.addItem('users', {                
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date()
        });
      }



}

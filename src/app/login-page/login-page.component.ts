import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../shared-services/firebase.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-login-page',
    imports: [
        DividerModule, 
        ButtonModule, 
        InputTextModule,
        CardModule,
        FloatLabelModule,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: true,
})
export class LoginPageComponent {


    protected username: string = '';
    protected password: string = '';

    constructor(
        private firebaseService: FirebaseService, 
        private router: Router,
        private messageService: MessageService
    ) {
    }

    protected login(): void {
        this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Login successful' });
        this.router.navigate(['/dashboard']);
    }

}

import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { GoogleServicesService } from '../shared-services/google-services.service';
import { FirebaseService } from '../shared-services/firebase.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { SpinnerOverlayService } from '../shared-services/primeng-services/spinner-overlay.service';
import { APPCONSTS } from '../constants/data.constants';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { GoogleToken } from '../shared-interfaces/google-token';

@Component({
    selector: 'app-dev-tools',
    imports: [
        ButtonModule
    ],
    templateUrl: './dev-tools.component.html',
    styleUrl: './dev-tools.component.css',
    standalone: true
})
export class DevToolsComponent implements OnInit {

    protected isAuthenticated = signal<boolean>(false);

    constructor(
        private router: Router,
        private googleServicesService: GoogleServicesService,
        private firebaseService: FirebaseService,
        private spinnerOverlayService: SpinnerOverlayService
    ) {
        
    }

    ngOnInit(): void {
        
        const password = prompt('Enter password for dev tools:');
        if (password === '123') {
            this.isAuthenticated.set(true);
            console.log('DevToolsComponent initialized');
        } else {
            this.isAuthenticated.set(false);
            this.router.navigate(['/']);        
        }
    }

    async getGoogleDriveToken() {
        this.spinnerOverlayService.show('Getting Google Drive Token...');
        const token = await this.googleServicesService.signInWithGoogle();
        console.log("token", token);
        const googleToken: GoogleToken = {
            accessToken: token ?? '',
            metaData: {
                createdAt: new Date(),
                createdBy: APPCONSTS.SYSTEM,
                updatedAt: new Date(),
                updatedBy: APPCONSTS.SYSTEM
            }
        }

        this.firebaseService.deleteCollection$(COLLECTION.GOOGLE_TOKEN.COLLECTIONNAME).pipe(
            tap(() => {
                this.firebaseService.addData$(COLLECTION.GOOGLE_TOKEN.COLLECTIONNAME, googleToken).pipe(
                    finalize(() => {
                        this.spinnerOverlayService.hide();
                    })
                ).subscribe();
            }),
            catchError(err => {
                return of(null);
            }),
        ).subscribe();

    }


}

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from './keys/environment';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@angular/fire/auth';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
            },
        }), provideFirebaseApp(() => initializeApp({ projectId: "ucniacare", appId: "1:680647235587:web:a49a11412c7b2239455636", storageBucket: "ucniacare.firebasestorage.app", apiKey: "AIzaSyClNZyclZDLPEJet4T9LouUA-ZEpbZ3wLE", authDomain: "ucniacare.firebaseapp.com", messagingSenderId: "680647235587", measurementId: "G-0Y71MMGQ9D" })), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
    ],
};

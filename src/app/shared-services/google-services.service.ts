import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })

export class GoogleServicesService {
    constructor(private auth: Auth) { }

    async signInWithGoogle(): Promise<string | null> {
        const provider = new GoogleAuthProvider();
        // Request normal profile + email + Drive access
        provider.addScope('https://www.googleapis.com/auth/drive.file');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        const result = await signInWithPopup(this.auth, provider);

        const credential = GoogleAuthProvider.credentialFromResult(result);
        return credential?.accessToken ?? null;
    }
}

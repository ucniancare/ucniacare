// data-security.service.ts
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../keys/environment';

@Injectable({ providedIn: 'root' })
export class DataSecurityService {

    private readonly ENCRYPTION_KEY = environment.cryptoJS.encryptionKey;

    public encrypData(plain: string): string {
        return CryptoJS.AES.encrypt(plain, this.ENCRYPTION_KEY).toString();
    }

    public decrypData(cipherText: string): string {
        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, this.ENCRYPTION_KEY);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted;
        } catch (err) {
            console.error('Decryption failed', err);
            return '';
        }
    }

    public verifyPassword(plain: string, encryptedStored: string): boolean {
        const storedPlain = this.decrypData(encryptedStored);
        return storedPlain === plain;
    }
}

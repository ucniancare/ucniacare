import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Observable } from 'rxjs';


export enum sendEmailType {
    OTP = 'template_jmyzhjo',
    ACCOUNT_DETAILS = 'template_snme66g'
}

export interface sendEmailData {
    data: Record<string, unknown>;
    type: sendEmailType;
}

@Injectable({
    providedIn: 'root'
})

export class EmailJsService {

    private serviceId: string = 'service_fuo2bdo';
    private publicKey: string = 'Gm2kj3jWLJStfSFNQ';

    constructor() {
    }

    public sendEmail(data: sendEmailData): Observable<boolean> {
        return new Observable<boolean>(observer => {
            emailjs.send(this.serviceId, data.type, data.data, {
                publicKey: this.publicKey
            }).then(() => {
                observer.next(true);
                observer.complete();
            }).catch((error) => {
                console.error('Failed to send email:', error);
                observer.next(false);
                observer.complete();
            });
        });
    }
    
}
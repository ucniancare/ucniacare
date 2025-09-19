import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EmailJsService {

    private serviceId: string = 'service_fuo2bdo';
    private publicKey: string = 'Gm2kj3jWLJStfSFNQ';
    private otpTemplateId: string = 'template_jmyzhjo';

    constructor() {
    }

    public sendEmail(data: Record<string, unknown>): Observable<boolean> {
        return new Observable<boolean>(observer => {
            emailjs.send(this.serviceId, this.otpTemplateId, data, {
                publicKey: this.publicKey
            }).then((response) => {
                console.log('Email sent successfully', response);
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
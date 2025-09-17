import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerOverlayService {
    private _isLoading = signal<boolean>(false);
    private _message = signal<string>('Loading...');

    isLoading = this._isLoading.asReadonly();
    message = this._message.asReadonly();

    public show(message?: string): void {
        this._message.set(message || 'Loading...');
        this._isLoading.set(true);
    }

    public hide(): void {
        this._message.set('');
        this._isLoading.set(false);
    }

}

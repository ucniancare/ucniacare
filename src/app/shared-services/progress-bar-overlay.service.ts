
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProgressBarOverlayService {
    private _isLoading = signal<boolean>(false);

    isLoading = this._isLoading.asReadonly();

    show(): void {
        this._isLoading.set(true);
    }

    hide(): void {
        this._isLoading.set(false);
    }
}

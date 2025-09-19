import { Injectable, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

export interface DialogOptions {
    header?: string;
    message: string;
    icon?: string;
    isRejectVisible?: boolean;
    acceptLabel?: string;
    rejectLabel?: string;
    accept?: () => void;
    reject?: () => void;
}

@Injectable({
    providedIn: 'root'
})

export class DialogOverlayService {
    private _isLoading = signal<boolean>(false);

    constructor(
        private confirmationService: ConfirmationService
    ) {

    }

    openDialog(options: DialogOptions) {
        this.confirmationService.confirm({
            header: options.header || 'Confirmation',
            message: options.message,
            icon: options.icon || 'pi pi-info-circle',
            rejectVisible: options.isRejectVisible || false,
            acceptButtonProps: {
                label: options.acceptLabel || 'OK',
                icon: '',
                size: 'small'
            },
            rejectButtonProps: {
                label: options.rejectLabel || 'Cancel',
                icon: '',
                variant: 'outlined',
                size: 'small'
            },
            accept: options.accept,
            reject: options.reject
        });
    }
}
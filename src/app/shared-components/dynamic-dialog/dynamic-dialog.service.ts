import { ApplicationRef, ComponentRef, Injectable, Type, createComponent, EnvironmentInjector } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';

export interface DynamicDialogData {
    component: Type<any>;
    title: string;
    width?: string;
}

@Injectable({ providedIn: 'root' })

export class DynamicDialogService {
    private hostRef!: ComponentRef<DynamicDialogComponent>;

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) { }

    open(dynamicDialogData: DynamicDialogData) {
        if (!this.hostRef) {
            this.hostRef = createComponent(DynamicDialogComponent, {
                environmentInjector: this.injector
            });
            this.appRef.attachView(this.hostRef.hostView);
            document.body.appendChild(this.hostRef.location.nativeElement);
        }
        this.hostRef.instance.open(dynamicDialogData);
    }

    close() {
        this.hostRef?.instance.close();
    }
}

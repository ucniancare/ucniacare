import { Component, ViewChild, ViewContainerRef, Type, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DynamicDialogData } from './dynamic-dialog.service';

@Component({
    selector: 'dynamic-dialog',
    imports: [
        DialogModule,
        CommonModule,
        ToastModule
    ],
    templateUrl: './dynamic-dialog.component.html',
    styleUrl: './dynamic-dialog.component.css',
    standalone: true,
    providers: [
        MessageService
    ]
})
export class DynamicDialogComponent implements AfterViewInit {

    @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
    visible = false;
    title = '';
    width = '30rem';
    private pendingComponent: DynamicDialogData | null = null;
    private onCloseCallback: (() => void) | null = null;

      ngAfterViewInit() {
          if (this.pendingComponent) {
              this.loadComponent(this.pendingComponent);
              this.title = this.pendingComponent.title;
              this.width = this.pendingComponent.width || '30rem';
              this.onCloseCallback = this.pendingComponent.onClose || null;
              this.pendingComponent = null;
          }
      }

    open(dynamicDialogData: DynamicDialogData) {
        this.title = dynamicDialogData.title;
        this.width = dynamicDialogData.width || '30rem';
        this.onCloseCallback = dynamicDialogData.onClose || null;
        
        if (!this.vc) {
            this.pendingComponent = dynamicDialogData;
            this.visible = true;
            return;
        }
        
        this.loadComponent(dynamicDialogData);
    }

    private loadComponent(dynamicDialogData: DynamicDialogData) {
        if (this.vc) {
            this.vc.clear();
            this.vc.createComponent(dynamicDialogData.component);
            this.visible = true;
        }
    }

    close() {
        this.visible = false;
        if (this.vc) {
            this.vc.clear();
        }
        this.pendingComponent = null;
        this.title = '';
        this.width = '30rem'; // reset to default
        
        // Call the onClose callback when dialog closes
        if (this.onCloseCallback) {
            this.onCloseCallback();
            this.onCloseCallback = null;
        }
    }
}

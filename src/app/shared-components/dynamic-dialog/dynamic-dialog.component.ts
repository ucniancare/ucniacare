import { Component, ViewChild, ViewContainerRef, Type, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogData } from './dynamic-dialog.service';

@Component({
    selector: 'dynamic-dialog',
    imports: [
        DialogModule,
        CommonModule,

    ],
    templateUrl: './dynamic-dialog.component.html',
    styleUrl: './dynamic-dialog.component.css',
    standalone: true
})
export class DynamicDialogComponent implements AfterViewInit {

    @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
    visible = false;
    title = '';
    private pendingComponent: DynamicDialogData | null = null;

      ngAfterViewInit() {
          if (this.pendingComponent) {
              this.loadComponent(this.pendingComponent);
              this.title = this.pendingComponent.title;
              this.pendingComponent = null;
          }
      }

    open(dynamicDialogData: DynamicDialogData) {
        this.title = dynamicDialogData.title;
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
    }
}

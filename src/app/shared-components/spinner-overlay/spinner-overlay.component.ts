// spinner-overlay.component.ts
import { Component, computed } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayService } from '../../shared-services/primeng-services/spinner-overlay.service';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'spinner-overlay',
    standalone: true,
    imports: [
        CommonModule, 
        ProgressSpinnerModule,
        CardModule
    ],
    templateUrl: './spinner-overlay.component.html',
    styleUrl: './spinner-overlay.component.css',

})
export class SpinnerOverlayComponent {
    isVisible = computed(() => this.spinnerService.isLoading());
    message = computed(() => this.spinnerService.message());
    constructor(private spinnerService: SpinnerOverlayService) { }
}

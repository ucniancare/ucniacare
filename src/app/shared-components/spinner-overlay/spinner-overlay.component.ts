// spinner-overlay.component.ts
import { Component, computed } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayService } from '../../shared-services/spinner-overlay.service';

@Component({
  selector: 'spinner-overlay',
  standalone: true,
  imports: [CommonModule, ProgressSpinner],
  template: `
  <div *ngIf="isVisible()" class="overlay">
    <div class="content">
      <p-progress-spinner 
        strokeWidth="2" 
        fill="transparent" 
        animationDuration=".5s" 
        [style]="{ width: '120px', height: '120px' }" 
      />
      <p class="spinner-text">{{ message() }}</p>
    </div>
  </div>
`,
styles: [`
  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: auto;
    background: rgba(0,0,0,0.3);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .spinner-text {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }
`]

})
export class SpinnerOverlayComponent {
  isVisible = computed(() => this.spinnerService.isLoading());
  message = computed(() => this.spinnerService.message());
  constructor(private spinnerService: SpinnerOverlayService) {}
}

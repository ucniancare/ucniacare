// progressbar-overlay.component.ts
import { Component, computed } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { ProgressBarOverlayService } from '../../shared-services/primeng-services/progress-bar-overlay.service';

@Component({
  selector: 'progress-bar-overlay',
  standalone: true,
  imports: [CommonModule, ProgressBar],
  template: `
    <div *ngIf="isVisible()" class="overlay">
      <div class="progressbar-container">
        <p-progressbar mode="indeterminate" [style]="{ height: '6px', borderRadius: '0' }"></p-progressbar>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      pointer-events: auto; /* block clicks */
    }

    .progressbar-container {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `]
})
export class ProgressBarOverlayComponent {
  isVisible = computed(() => this.progressbarService.isLoading());

  constructor(private progressbarService: ProgressBarOverlayService) {}
}

import { Component, signal } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { MissionVisionComponent } from './mission-vision/mission-vision.component';

@Component({  
  selector: 'about-us-page-content',
  imports: [ImageModule, MissionVisionComponent],
  templateUrl: './about-us-page-content.component.html',
  styleUrl: './about-us-page-content.component.css'
})
export class AboutUsPageContentComponent {
  protected backgroundImage = signal<string>('https://images.unsplash.com/photo-1506905925346-21bda4d32df4');
}

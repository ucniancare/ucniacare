import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageHeaderComponent  } from './landing-page/components/landing-page-header/landing-page-header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LandingPageHeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
})
export class AppComponent {
    title = 'ucniacare';
}

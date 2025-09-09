import { Component } from '@angular/core';
import { LandingPageHeaderComponent } from '../landing-page-header/landing-page-header.component';
import { LandingPageContentComponent } from '../landing-page-content/landing-page-content.component';
import { LandingPageFooter } from '../footer/landing-page-footer.component';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'landing-page',
    imports: [LandingPageHeaderComponent, LandingPageContentComponent, LandingPageFooter, DividerModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    standalone: true
})
export class LandingPageComponent {

}

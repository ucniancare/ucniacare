import { Component } from '@angular/core';
import { LandingPageFooter } from '../../../landing-page/components/footer/landing-page-footer.component';
import { LandingPageHeaderComponent } from '../../../landing-page/components/landing-page-header/landing-page-header.component';
import { GetStartedComponent } from '../../../landing-page/components/landing-page-content/get-started/get-started.component';
import { AboutUsPageContentComponent } from '../about-us-page-content/about-us-page-content.component';
import { DividerModule } from 'primeng/divider';
@Component({
	selector: 'app-about-us-page',
	imports: [
		LandingPageHeaderComponent,
		LandingPageFooter,
		GetStartedComponent,
		AboutUsPageContentComponent,
		DividerModule,
	],
	templateUrl: './about-us-page.component.html',
	styleUrl: './about-us-page.component.css',
	standalone: true,
})
export class AboutUsPageComponent {

}

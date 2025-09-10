import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
// import { AboutUsPageComponent } from './about-us-page/components/about-us-page/about-us-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
];

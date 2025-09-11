import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { AboutUsPageComponent } from './about-us-page/components/about-us-page/about-us-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    
    { path: '', 
        component: LandingPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    { path: 'about-us', 
        component: AboutUsPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },

    },
    { path: 'login', 
        component: LoginPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    { path: 'dashboard', 
        component: DashboardComponent, 
        data: { 
            sideBarMenu: true, 
            topToolbar: true 
        },
    }

];

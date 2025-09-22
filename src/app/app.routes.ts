import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { AboutUsPageComponent } from './about-us-page/components/about-us-page/about-us-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { DevToolsComponent } from './dev-tools/dev-tools.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordGuard } from './guards/change-password.guard';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    
    { 
        path: '', 
        component: LandingPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    { 
        path: 'about-us', 
        component: AboutUsPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },

    },
    { 
        path: 'login', 
        component: LoginPageComponent, 
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
        canActivate: [LoginGuard]
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        data: { 
            sideBarMenu: true, 
            topToolbar: true 
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: LandingPageComponent,
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    {
        path: 'ucniacare',
        component: LandingPageComponent,
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    {
        path: 'dev-tools',
        component: DevToolsComponent,
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { 
            sideBarMenu: false, 
            topToolbar: false 
        },
        canActivate: [ChangePasswordGuard]
    },
    // {
    //     path: 'add-user',
    //     component: AddUserComponent,
    //     data: { 
    //         sideBarMenu: false, 
    //         topToolbar: false 
    //     },
    //     canActivate: [AuthGuard]
    // },
    { path: '**', redirectTo: '/ucniacare' }

];

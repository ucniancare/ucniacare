import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from './shared-components/side-bar-menu/side-bar-menu.component';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './shared-components/top-toolbar/top-toolbar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerOverlayComponent } from './shared-components/spinner-overlay/spinner-overlay.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarOverlayComponent } from './shared-components/progress-bar-overlay/progress-bar-overlay.component';
import { UserService } from './shared-services/user.service';
import { LocalStorageService } from './shared-services/local-storage.service';
import { COLLECTION } from './constants/firebase-collection.constants';
import { LOCALSTORAGECONSTS } from './constants/local-storage.constants';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SideBarMenuComponent,
        CommonModule,
        TopToolbarComponent,
        ToastModule,
        SpinnerOverlayComponent,
        ProgressBarModule,
        ProgressBarOverlayComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    providers: [
        MessageService
    ]
})
export class AppComponent {

    protected showSideBarMenu = signal<boolean>(true);
    protected showTopToolbar = signal<boolean>(true);

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private userService: UserService,
        private localStorageService: LocalStorageService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.route.firstChild;
                while (child?.firstChild) {
                    child = child.firstChild;
                }
                return child?.snapshot.data['sideBarMenu'] !== false;
            })
        ).subscribe(show => (this.showSideBarMenu.set(show)));

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.route.firstChild;
                while (child?.firstChild) {
                    child = child.firstChild;
                }
                return child?.snapshot.data['sideBarMenu'] !== false;
            })
        ).subscribe(show => (this.showTopToolbar.set(show)));

        this.userService.setCurrentUserAccount(this.localStorageService.get(LOCALSTORAGECONSTS.USERACCOUNT));
        this.userService.setCurrentUser(this.localStorageService.get(LOCALSTORAGECONSTS.USER));
        
    }
}

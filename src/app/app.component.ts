import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from './shared-components/side-bar-menu/side-bar-menu.component';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './shared-components/top-toolbar/top-toolbar.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SideBarMenuComponent,
        CommonModule,
        TopToolbarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
})
export class AppComponent {

    protected showSideBarMenu = signal<boolean>(true);
    protected showTopToolbar = signal<boolean>(true);

    constructor(
        private router: Router, 
        private route: ActivatedRoute
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
    }
}

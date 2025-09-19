import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { UserAuthService } from '../../shared-services/user-auth.service';
import { ProgressBarOverlayService } from '../../shared-services/primeng-services/progress-bar-overlay.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { User } from '../../shared-interfaces/user';
import { UserService } from '../../shared-services/user.service';
import { ImageSrcPipe } from '../../shared-pipes/google-drive-image.pipe';

@Component({
    selector: 'top-toolbar',
    imports: [
        Menubar, 
        BadgeModule, 
        AvatarModule, 
        InputTextModule, 
        Ripple, 
        CommonModule, 
        ButtonModule,
        RouterModule,
        MenuModule,
        ImageSrcPipe
    ],
    templateUrl: './top-toolbar.component.html',
    styleUrl: './top-toolbar.component.css',
    standalone: true
})
export class TopToolbarComponent implements OnInit {

    protected user = signal<User | null>(null);
    protected items: MenuItem[] = [];
    

    constructor(
        private userAuthService: UserAuthService,
        private progressBarOverlayService: ProgressBarOverlayService,
        private router: Router,
        private userService: UserService
    ) {
        console.log("TopToolbarComponent constructor");
        this.user.set(this.userService.currentUser());
    }

    ngOnInit() {    
        this.items = [
            {
                label: this.user()?.firstName + ' ' + this.user()?.lastName,
                items: [
                    {
                        label: 'Notifications',
                        icon: 'fa-solid fa-bell',
                    },
                    {
                        label: 'Logout',
                        icon: 'fa-solid fa-right-from-bracket',
                        command: () => {
                            this.logout();
                        }
                    },
                ]
            }
        ];
    }


    private logout(): void {
        this.progressBarOverlayService.show();
        this.userAuthService.logoutUser().pipe(
            tap(success => {
                if (success) {
                    this.router.navigate(['/login']);
                }
                else {
                    // TODO#1: Handle error
                }
            }),
            catchError(() => {
                return of(false);
            }),
            finalize(() => {
                this.progressBarOverlayService.hide();
            })
        ).subscribe();
    }


}

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
import { ProgressBarOverlayService } from '../../shared-services/progress-bar-overlay.service';
import { catchError, finalize, of, tap } from 'rxjs';

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
        MenuModule
    ],
    templateUrl: './top-toolbar.component.html',
    styleUrl: './top-toolbar.component.css',
    standalone: true
})
export class TopToolbarComponent implements OnInit {

    protected items: MenuItem[] = [];

    constructor(
        private userAuthService: UserAuthService,
        private progressBarOverlayService: ProgressBarOverlayService,
        private router: Router
    ) {
    }

    ngOnInit() {    
        this.items = [
            {
                label: 'Clifford Alferez',
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

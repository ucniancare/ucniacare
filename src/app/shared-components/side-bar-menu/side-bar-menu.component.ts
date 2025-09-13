import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'side-bar-menu',
    imports: [
        BadgeModule,
        RippleModule,
        AvatarModule, 
        MenuModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './side-bar-menu.component.html',
    styleUrl: './side-bar-menu.component.css',
    standalone: true
})
export class SideBarMenuComponent {

    protected displayMenuBar = signal<boolean>(false);
    protected items: MenuItem[] = [];

    constructor(
    ) {
    }

    ngOnInit() {
        this.items = [
            {
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'fa-solid fa-chart-line',
                        routerLink: '/dashboard',
                    },
                    {
                        label: 'Users',
                        icon: 'fa-solid fa-users',
                        routerLink: '/users',
                    },
                    {
                        label: 'Patients',
                        icon: 'fa-solid fa-user',
                        routerLink: '/patients',
                    },
                    {
                        label: 'Inventory',
                        icon: 'fa-solid fa-boxes-packing',
                        routerLink: '/inventory',
                    },
                    {
                        label: 'Reports',
                        icon: 'fa-solid fa-file-alt',
                        routerLink: '/reports',
                    },                    
                    {
                        label: 'Health Profile',
                        icon: 'fa-solid fa-user-doctor',
                        routerLink: '/health-profile',
                    },
                    {
                        label: 'Appointments',
                        icon:'fa-solid fa-calendar-days',
                        routerLink: '/appointments',
                    },
                    {
                        label: 'Hotlines',
                        icon: 'fa-solid fa-phone',
                        routerLink: '/hotlines',
                    },
                    {
                        label: 'Settings',
                        icon: 'fa-solid fa-gear',
                        routerLink: '/settings',
                    }
                ]
            },
        ];
    }

}

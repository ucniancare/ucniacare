import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'side-bar-menu',
    imports: [
        BadgeModule,
        RippleModule,
        AvatarModule, 
        MenuModule,
        CommonModule
    ],
    templateUrl: './side-bar-menu.component.html',
    styleUrl: './side-bar-menu.component.css',
    standalone: true
})
export class SideBarMenuComponent {

    protected displayMenuBar = signal<boolean>(false);

    items: MenuItem[] | undefined;

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
                    },
                    {
                        label: 'Users',
                        icon: 'fa-solid fa-users',
                    },
                    {
                        label: 'Patients',
                        icon: 'fa-solid fa-user',
                    },
                    {
                        label: 'Inventory',
                        icon: 'fa-solid fa-boxes-packing',
                    },
                    {
                        label: 'Reports',
                        icon: 'fa-solid fa-file-alt',
                    },                    
                    {
                        label: 'Health Profile',
                        icon: 'fa-solid fa-user-doctor',
                    },
                    {
                        label: 'Appointments',
                        icon:'fa-solid fa-calendar-days',
                    },
                    {
                        label: 'Hotlines',
                        icon: 'fa-solid fa-phone',
                    },
                    {
                        label: 'Settings',
                        icon: 'fa-solid fa-gear',
                    }
                ]
            },
        ];
    }

}

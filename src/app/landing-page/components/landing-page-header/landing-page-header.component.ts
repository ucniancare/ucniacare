import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'landing-page-header',
    imports: [
        Menubar, 
        BadgeModule, 
        AvatarModule, 
        InputTextModule, 
        Ripple, 
        CommonModule, 
        ButtonModule,
        RouterModule,
    ],
    templateUrl: './landing-page-header.component.html',
    styleUrl: './landing-page-header.component.css',
    standalone: true
})
export class LandingPageHeaderComponent implements OnInit  {

    protected items = signal<MenuItem[]>([]);

    ngOnInit() {
        this.items.set([
            {
                label: 'Home',
                routerLink: ''
            },
            {
                label: 'Features',
            },
            {
                label: 'Contact Us',
            },
            {
                label: 'About Us',
                routerLink: '/about-us'
            }
            /*{
                label: 'Features',
                icon: 'pi pi-search',
                badge: '3',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                    },
                ],
            },*/
        ]);
    }

}

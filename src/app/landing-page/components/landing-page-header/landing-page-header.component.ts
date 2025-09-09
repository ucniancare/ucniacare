import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LandingPageContentComponent } from '../landing-page-content/landing-page-content.component';

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
        LandingPageContentComponent
    ],
    templateUrl: './landing-page-header.component.html',
    styleUrl: './landing-page-header.component.css',
    standalone: true
})
export class LandingPageHeaderComponent implements OnInit  {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
            },
            {
                label: 'Features',
            },
            {
                label: 'Contact Us',
            },
            {
                label: 'About Us'
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
        ];
    }

}

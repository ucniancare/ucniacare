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
import { MenuModule } from 'primeng/menu';

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

    ngOnInit() {
        this.items = [
            {
                label: 'Clifford Alferez',
                items: [
                    {
                        label: 'Notifications',
                        icon: 'fa-solid fa-bell'
                    },
                    {
                        label: 'Logout',
                        icon: 'fa-solid fa-right-from-bracket'
                    },
                ]
            }
        ];
    }

    onUserMenuToggle(event: Event, menu: any) {
        console.log("Test")
        event.stopPropagation();   // 👈 prevent menubar from closing it
        menu.toggle(event);
      }
}

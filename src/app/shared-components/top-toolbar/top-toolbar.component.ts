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
    ],
    templateUrl: './top-toolbar.component.html',
    styleUrl: './top-toolbar.component.css',
    standalone: true
})
export class TopToolbarComponent implements OnInit {

    ngOnInit() {
    }
}

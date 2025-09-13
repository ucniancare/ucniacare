import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BasicDataCardComponent } from '../shared-components/basic-data-card/basic-data-card.component';
import { CommonModule } from '@angular/common';

export type BasicDataCard = {
    icon: string;
    iconClass: string;
    titleText: string;
    titleClass: string;
    subTitleText: string;
    subTitleClass: string;
    dataText: string;
    dataClass: string;
}

@Component({
    selector: 'app-dashboard',
    imports: [
        ButtonModule,
        BasicDataCardComponent,
        CommonModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: true
})
export class DashboardComponent implements OnInit{

    protected basicDataCards = signal<BasicDataCard[]>([]);

    constructor(){

    }

    ngOnInit() {
        this.basicDataCards.set([
            {
                icon: 'fa-solid fa-users',
                iconClass: 'background-color: #DBEAFE; color: #2563EB;',
                titleText: 'Total Patients',
                titleClass: 'text=lg',
                subTitleText: '1,248',
                subTitleClass: 'text-black-700 text-2xl font-semibold',
                dataText: '12% high last month',
                dataClass: 'text-m text-gray-500',
            },
            {
                icon: 'fa-solid fa-calendar-days',
                iconClass: 'background-color: #DCFCE7; color: #16A34A;',
                titleText: 'Today\'s Appointments',
                titleClass: 'text=lg',
                subTitleText: '8',
                subTitleClass: 'text-black-700 text-2xl font-semibold',
                dataText: 'Next at 2:30 PM',
                dataClass: 'text-m text-gray-500',
            },
            
        ]);
    }
}

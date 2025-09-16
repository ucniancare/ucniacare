import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BasicDataCardComponent, BasicDataCard } from '../shared-components/basic-data-card/basic-data-card.component';
import { CommonModule } from '@angular/common';
import { VitalSignsCardComponent } from '../shared-components/vital-signs-card/vital-signs-card.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        ButtonModule,
        BasicDataCardComponent,
        VitalSignsCardComponent,
        CommonModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: true
})
export class DashboardComponent implements OnInit{

    protected basicDataCards = signal<BasicDataCard[]>([]);
    protected vitalSignsCards = signal<BasicDataCard[]>([]);
    constructor(){

    }

    ngOnInit() {
        this.basicDataCards.set([
            {   
                cardClass: '!w-[300px] !h-[130px]',
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
                cardClass: '!w-[300px] !h-[130px]',
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


        this.vitalSignsCards.set([
            {   
                cardClass: '!w-[160px] !h-[160px] !bg-red-500',
                icon: 'fa-solid fa-droplet',
                iconClass: 'font-size: 38px;',
                titleText: 'Blood Pressure',
                titleClass: 'text-sm',
                subTitleText: '120/80',
                subTitleClass: 'text-black-800 text-3xl font-bold',
                dataText: 'mmHg',
                dataClass: '',
            },
            {   
                cardClass: '!w-[160px] !h-[160px] !bg-orange-500',
                icon: 'fa-solid fa-temperature-high',
                iconClass: 'font-size: 38px;',
                titleText: 'Temperature',
                titleClass: 'text-sm',
                subTitleText: '36.5°C',
                subTitleClass: 'text-black-800 text-3xl font-bold',
                dataText: 'Normal',
                dataClass: '',
            },
            {   
                cardClass: '!w-[160px] !h-[160px] !bg-pink-500',
                icon: 'fa-solid fa-heart-pulse',
                iconClass: 'font-size: 38px;',
                titleText: 'Pulse Rate',
                titleClass: 'text-sm',
                subTitleText: '80',
                subTitleClass: 'text-black-800 text-3xl font-bold',
                dataText: 'BPM',
                dataClass: '',
            },
            {   
                cardClass: '!w-[160px] !h-[160px] !bg-blue-500',
                icon: 'fa-solid fa-lungs',
                iconClass: 'font-size: 38px;',
                titleText: 'Oxygen Saturation',
                titleClass: 'text-sm',
                subTitleText: '98%',
                subTitleClass: 'text-black-800 text-3xl font-bold',
                dataText: 'Normal',
                dataClass: '',
            },
        ]);
        
    }
}

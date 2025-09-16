import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Input } from '@angular/core';

export type BasicDataCard = {
    cardClass?: string;
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
    selector: 'basic-data-card',
    imports: [
        CardModule,
    ],
    templateUrl: './basic-data-card.component.html',
    styleUrl: './basic-data-card.component.css',
    standalone: true
})
export class BasicDataCardComponent {

    @Input() cardClass?: string = '';

    @Input() icon?: string = '';
    @Input() iconClass?: string = '';

    @Input() titleText?: string = '';
    @Input() titleClass?: string = '';

    @Input() subTitleText?: string = '';
    @Input() subTitleClass?: string = '';

    @Input() dataText?: string = '';
    @Input() dataClass?: string = '';

}

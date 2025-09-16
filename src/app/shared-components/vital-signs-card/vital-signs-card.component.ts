import { Component, Input } from '@angular/core';
import { BasicDataCard } from '../basic-data-card/basic-data-card.component';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'vital-signs-card',
    imports: [
        CardModule
    ],
    templateUrl: './vital-signs-card.component.html',
    styleUrl: './vital-signs-card.component.css',
    standalone: true
})

export class VitalSignsCardComponent {


    @Input() basicDataCard: BasicDataCard = {
        cardClass: '',
        icon: '',
        iconClass: '',
        titleText: '',
        titleClass: '',
        subTitleText: '',
        subTitleClass: '',
        dataText: '',
        dataClass: '',
    };

}

import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Input } from '@angular/core';

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

    @Input() icon: string = '';
    @Input() iconClass: string = '';

    @Input() titleText: string = '';
    @Input() titleClass: string = '';

    @Input() subTitleText: string = '';
    @Input() subTitleClass: string = '';

    @Input() dataText: string = '';
    @Input() dataClass: string = '';

}

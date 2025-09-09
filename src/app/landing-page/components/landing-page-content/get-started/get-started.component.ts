import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'get-started',
    imports: [CardModule, ButtonModule],
    templateUrl: './get-started.component.html',
    styleUrl: './get-started.component.css',
    standalone: true
})
export class GetStartedComponent {
    

}

import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'how-does-this-work',
    imports: [ButtonModule, DividerModule],
    templateUrl: './how-does-this-work.component.html',
    styleUrl: './how-does-this-work.component.css',
    standalone: true
})
export class HowDoesThisWorkComponent {
    

}

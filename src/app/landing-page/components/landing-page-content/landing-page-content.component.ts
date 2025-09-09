import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { HowDoesThisWorkComponent } from './how-does-this-work/how-does-this-work.component';    
import { FeaturesComponent } from './features/features.component';
import { TeamComponent } from './team/team.component';
import { GetStartedComponent } from './get-started/get-started.component';

@Component({
    selector: 'landing-page-content',
    imports: [
        DividerModule, 
        ButtonModule, 
        SplitterModule, 
        CardModule, 
        HowDoesThisWorkComponent, 
        FeaturesComponent,
        TeamComponent,
        GetStartedComponent
    ],
    templateUrl: './landing-page-content.component.html',
    styleUrl: './landing-page-content.component.css',
    standalone: true
})
export class LandingPageContentComponent {

}

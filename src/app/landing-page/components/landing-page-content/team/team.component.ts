import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


export type Team = {
    name: string;
    image: string;
    role: string;
}

@Component({
    selector: 'team',
    imports: [CommonModule, CardModule, Carousel, ButtonModule],
    templateUrl: './team.component.html',
    styleUrl: './team.component.css',
    standalone: true
})
export class TeamComponent implements OnInit {
    
    protected teamMembers = signal<Team[]>([]);
    protected responsiveOptions = signal<any[]>([]);

    ngOnInit() {
        this.responsiveOptions.set([
            {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
            }
        ]);
        this.teamMembers.set([
            {
                name: 'Nancy Romales',
                image: 'ucniacare/assets/team-images/database_manager.jpg',
                role: 'Database Manager'
            },
            {
                name: 'Aeron Evan Lugay',
                image: 'ucniacare/assets/team-images/project_manager.jpg',
                role: 'Project Manager'
            },
            {
                name: 'Clifford Alferez',
                image: 'ucniacare/assets/team-images/programmer.jpg',
                role: 'Lead Developer'
            },
            {
                name: 'John Paul Loayan',
                image: 'ucniacare/assets/team-images/designer.jpg',
                role: 'UI/UX Designer'
            }
        ]);
    }

}

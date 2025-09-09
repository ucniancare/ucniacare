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
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                role: 'Database Designer'
            },
            {
                name: 'Aeron Evan Lugay',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                role: 'Project Manager'
            },
            {
                name: 'Clifford Alferez',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                role: 'Lead Developer'
            },
            {
                name: 'John Paul Loayan',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                role: 'UI/UX Designer'
            }
        ]);
    }

}

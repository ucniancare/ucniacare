import { Component, OnInit, signal, computed } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { DynamicDialogData, DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';
import { TruncatePipe } from '../../shared-pipes/truncate-string.pipe';

@Component({
    selector: 'bulletin-card',
    imports: [
        PanelModule,
        AvatarModule,
        ButtonModule,
        MenuModule,
        CommonModule,
        TruncatePipe
    ],
    templateUrl: './bulletin-card.component.html',
    styleUrl: './bulletin-card.component.css',
    standalone: true
})

export class BulletinCardComponent implements OnInit {

    protected description = signal<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    protected isDialogOpened = signal<boolean>(false);
    protected items: { label?: string; icon?: string; separator?: boolean }[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Update', icon: 'pi pi-refresh' },
            { label: 'Delete', icon: 'pi pi-times' },
            { label: 'Angular', icon: 'pi pi-external-link'}
        ];
    }

    constructor(
        private dynamicDialogService: DynamicDialogService
    ) {

    }

    protected openDialog(): void {
        if (this.isDialogOpened()) {
            return;
        }
        this.isDialogOpened.set(true);
        const dynamicDialogData: DynamicDialogData = {
            component: BulletinCardComponent,
            title: 'Bulletin Card',
            width: '500px',
            onClose: () => this.onDialogClosed()
        }
        this.dynamicDialogService.open(dynamicDialogData);
    }

    private onDialogClosed(): void {
        this.isDialogOpened.set(false);
    }

}

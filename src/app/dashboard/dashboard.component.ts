import { Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BasicDataCardComponent, BasicDataCard } from '../shared-components/basic-data-card/basic-data-card.component';
import { CommonModule } from '@angular/common';
import { VitalSignsCardComponent } from '../shared-components/vital-signs-card/vital-signs-card.component';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../shared-interfaces/user';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserModel } from '../shared-models/user.model';
import { UserService } from '../shared-services/user.service';
import { FirebaseService } from '../shared-services/firebase.service';
import { catchError, of, tap } from 'rxjs';
import { FileUploadService } from '../shared-services/file-upload.service';
import { GoogleDriveUtil } from '../shared-utils/google-drive-util';
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}


@Component({
    selector: 'app-dashboard',
    imports: [
        ButtonModule,
        BasicDataCardComponent,
        VitalSignsCardComponent,
        CommonModule,
        FileUploadModule,
        HttpClientModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: true
})
export class DashboardComponent implements OnInit{

    protected basicDataCards = signal<BasicDataCard[]>([]);
    protected vitalSignsCards = signal<BasicDataCard[]>([]);

    uploadedImages: string[] = [];
    accessToken: string | null = null;
    imageUrl: string = '';

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private firebaseService: FirebaseService,
        private fileUploadService: FileUploadService,
        private httpClient: HttpClient
    ){
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

        this.imageUrl = GoogleDriveUtil.getImageUrl('1aMJ3LdphNpFie14ggqOFDzz9PqSojEKL');
        
    }

    onBasicUploadAuto(event: FileSelectEvent) {
        for (const file of event.files) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.uploadedImages.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }

        const file = event.files[0];

        const formData = new FormData();
        formData.append('file', file);

        this.fileUploadService.uploadFile(file, 'profilePicture').subscribe();
    }

    public addUser() {
        const user: User = {
            userAccountId: this.userService.currentUser()?.id,
            firstName: 'Super',
            lastName: 'Admin',
            middleName: '',
            extName: '',
            sex: 'Male',
            email: 'super@admin.com',
            phoneNumber: '09997527570',
            dateOfBirth: new Date(),
            maritalStatus: 'Single',
            userRoles: ['admin'],
            profilePicture: '',
            metaData: {
                createdAt: new Date(),
                createdBy: '123123123',
                updatedAt: new Date(),
                updatedBy: '123123123'
            }
        }
    
        this.firebaseService.addData$<User>(COLLECTION.USERS.COLLECTIONNAME, user, UserModel.toJson, UserModel.fromJson).pipe(
            tap(user => console.log('user added: ', user)),
            catchError(err => {
                return of(null);
            })
        ).subscribe();
    }

    
}

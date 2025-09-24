import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BasicDataCardComponent, BasicDataCard } from '../shared-components/basic-data-card/basic-data-card.component';
import { CommonModule } from '@angular/common';
import { VitalSignsCardComponent } from '../shared-components/vital-signs-card/vital-signs-card.component';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../shared-interfaces/user';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserModel } from '../shared-models/user.model';
import { UserService } from '../shared-services/user.service';
import { FirebaseService } from '../shared-services/firebase.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { FileUploadService } from '../shared-services/file-upload.service';
import { GoogleDriveUtil } from '../shared-utils/google-drive-util';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { GOOGLEDRIVEFOLDERCONSTS } from '../constants/google-drive-folders.constants';
import { DialogOverlayService } from '../shared-services/primeng-services/dialog-overlay.service';
import { LocalStorageService } from '../shared-services/local-storage.service';
import { LOCALSTORAGECONSTS } from '../constants/local-storage.constants';
import { DynamicDialogData, DynamicDialogService } from '../shared-components/dynamic-dialog/dynamic-dialog.service';
import { AddUserComponent } from '../shared-forms/add-user/add-user.component';
import { AddAppointmentComponent } from '../shared-forms/add-appointment/add-appointment.component';
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

interface ContactForm {
    email: string;
    otp: string;
    time: string;
    [key: string]: unknown;
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
export class DashboardComponent implements OnInit, OnDestroy {

    protected basicDataCards = signal<BasicDataCard[]>([]);
    protected vitalSignsCards = signal<BasicDataCard[]>([]);
    private user: User | null = null;

    uploadedImages: string[] = [];
    uploadedFiles: File[] = [];
    accessToken: string | null = null;
    imageUrl: string = '';

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private firebaseService: FirebaseService,
        private fileUploadService: FileUploadService,
        private httpClient: HttpClient,
        private dialogOverlayService: DialogOverlayService,
        private confirmationService: ConfirmationService,
        private localStorageService: LocalStorageService,
        private dynamicDialogService: DynamicDialogService
    ){
        this.user = this.userService.currentUser();
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

    public test() {
        // this.confirmationService.confirm({
        //     target: event?.target as EventTarget,
        //     message: 'Do you want to delete this record?',
        //     header: 'Danger Zone',
        //     icon: 'pi pi-info-circle',
        //     rejectVisible: false,
        //     rejectLabel: 'Cancel',
        //     rejectButtonProps: {
        //         label: 'Cancel',
        //         severity: 'secondary',
        //         outlined: true,
        //     },
        //     acceptButtonProps: {
        //         label: 'Delete',
        //         severity: 'danger',
        //     },

        //     accept: () => {
        //     },
        //     reject: () => {
        //         this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        //     },
        // });
    }

    onBasicUploadAuto(event: FileSelectEvent) {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Store the file for later upload
        this.uploadedFiles.push(file);
        
        // Create object URL for display
        const objectUrl = URL.createObjectURL(file);
        this.uploadedImages.push(objectUrl);

        //this.fileUploadService.uploadFile(file, 'profilePicture').subscribe();
    }

    saveImage() {
        if (this.uploadedFiles.length > 0) {
            if (!this.user?.id) {
                console.error('No current user found');
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'User not found. Please log in again.' 
                });
                return;
            }

            this.fileUploadService.uploadFile(this.uploadedFiles[0], GOOGLEDRIVEFOLDERCONSTS.PROFILEPICTURE, true).pipe(
                switchMap(file => {
                    console.log('File uploaded successfully:', file);
                    return this.firebaseService.updateData$<User>(
                        COLLECTION.USERS.COLLECTIONNAME, 
                        this.user!.id!,
                        { profilePicture: file.id }, 
                    );
                }),
                tap(user => {
                    this.userService.setCurrentUser(user);
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Profile picture updated successfully!' 
                    });
                    // Clear uploaded files after successful save
                    this.uploadedFiles = [];
                    this.uploadedImages.forEach(url => {
                        if (url.startsWith('blob:')) {
                            URL.revokeObjectURL(url);
                        }
                    });
                    this.uploadedImages = [];
                }),
                catchError(err => {
                    console.error('Error updating profile picture:', err);
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: 'Failed to update profile picture. Please try again.' 
                    });
                    return of(null);
                })
            ).subscribe();
        } else {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Warning', 
                detail: 'Please select an image first.' 
            });
        }
    }

    public addUser() {
        const user: User = {
            userAccountId: this.userService.currentUserAccount()?.id,
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

    openDialog() {
        const dynamicDialogData: DynamicDialogData = {
            component: AddUserComponent,
            title: 'Add User',
            width: '34rem'
        }
        this.dynamicDialogService.open(dynamicDialogData);
    }

    openAddAppointmentDialog() {
        const dynamicDialogData: DynamicDialogData = {
            component: AddAppointmentComponent,
            title: 'Add Appointment'
        }
        this.dynamicDialogService.open(dynamicDialogData);
    }

    ngOnDestroy() {
        this.uploadedImages.forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
    }

}
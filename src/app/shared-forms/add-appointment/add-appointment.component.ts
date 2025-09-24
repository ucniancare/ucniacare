import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { timeRangeValidator } from '../../shared-utils/validation-util';
import { Appointment } from '../../shared-interfaces/appointment';
import { SpinnerOverlayService } from '../../shared-services/primeng-services/spinner-overlay.service';
import { APPCONSTS } from '../../constants/data.constants';
import { FirebaseService } from '../../shared-services/firebase.service';
import { COLLECTION } from '../../constants/firebase-collection.constants';
import { tap, firstValueFrom } from 'rxjs';
import { GOOGLEDRIVEFOLDERCONSTS } from '../../constants/google-drive-folders.constants';
import { FileUploadService } from '../../shared-services/file-upload.service';

interface AppointmentTypeOption {
    name: string;
}



@Component({
    selector: 'app-add-appointment',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FloatLabelModule,
        MultiSelectModule,
        SelectModule,
        DatePickerModule,
        TextareaModule,
        FileUploadModule,
        ButtonModule
    ],
    templateUrl: './add-appointment.component.html',
    styleUrl: './add-appointment.component.css',
    standalone: true
})
export class AddAppointmentComponent implements OnInit{


    protected uploadedFiles: File[] = [];

    protected appointmentTypeOptions: AppointmentTypeOption[] = [
        { name: 'Medical Consultation' },
        { name: 'Dental Consultation' },
        { name: 'Emergency' },
        { name: 'Vaccination' },
        { name: 'Follow-up Appointment' },
        { name: 'Medical Clearance' }
    ];

    protected addAppointmentForm: FormGroup = new FormGroup({
        type: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required]),
        from: new FormControl(null, [Validators.required]),
        to: new FormControl(null, [Validators.required]),
        notes: new FormControl(''),
    }, { validators: timeRangeValidator() });

    protected minDate: Date = new Date();
    protected isLoading = signal<boolean>(false);
    
    constructor(
        private spinnerOverlayService: SpinnerOverlayService,
        private firebaseService: FirebaseService,
        private fileUploadService: FileUploadService
    ){
        
    }

    ngOnInit(): void {
        this.minDate = new Date();
    }

    protected onUploadFiles(event: FileSelectEvent) {
        this.uploadedFiles = [...this.uploadedFiles, ...event.files];
    }

    protected formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    protected removeFile(index: number): void {
        this.uploadedFiles.splice(index, 1);
    }

    protected onAddAppointment(): void {
        if (this.addAppointmentForm.valid) {
            this.isLoading.set(true);
            this.spinnerOverlayService.show('Adding appointment...');

            // Process uploading files if any files are selected
            if (this.uploadedFiles.length > 0) {
                this.uploadFilesAndCreateAppointment();
            } else {
                this.createAppointment();
            }
        } 
        else {
            this.addAppointmentForm.markAllAsTouched();
        }
    }

    private uploadFilesAndCreateAppointment(): void {
        const uploadPromises = this.uploadedFiles.map(file => 
            firstValueFrom(this.fileUploadService.uploadFile(file, GOOGLEDRIVEFOLDERCONSTS.APPOINTMENT_FILES))
        );

        Promise.all(uploadPromises).then(() => {
            this.createAppointment();
        }).catch((error) => {
            console.error('Error uploading files:', error);
            this.isLoading.set(false);
            this.spinnerOverlayService.hide();
            // You might want to show an error message to the user here
        });
    }

    private createAppointment(): void {
        const addAppointmentFormValue = this.addAppointmentForm.value;
        const appointment: Appointment = {
            type: addAppointmentFormValue.type.name!,
            date: addAppointmentFormValue.date!,
            from: addAppointmentFormValue.from!,
            to: addAppointmentFormValue.to!,
            notes: addAppointmentFormValue.notes!,
            files: this.uploadedFiles.map(file => file.name),
            attendingStaff: [],
            attendingDoctors: [],
            attendingNurses: [],
            status: APPCONSTS.APPOINTMENT_STATUS.PENDING
        }

        this.firebaseService.addData$<Appointment>(COLLECTION.APPOINTMENTS.COLLECTIONNAME, appointment).pipe(
            tap((appointment: Appointment) => {
                console.log("Appointment created successfully:", appointment);
                this.isLoading.set(false);
                this.spinnerOverlayService.hide();
                this.resetForm();
            })
        ).subscribe({
            error: (error) => {
                console.error('Error creating appointment:', error);
                this.isLoading.set(false);
                this.spinnerOverlayService.hide();
                // You might want to show an error message to the user here
            }
        });
    }

    private resetForm(): void {
        this.addAppointmentForm.reset();
        this.uploadedFiles = [];
        this.minDate = new Date();
    }
}

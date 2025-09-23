import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { timeRangeValidator } from '../../shared-utils/validation-util';

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

    constructor(){

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

    protected onSubmit(): void {
        if (this.addAppointmentForm.valid) {
            
        } 
        else {
            this.addAppointmentForm.markAllAsTouched();
        }
    }
}

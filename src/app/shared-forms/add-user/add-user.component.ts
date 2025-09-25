import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import * as XLSX from 'xlsx';
import { FirebaseService } from '../../shared-services/firebase.service';
import { DataSecurityService } from '../../shared-services/data-security.service';
import { UserAccount } from '../../shared-interfaces/user-account';
import { User } from '../../shared-interfaces/user';
import { UserAccountModel } from '../../shared-models/user-account.model';
import { UserModel } from '../../shared-models/user.model';
import { COLLECTION } from '../../constants/firebase-collection.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, forkJoin, of, tap, concatMap, finalize, map } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PasswordUtil } from '../../shared-utils/password-util';
import { StringUtil } from '../../shared-utils/string-util';
import { APPCONSTS } from '../../constants/data.constants';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserService } from '../../shared-services/user.service';   
import { SpinnerOverlayService } from '../../shared-services/primeng-services/spinner-overlay.service';
import { Config } from '@angular/fire/auth';
import { EmailJsService, sendEmailType, sendEmailData } from '../../shared-services/email-js.service';
import { AccountDetailsTemplateForm } from '../../shared-interfaces/email-template-form';
import { DropdownOption } from '../../shared-interfaces/dropdown-option';

@Component({
selector: 'add-user',
imports: [
    FormsModule,
    SelectButtonModule,
    FileUploadModule,
    CommonModule,
    DividerModule,
    ProgressBarModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    DatePickerModule,
    MultiSelectModule
],
templateUrl: './add-user.component.html',
styleUrl: './add-user.component.css',
standalone: true
})
export class AddUserComponent {

    protected userRoleOptions: DropdownOption[] = [
        { name: 'Super Admin' },
        { name: 'Admin' },
        { name: 'Doctor' },
        { name: 'Patient' },
        { name: 'Nurse' },
        { name: 'Staff' }
    ];

    protected preschoolLevelOptions: DropdownOption[] = [
        {name: 'Kinder 1'},
        {name: 'Kinder 2'},
    ];

    protected elementaryLevelOptions: DropdownOption[] = [
        {name: 'Grade 1'},
        {name: 'Grade 2'},
        {name: 'Grade 3'},
        {name: 'Grade 4'},
        {name: 'Grade 5'},
        {name: 'Grade 6'},
    ];

    protected juniorHighSchoolLevelOptions: DropdownOption[] = [
        {name: 'Grade 7'},
        {name: 'Grade 8'},
        {name: 'Grade 9'},
        {name: 'Grade 10'},
    ];

    protected seniorHighSchoolStrandOptions: DropdownOption[] = [
        {name: 'Science, Technology, Engineering, and Mathematics (STEM)'},
        {name: 'Humanities and Social Sciences (HUMSS)'},
        {name: 'Accountancy, Business, and Management (ABM)'},
        {name: 'Technical-Vocational-Livelihood (TVL)', children: [
            {name: 'Information and Communications Technology (ICT)'},
            {name: 'Home Economics (HE)'},
            {name: 'Agri-Fishery Arts'},
            {name: 'Industrial Arts'},
        ]},
        {name: 'General Academic Strand (GAS)'},
    ];

    protected collegeDepartmentOptions: DropdownOption[] = [
        {name: 'College of Computer Studies', children: [
            {name: 'Bachelor of Science in Information Technology (BSIT)'},
            {name: 'Bachelor of Science in Computer Science (BSCS)'},
            {name: 'Bachelor of Science in Information Systems (BSIS)'},
            {name: 'Bachelor of Science in Computer Engineering (BSCpE)'},
            {name: 'Bachelor of Science in Computer Science Major in Artificial Intelligence (BSCS-AI)'},
        ]},
        {name: 'College of Engineering & Architecture', children: [
            {name: 'Bachelor of Science in Civil Engineering (BSCE)'},
            {name: 'Bachelor of Science in Mechanical Engineering (BSME)'},
            {name: 'Bachelor of Science in Electrical Engineering (BSEE)'},
            {name: 'Bachelor of Science in Electronics and Communications Engineering (BSECE)'},
            {name: 'Bachelor of Science in Chemical Engineering (BSChE)'},
            {name: 'Bachelor of Science in Architecture (BSArch)'},
        ]},
        {name: 'College of Business & Management', children: [
            {name: 'Bachelor of Science in Business Administration (BSBA)'},
            {name: 'Bachelor of Science in Accountancy (BSA / BSAcc)'},
            {name: 'Bachelor of Science in Accounting Information System (BSAIS)'},
            {name: 'Bachelor of Science in Entrepreneurship (BSEntrep)'},
            {name: 'Bachelor of Science in Hospitality Management (BSHM)'},
            {name: 'Bachelor of Science in Tourism Management (BSTM)'},
            {name: 'Bachelor of Science in Real Estate Management (BSREM)'},
        ]},
        {name: 'College of Education', children: [
            {name: 'Bachelor of Secondary Education (BSEd)'},
            {name: 'Majors: English, Mathematics, Science, Social Studies, etc.'},
            {name: 'Bachelor of Elementary Education (BEEd)'},
            {name: 'Bachelor of Physical Education (BPEd)'},
            {name: 'Bachelor of Technology and Livelihood Education (BTLEd)'},
            {name: 'Bachelor of Early Childhood Education (BECEd)'},
        ]},
        {name: 'College of Health & Allied Sciences', children: [
            {name: 'Bachelor of Science in Nursing (BSN)'},
            {name: 'Bachelor of Science in Pharmacy (BSPharm)'},
            {name: 'Bachelor of Science in Medical Technology (BSMT)'},
            {name: 'Bachelor of Science in Radiologic Technology (BSRT)'},
            {name: 'Bachelor of Science in Physical Therapy (BSPT)'},
            {name: 'Bachelor of Science in Occupational Therapy (BSOT)'},
            {name: 'Doctor of Medicine (MD)'},
            {name: 'Doctor of Veterinary Medicine (DVM)'},
            {name: 'College of Arts, Humanities & Social Sciences:'},
            {name: 'Bachelor of Arts in Communication (ABComm)'},
            {name: 'Bachelor of Arts in Political Science (ABPolSci)'},
            {name: 'Bachelor of Arts in English (ABEng)'},
            {name: 'Bachelor of Arts in Psychology (ABPsych)'},
            {name: 'Bachelor of Science in Psychology (BSPsych)'},
            {name: 'Bachelor of Arts in Social Sciences (ABSocSci)'},
            {name: 'Bachelor of Fine Arts (BFA)'},
        ]},
    ];

    protected seniorHighSchoolLevelOptions: DropdownOption[] = [
        {name: 'Grade 11', children: this.seniorHighSchoolStrandOptions},
        {name: 'Grade 12', children: this.seniorHighSchoolStrandOptions},
    ];

    protected collegeLevelOptions: DropdownOption[] = [
        {name: 'Year Level 1', children: this.collegeDepartmentOptions},
        {name: 'Year Level 2', children: this.collegeDepartmentOptions},
        {name: 'Year Level 3', children: this.collegeDepartmentOptions},
        {name: 'Year Level 4', children: this.collegeDepartmentOptions},
    ];

    protected educationLevelOptions: DropdownOption[] = [
        { name: 'Preschool' , children: this.preschoolLevelOptions},
        { name: 'Elementary' , children: this.elementaryLevelOptions},
        { name: 'Junior High School' , children: this.juniorHighSchoolLevelOptions},
        { name: 'Senior High School' , children: this.seniorHighSchoolLevelOptions},
        { name: 'College' , children: this.collegeLevelOptions},
    ];

    protected yearLevelOptions: DropdownOption[] = [];
    protected programOptions: DropdownOption[] = [];
    protected selectedEducation: string | null = null;
    protected specializationOptions: DropdownOption[] = [];

    onEducationLevelChange(selected: DropdownOption) {
        this.selectedEducation = selected?.name ?? null;
        this.yearLevelOptions = selected?.children ?? [];
        this.specializationOptions = [];
        this.programOptions = []; // reset
        this.addUserForm.get('yearLevel')?.reset();
        this.addUserForm.get('program')?.reset();
        this.addUserForm.get('specialization')?.reset();
    }

    onYearLevelChange(selected: DropdownOption) {
        this.programOptions = selected?.children ?? [];
        this.specializationOptions = [];
        this.addUserForm.get('program')?.reset();
        this.addUserForm.get('specialization')?.reset();
    }

    onProgramChange(selected: DropdownOption) {
        this.specializationOptions = selected?.children ?? [];
        this.addUserForm.get('specialization')?.reset();
    }

    protected sexOptions: DropdownOption[] = [
        { name: 'Male' },
        { name: 'Female' }
    ];
    protected maritalStatusOptions: DropdownOption[] = [
        { name: 'Single' },
        { name: 'Married' },
        { name: 'Divorced' },
        { name: 'Widowed' }
    ];
    protected extNameOptions: DropdownOption[] = [
        { name: 'Jr.' },
        { name: 'Sr.' },
        { name: 'II' },
        { name: 'III' },
        { name: 'IV' },
        { name: 'V' },
        { name: 'Not Applicable' }
    ];

    protected selectedSex: DropdownOption = this.sexOptions[0];
    protected selectedMaritalStatus: DropdownOption = this.maritalStatusOptions[0];
    protected selectedExtName: DropdownOption = this.extNameOptions[0];

    protected stateOptions: any[] = [
        { label: 'Manual', value: 'manual' },
        { label: 'Import Excel File', value: 'import' }
    ];

    protected selectedState: string = 'manual';
    protected isProcessing: boolean = false;
    protected processingProgress: number = 0;
    protected processingStatus: string = '';
    protected importedUsersData: any[] = [];
    protected isLoading = signal<boolean>(false);

    protected addUserForm = new FormGroup({
        ucIdNumber: new FormControl<number | null>(null, [Validators.required]),
        firstName: new FormControl<string>('', [Validators.required]),
        middleName: new FormControl<string>(''),
        lastName: new FormControl<string>('', [Validators.required]),
        extName: new FormControl<DropdownOption | null>(null),
        sex: new FormControl<DropdownOption | null>(null, [Validators.required]),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl<string>('', [Validators.required]),
        dateOfBirth: new FormControl<Date | null>(null, [Validators.required]),
        maritalStatus: new FormControl<DropdownOption | null>(null, [Validators.required]),
        userRoles: new FormControl<DropdownOption[] | null>(null, [Validators.required]),
        educationLevel: new FormControl<DropdownOption | null>(null, [Validators.required]),
        yearLevel: new FormControl<DropdownOption | null>(null),
        program: new FormControl<DropdownOption | null>(null),
        specialization: new FormControl<DropdownOption | null>(null),
    });

    constructor(
        private firebaseService: FirebaseService,
        private dataSecurityService: DataSecurityService,
        private messageService: MessageService,
        private userService: UserService,
        private spinnerOverlayService: SpinnerOverlayService,
        private confirmationService: ConfirmationService,
        private emailJsService: EmailJsService
    ) {}

    ngOnInit() {

    }

    protected onStateChange(): void {
        this.isProcessing = false;
        this.processingProgress = 0;
        this.processingStatus = '';
        this.importedUsersData = [];
    }

    onBasicUploadAuto(event: any) {
        if (event.files && event.files.length > 0) {
            this.processExcelFile(event.files[0]);
        }
    }

    // This is for the import excel file
    private processExcelFile(file: File): void {
        this.isProcessing = true;
        this.processingProgress = 0;
        this.processingStatus = 'Reading Excel file...';

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            try {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
                
                this.processUsersData(excelData);
            } catch (error) {
                console.error('Error reading Excel file:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Failed to read Excel file. Please check the file format.' 
                });
                this.isProcessing = false;
            }
        };
        
        fileReader.readAsArrayBuffer(file);
    }

    private processUsersData(excelData: any[][]): void {
        if (excelData.length < 2) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Excel file must contain headers and at least one data row.' 
            });
            this.isProcessing = false;
            return;
        }

        const headers = excelData[0].map(header => header?.toString().toLowerCase().trim());
        const dataRows = excelData.slice(1);
        
        const requiredHeaders = ['ucidnumber', 'firstname', 'lastname', 'email'];
        const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
        
        if (missingHeaders.length > 0) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: `Missing required columns: ${missingHeaders.join(', ')}` 
            });
            this.isProcessing = false;
            return;
        }

        this.processingStatus = `Processing...`;
        this.createUsersFromExcelData(headers, dataRows);
    }

    private createUsersFromExcelData(headers: string[], dataRows: any[][]): void {
        const totalUsers = dataRows.length;
        let processedUsers = 0;
        const userCreationPromises: any[] = [];
        this.importedUsersData = [];

        dataRows.forEach((row, index) => {
            const userData = this.mapRowToUserData(headers, row);
            
            if (userData.ucIdNumber && userData.firstName && userData.lastName && userData.email) {
                const promise = this.createUserAccountAndUser(userData).then((createdUserData) => {
                    processedUsers++;
                    this.processingProgress = Math.round((processedUsers / totalUsers) * 100);
                    this.processingStatus = `Processed ${processedUsers}/${totalUsers} users`;
                    
                    if (createdUserData) {
                        this.importedUsersData.push(createdUserData);
                    }
                });
                userCreationPromises.push(promise);
            }
        });

        Promise.all(userCreationPromises)
            .then(() => {
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Success', 
                    detail: `Successfully processed ${processedUsers} users` 
                });
                this.isProcessing = false;
                this.processingProgress = 100;
                this.processingStatus = 'Complete!';
                
                this.downloadImportedUsersExcel();
            })
            .catch((error) => {
                console.error('Error processing users:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Some users failed to process. Check console for details.' 
                });
                this.isProcessing = false;
            });
    }

    private mapRowToUserData(headers: string[], row: any[]): any {
        const userData: any = {};
        
        headers.forEach((header, index) => {
            const value = row[index]?.toString().trim();
            if (value) {
                switch (header) {
                    case 'ucidnumber':
                        userData.ucIdNumber = value;
                        break;
                    case 'firstname':
                        userData.firstName = value;
                        break;
                    case 'lastname':
                        userData.lastName = value;
                        break;
                    case 'middlename':
                        userData.middleName = value;
                        break;
                    case 'extname':
                        userData.extName = value;
                        break;
                    case 'sex':
                        userData.sex = value;
                        break;
                    case 'email':
                        userData.email = value;
                        break;
                    case 'phonenumber':
                        userData.phoneNumber = value;
                        break;
                    case 'maritalstatus':
                        userData.maritalStatus = value;
                        break;
                    case 'educationlevel':
                        userData.educationLevel = value;
                        break;
                    case 'yearlevel':
                        userData.yearLevel = value;
                        break;
                    case 'program':
                        userData.program = value;
                        break;
                    case 'specialization':
                        userData.specialization = value;
                        break;
                    case 'userroles':
                        userData.userRoles = value.split(',').map((role: string) => role.trim());
                        break;
                    case 'dateofbirth':
                        const parsedDate = this.parseDateFromExcel(value);
                        if (parsedDate) {
                            userData.dateOfBirth = parsedDate;
                        }
                        break;
                }
            }
        });
        
        return userData;
    }

    private createUserAccountAndUser(userData: any): Promise<any> {
        const generatedPassword = PasswordUtil.generatePassword(8);
        const encryptedPassword = this.dataSecurityService.encryptData(generatedPassword);
        
        const userAccount = this.createUserAccountObject(userData, encryptedPassword);
        
        return this.firebaseService.addData$(
            COLLECTION.USERACCOUNTS.COLLECTIONNAME,
            userAccount,
            UserAccountModel.toJsonPartial,
            UserAccountModel.fromJson
        ).pipe(
            concatMap(createdUserAccount => {
                if (!createdUserAccount?.id) {
                    throw new Error('Failed to create UserAccount');
                }
                
                const user = this.createUserObject(userData, createdUserAccount.id);
                
                return this.firebaseService.addData$(
                    COLLECTION.USERS.COLLECTIONNAME,
                    user,
                    UserModel.toJsonPartial,
                    UserModel.fromJson
                ).pipe(
                    tap(() => this.sendAccountDetailsEmail(userData, generatedPassword)),
                    map(() => ({
                        completeName: StringUtil.buildCompleteName(
                            user.firstName!, 
                            user.middleName, 
                            user.lastName!, 
                            user.extName
                        ),
                        ucIdNumber: userData.ucIdNumber,
                        password: generatedPassword,
                        email: userData.email
                    }))
                );
            }),
            catchError(error => {
                console.error('Error creating user:', error);
                throw error;
            })
        ).toPromise();
    }

    private createUserAccountObject(userData: any, encryptedPassword: string): UserAccount {
        return {
            ucIdNumber: userData.ucIdNumber,
            password: encryptedPassword,
            isLoggedIn: false,
            isFirstLogin: true,
            metaData: {
                createdAt: new Date(),
                createdBy: APPCONSTS.SYSTEM,
                updatedAt: new Date(),
                updatedBy: APPCONSTS.SYSTEM
            }
        };
    }

    private createUserObject(userData: any, userAccountId: string): User {
        const user: User = {
            userAccountId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            profilePicture: '',
            metaData: {
                createdAt: new Date(),
                createdBy: APPCONSTS.SYSTEM,
                updatedAt: new Date(),
                updatedBy: APPCONSTS.SYSTEM
            }
        };

        // Add optional fields only if they exist
        if (userData.middleName) user.middleName = userData.middleName;
        if (userData.extName) user.extName = userData.extName;
        if (userData.sex) user.sex = userData.sex;
        if (userData.phoneNumber) user.phoneNumber = userData.phoneNumber;
        if (userData.dateOfBirth) user.dateOfBirth = userData.dateOfBirth;
        if (userData.maritalStatus) user.maritalStatus = userData.maritalStatus;
        if (userData.educationLevel || userData.yearLevel || userData.program || userData.specialization) {
            user.educationalAttainment = {
                ...(userData.educationLevel && { educationLevel: userData.educationLevel }),
                ...(userData.yearLevel && { yearLevel: userData.yearLevel }),
                ...(userData.program && { program: userData.program }),
                ...(userData.specialization && { specialization: userData.specialization })
            };
        }
        console.log(user.educationalAttainment);
        if (userData.userRoles?.length > 0) user.userRoles = userData.userRoles;
        
        return user;
    }

    private sendAccountDetailsEmail(userData: any, generatedPassword: string): void {
        const completeName = StringUtil.buildCompleteName(
            userData.firstName, 
            userData.middleName, 
            userData.lastName, 
            userData.extName
        );
        
        const emailData: AccountDetailsTemplateForm = {
            email: userData.email,
            name: completeName,
            ucIdNumber: userData.ucIdNumber,
            password: generatedPassword
        };
        
        const sendEmailData: sendEmailData = {
            data: emailData,
            type: sendEmailType.ACCOUNT_DETAILS
        };
        
        this.emailJsService.sendEmail(sendEmailData).subscribe();
    }

    private parseDateFromExcel(value: string): Date | null {
        try {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                const excelEpoch = new Date(1900, 0, 1);
                const daysSinceEpoch = numericValue - 2;
                const date = new Date(excelEpoch.getTime() + (daysSinceEpoch * 24 * 60 * 60 * 1000));
                
                const currentYear = new Date().getFullYear();
                if (date.getFullYear() >= 1900 && date.getFullYear() <= currentYear + 10) {
                    return date;
                }
            }
            
            const dateValue = new Date(value);
            if (!isNaN(dateValue.getTime())) {
                const currentYear = new Date().getFullYear();
                if (dateValue.getFullYear() >= 1900 && dateValue.getFullYear() <= currentYear + 10) {
                    return dateValue;
                }
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    protected downloadImportedUsersExcel(): void {
        if (this.importedUsersData.length === 0) {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Warning', 
                detail: 'No user data available for download.' 
            });
            return;
        }

        try {
            const worksheetData = [
                ['Complete Name', 'UC ID Number', 'Password', 'Email'],
                ...this.importedUsersData.map(user => [
                    user.completeName,
                    user.ucIdNumber,
                    user.password,
                    user.email
                ])
            ];

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            worksheet['!cols'] = [
                { width: 30 },
                { width: 15 },
                { width: 12 },
                { width: 30 }
            ];

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Imported Users');

            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `imported_users_${timestamp}.xlsx`;

            XLSX.writeFile(workbook, filename);

            this.messageService.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: `Downloaded ${this.importedUsersData.length} users to ${filename}` 
            });

        } catch (error) {
            console.error('Error creating Excel file:', error);
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Failed to create Excel file for download.' 
            });
        }
    }

    protected downloadExcelTemplate(): void {
        window.location.href = APPCONSTS.ADD_USER_EXCEL_TEMPLATE_URL;
    }

    protected onAddUser(): void {

        if (this.addUserForm.valid) {
            this.isLoading.set(true);
            this.spinnerOverlayService.show('Creating user...');
            const addUserFormValue = this.addUserForm.value;
            const password = PasswordUtil.generatePassword(8);
            const encryptedPassword = this.dataSecurityService.encryptData(password);
            const userAccount: UserAccount = {
                ucIdNumber: String(addUserFormValue.ucIdNumber!),
                password: encryptedPassword,
                isLoggedIn: false,
                isFirstLogin: true,
                lastLogin: new Date(),
                metaData: {
                    createdAt: new Date(),
                    createdBy: this.userService.getCurrentUser()?.id?? APPCONSTS.SYSTEM,
                    updatedAt: new Date(),
                    updatedBy: this.userService.getCurrentUser()?.id?? APPCONSTS.SYSTEM
                }
            }
            this.firebaseService.addData$<UserAccount>(COLLECTION.USERACCOUNTS.COLLECTIONNAME, userAccount).pipe(

                concatMap((createdUserAccount) => {
                    const user: User = {
                        userAccountId: createdUserAccount.id,
                        firstName: addUserFormValue.firstName!,
                        middleName: addUserFormValue.middleName!,
                        lastName: addUserFormValue.lastName!,
                        extName: addUserFormValue.extName?.name,
                        sex: addUserFormValue.sex?.name,
                        email: addUserFormValue.email!,
                        phoneNumber: addUserFormValue.phoneNumber!,
                        dateOfBirth: addUserFormValue.dateOfBirth!,
                        maritalStatus: addUserFormValue.maritalStatus?.name,
                        educationalAttainment: {
                            educationLevel: addUserFormValue.educationLevel?.name,
                            yearLevel: addUserFormValue.yearLevel?.name,
                            program: addUserFormValue.program?.name,
                            specialization: addUserFormValue.specialization?.name
                        },
                        userRoles: addUserFormValue.userRoles?.map(role => role.name) || [],
                        metaData: {
                            createdAt: new Date(),
                            createdBy: this.userService.getCurrentUser()?.id?? APPCONSTS.SYSTEM,
                            updatedAt: new Date(),
                            updatedBy: this.userService.getCurrentUser()?.id?? APPCONSTS.SYSTEM
                        }
                    }
                    return this.firebaseService.addData$<User>(COLLECTION.USERS.COLLECTIONNAME, user)
                }),
                concatMap((success) => {
                    if (success) {
                        this.spinnerOverlayService.show('Sending Email...');
                        const completeName = StringUtil.buildCompleteName(
                            addUserFormValue.firstName!, 
                            addUserFormValue.middleName || undefined, 
                            addUserFormValue.lastName!, 
                            addUserFormValue.extName?.name || undefined
                        );
                        
                        const emailData: AccountDetailsTemplateForm = {
                            email: addUserFormValue.email!,
                            name: completeName,
                            ucIdNumber: String(addUserFormValue.ucIdNumber!),
                            password: password
                        };
                        
                        const sendEmailData: sendEmailData = {
                            data: emailData,
                            type: sendEmailType.ACCOUNT_DETAILS
                        };
                        return this.emailJsService.sendEmail(sendEmailData);
                    }
                    else {
                        throw new Error('Error adding user');
                    }
                }),
                tap(emailSent => {
                    const message = emailSent 
                        ? 'User added successfully. Account details have been sent to the user\'s email.'
                        : 'User added successfully. However, there was an issue sending the account details email.';
                    
                    this.confirmationService.confirm({
                        target: event?.target as EventTarget,
                        message: message,
                        header: 'Success',
                        icon: 'pi pi-check',
                        rejectVisible: false,
                        acceptButtonProps: {
                            label: 'OK',
                            severity: 'primary',
                            size: 'small',
                        },
            
                        accept: () => {
                            this.addUserForm.reset();
                        },
                        reject: () => {
                            this.addUserForm.reset();
                        },
                    });
                }),
                catchError(error => {
                    this.addUserForm.reset();
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error adding user: ' + error.message,
                        life: 5000
                    });
                    return of(null);
                }),
                finalize(() => {
                    this.spinnerOverlayService.hide();
                    this.isLoading.set(false);
                })
            ).subscribe();
        } 
        else {
            this.addUserForm.markAllAsTouched();
        }
    }
}

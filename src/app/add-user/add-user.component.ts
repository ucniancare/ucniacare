import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import * as XLSX from 'xlsx';
import { FirebaseService } from '../shared-services/firebase.service';
import { DataSecurityService } from '../shared-services/data-security.service';
import { UserAccount } from '../shared-interfaces/user-account';
import { User } from '../shared-interfaces/user';
import { UserAccountModel } from '../shared-models/user-account.model';
import { UserModel } from '../shared-models/user.model';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PasswordUtil } from '../shared-utils/password-util';
import { APPCONSTS } from '../constants/data.constants';

@Component({
    selector: 'add-user',
    imports: [
        FormsModule,
        SelectButtonModule,
        FileUploadModule,
        CommonModule,
        DividerModule,
        ProgressBarModule,
        ButtonModule
    ],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.css',
    standalone: true
})
export class AddUserComponent {

    protected stateOptions: any[] = [
        { label: 'Manual', value: 'manual' },
        { label: 'Import Excel File', value: 'import' }
    ];
    protected selectedState: string = 'manual';
    protected isProcessing: boolean = false;
    protected processingProgress: number = 0;
    protected processingStatus: string = '';
    protected importedUsersData: any[] = [];

    constructor(
        private firebaseService: FirebaseService,
        private dataSecurityService: DataSecurityService,
        private messageService: MessageService
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
        console.log('uploaded file: ', event);
        if (event.files && event.files.length > 0) {
            this.processExcelFile(event.files[0]);
        }
    }

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

    private async createUserAccountAndUser(userData: any): Promise<any> {
        try {
            const generatedPassword = PasswordUtil.generatePassword(8);
            const encryptedPassword = this.dataSecurityService.encryptData(generatedPassword);
            
            const userAccount: UserAccount = {
                ucIdNumber: userData.ucIdNumber,
                password: encryptedPassword,
                isLoggedIn: false,
                isFirstLogin: true,
                metaData: {
                    createdAt: new Date(),
                    createdBy: 'system',
                    updatedAt: new Date(),
                    updatedBy: 'system'
                }
            };
            
            Object.keys(userAccount).forEach(key => {
                if (userAccount[key as keyof UserAccount] === undefined) {
                    delete userAccount[key as keyof UserAccount];
                }
            });

            const createdUserAccount = await this.firebaseService.addData$(
                COLLECTION.USERACCOUNTS.COLLECTIONNAME,
                userAccount,
                UserAccountModel.toJsonPartial,
                UserAccountModel.fromJson
            ).toPromise();

            if (!createdUserAccount?.id) {
                throw new Error('Failed to create UserAccount');
            }

            const user: User = {
                userAccountId: createdUserAccount.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                metaData: {
                    createdAt: new Date(),
                    createdBy: 'system',
                    updatedAt: new Date(),
                    updatedBy: 'system'
                }
            };
            
            if (userData.middleName) user.middleName = userData.middleName;
            if (userData.extName) user.extName = userData.extName;
            if (userData.sex) user.sex = userData.sex;
            if (userData.phoneNumber) user.phoneNumber = userData.phoneNumber;
            if (userData.dateOfBirth) user.dateOfBirth = userData.dateOfBirth;
            if (userData.maritalStatus) user.maritalStatus = userData.maritalStatus;
            if (userData.userRoles && userData.userRoles.length > 0) user.userRoles = userData.userRoles;
            
            user.profilePicture = '';
            
            Object.keys(user).forEach(key => {
                if (user[key as keyof User] === undefined) {
                    delete user[key as keyof User];
                }
            });

            await this.firebaseService.addData$(
                COLLECTION.USERS.COLLECTIONNAME,
                user,
                UserModel.toJsonPartial,
                UserModel.fromJson
            ).toPromise();

            console.log(`Successfully created user: ${userData.firstName} ${userData.lastName} with password: ${generatedPassword}`);
            
            return {
                completeName: this.buildCompleteName(user.firstName!, user.middleName, user.lastName!, user.extName),
                ucIdNumber: userData.ucIdNumber,
                password: generatedPassword,
                email: userData.email
            };
            
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
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

    private buildCompleteName(firstName: string, middleName?: string, lastName?: string, extName?: string): string {
        let completeName = firstName;
        if (middleName) completeName += ` ${middleName}`;
        if (lastName) completeName += ` ${lastName}`;
        if (extName) completeName += ` ${extName}`;
        return completeName;
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

}

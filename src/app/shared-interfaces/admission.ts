import { MetaData } from "./meta-data";


export class Admission {
    id?: string;
    userId?: string;
    admissionDate?: Date;
    dischargeDate?: Date;
    hospitalName?: string;
    reason?: string;
    attendingDoctors?: string[];
    outcome?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData;
}
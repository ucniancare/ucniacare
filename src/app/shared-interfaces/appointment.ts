import { MetaData } from "./meta-data";

export class Appointment {
    id?: string;
    userId?: string;
    type?: string;
    notes?: string;
    date?: Date;
    to?: string;
    from?: string;
    attendingStaff?: string[];
    files?: string[];
    attendingDoctors?: string[];
    attendingNurses?: string[];
    status?: string;
    metaData?: MetaData;

}
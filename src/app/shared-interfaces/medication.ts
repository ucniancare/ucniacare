import { MetaData } from "./meta-data";

export class Medication {
    id?: string;
    userId?: string;
    name?: string;
    dosage?: string;
    frequency?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData;
}
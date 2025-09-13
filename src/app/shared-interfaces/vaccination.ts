import { MetaData } from "./meta-data";

export class Vaccination {
    id?: string;
    userId?: string;
    name?: string;
    manufacturer?: string;
    doseNumber?: string;
    dateGiven?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData
}
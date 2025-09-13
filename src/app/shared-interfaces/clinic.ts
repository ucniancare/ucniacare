import { MetaData } from "./meta-data";

export class Clinic {
    id?: string;
    name?: string;
    description?: string;
    openHours?: string;
    breakHours?: string;
    closingHours?: string;
    doctors?: string[];
    nurses?: string[];
    staff?: string[];
    metaData?: MetaData;
}
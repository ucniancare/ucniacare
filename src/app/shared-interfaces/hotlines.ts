import { MetaData } from "./meta-data";

export class Hotline {

    id?: string;
    name?: string;
    organization?: string;
    phoneNumber?: string[];
    category?: string;
    location?: string;
    availability?: string;
    notes?: string;
    metaData?: MetaData
}
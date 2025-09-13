import { MetaData } from "./meta-data";

export class Personnel {
    id?: string;
    userId?: string;
    field?: string[];
    clinicAssigned?: string[];
    schedule?: string[];
    type?: string[];
    metaData?: MetaData
}
import { MetaData } from "./meta-data";

export class Allergy {
    id?: string;
    userId?: string;
    allergen?: string;
    allergyType?: string;
    reaction?: string;
    severity?: string;
    dateRecorded?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData
}
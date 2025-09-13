import { MetaData } from "./meta-data";


export class SocialHistory {
    id?: string;
    userId?: string;
    smokingStatus?: string;
    alcoholUse?: string;
    drugUse?: string;
    exerciseFrequency?: string;
    exerciseNotes?: string;
    livingStatus?: string;
    diet?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData
}
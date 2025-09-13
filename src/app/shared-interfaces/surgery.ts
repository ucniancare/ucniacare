import { MetaData } from "./meta-data";

export class Surgery {
    id?: string;
    userId?: string;
    procedureName?: string;
    date?: Date;
    surgeons?: string[];
    hospitalName?: string;
    anesthesiaType?: string;
    complications?: string;
    outcome?: string;
    notes?: string;
    files?: string[];
    metaData?: MetaData

}
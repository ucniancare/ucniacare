import { MetaData } from "./meta-data";

export class VitalSigns {
    id?: string;
    userId?: string;
    temperature?: string;
    heartRate?: string;
    respiratoryRate?: string;
    bloodPressure?: string;
    oxygenSaturation?: string;
    metaData?: MetaData
}
import { MetaData } from "./meta-data";

export class Bulletin {
    id?: string;
    type?: string[];
    images?: string[];
    headline?: string;
    description?: string;
    metaData?: MetaData;
}
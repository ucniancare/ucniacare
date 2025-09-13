import { MetaData } from "./meta-data";

export class Notification {
    id?: string;
    targetUsers?: string[];
    type?: string;
    title?: string;
    description?: string;
    status?: string;
    origin?: string;
    metaData?: MetaData
}
import { MetaData } from "./meta-data";

export interface UserAccount {
    id?: string;
    ucIdNumber?: string;
    password?: string;
    metaData?: MetaData;

}

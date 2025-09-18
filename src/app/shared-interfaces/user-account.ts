import { MetaData } from "./meta-data";

export class UserAccount {
    id?: string;
    ucIdNumber?: string;
    password?: string;
    isLoggedIn?: boolean;
    lastLogin?: Date;
    metaData?: MetaData;
}

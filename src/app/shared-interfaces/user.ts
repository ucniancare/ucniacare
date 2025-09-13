import { MetaData } from "./meta-data";

export class User {
    id?: string;
    userAccountId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    extName?: string;
    sex?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    maritalStatus?: string;
    userRoles?: string[];
    metaData?: MetaData;
}
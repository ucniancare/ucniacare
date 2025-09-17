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
    dateOfBirth?: Date;
    maritalStatus?: string;
    userRoles?: string[];
    profilePicture?: string;
    metaData?: MetaData;
}
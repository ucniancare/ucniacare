import { MetaData } from "./meta-data";
import { EducationalAttainment } from "./educational-attainment";

export class User {
    id?: string;
    userAccountId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    extName?: string;
    sex?: string;
    maritalStatus?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    educationalAttainment?: EducationalAttainment;
    userRoles?: string[];
    profilePicture?: string;
    metaData?: MetaData;
}
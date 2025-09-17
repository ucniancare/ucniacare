import { Timestamp } from "@angular/fire/firestore";
import { User } from "../shared-interfaces/user";


export class UserModel {

    static fromJson(json: any): User {
        return {
            id: json.id,
            userAccountId: json.userAccountId,
            firstName: json.firstName,
            lastName: json.lastName,
            middleName: json.middleName,
            extName: json.extName,
            sex: json.sex,
            email: json.email,
            phoneNumber: json.phoneNumber,
            dateOfBirth: json.dateOfBirth,
            maritalStatus: json.maritalStatus,
            userRoles: json.userRoles,
            profilePicture: json.profilePicture,
            metaData: json.metaData
        };
    }

    static toJsonPartial(user: Partial<User>): any {
        return {
            ...(user.id !== undefined && { id: user.id }),
            ...(user.userAccountId !== undefined && { userAccountId: user.userAccountId }),
            ...(user.firstName !== undefined && { firstName: user.firstName }),
            ...(user.lastName !== undefined && { lastName: user.lastName }),
            ...(user.middleName !== undefined && { middleName: user.middleName }),
            ...(user.extName !== undefined && { extName: user.extName }),
            ...(user.sex !== undefined && { sex: user.sex }),
            ...(user.email !== undefined && { email: user.email }),
            ...(user.phoneNumber !== undefined && { phoneNumber: user.phoneNumber }),
            ...(user.dateOfBirth !== undefined && { dateOfBirth: user.dateOfBirth }),
            ...(user.maritalStatus !== undefined && { maritalStatus: user.maritalStatus }),
            ...(user.userRoles !== undefined && { userRoles: user.userRoles }),
            ...(user.profilePicture !== undefined && { profilePicture: user.profilePicture }),
            ...(user.metaData !== undefined && { metaData: user.metaData })
        }
    }

    static toJson(user: User): any {
        return {
            //id: user.id,
            userAccountId: user.userAccountId,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            extName: user.extName,
            sex: user.sex,
            email: user.email,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            maritalStatus: user.maritalStatus,
            userRoles: user.userRoles,
            profilePicture: user.profilePicture,
            metaData: user.metaData
        };
    }
}

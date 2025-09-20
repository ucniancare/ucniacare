import { Timestamp } from "@angular/fire/firestore";
import { UserAccount } from "../shared-interfaces/user-account";


export class UserAccountModel {

    static fromJson(json: any): UserAccount {
        return {
            id: json.id,
            ucIdNumber: json.ucIdNumber,
            password: json.password,
            isLoggedIn: json.isLoggedIn,
            lastLogin: json.lastLogin,
            isFirstLogin: json.isFirstLogin,
            metaData: json.metaData
        };
    }

    static toJsonPartial(userAccount: Partial<UserAccount>): any {
        return {
            ...(userAccount.id !== undefined && { id: userAccount.id }),
            ...(userAccount.ucIdNumber !== undefined && { ucIdNumber: userAccount.ucIdNumber }),
            ...(userAccount.password !== undefined && { password: userAccount.password }),
            ...(userAccount.isLoggedIn !== undefined && { isLoggedIn: userAccount.isLoggedIn }),
            ...(userAccount.lastLogin !== undefined && { lastLogin: userAccount.lastLogin }),
            ...(userAccount.isFirstLogin !== undefined && { isFirstLogin: userAccount.isFirstLogin }),
            ...(userAccount.metaData !== undefined && { metaData: userAccount.metaData })
        }
    }

    static toJson(userAccount: UserAccount): any {
        return {
            //id: userAccount.id,
            ucIdNumber: userAccount.ucIdNumber,
            password: userAccount.password,
            isLoggedIn: userAccount.isLoggedIn,
            lastLogin: userAccount.lastLogin,
            isFirstLogin: userAccount.isFirstLogin,
            metaData: userAccount.metaData
        };
    }
}
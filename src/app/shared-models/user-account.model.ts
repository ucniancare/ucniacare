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
            metaData: json.metaData
        };
    }

    static toJsonPartial(user: Partial<UserAccount>): any {
        return {
            ...(user.id !== undefined && { id: user.id }),
            ...(user.ucIdNumber !== undefined && { ucIdNumber: user.ucIdNumber }),
            ...(user.password !== undefined && { password: user.password }),
            ...(user.isLoggedIn !== undefined && { isLoggedIn: user.isLoggedIn }),
            ...(user.lastLogin !== undefined && { lastLogin: user.lastLogin }),
            ...(user.metaData !== undefined && { metaData: user.metaData })
        }
    }

    static toJson(user: UserAccount): any {
        return {
            //id: user.id,
            ucIdNumber: user.ucIdNumber,
            password: user.password,
            isLoggedIn: user.isLoggedIn,
            lastLogin: user.lastLogin,
            metaData: user.metaData
        };
    }
}
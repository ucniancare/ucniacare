import { Timestamp } from "@angular/fire/firestore";
import { User } from "../shared-interfaces/user-account";


export class UserModel {

    static fromJson(json: any, id?: string): User {
        return {
            id: id ?? json.id,
            name: json.name,
            email: json.email,
            password: json.password,
            createdAt: json.createdAt instanceof Timestamp ? json.createdAt.toDate() : json.createdAt,
            updatedAt: json.updatedAt instanceof Timestamp ? json.updatedAt.toDate() : json.updatedAt
        };
    }

    static toJsonPartial(user: Partial<User>): any {
        return {
            ...(user.name !== undefined && { name: user.name }),
            ...(user.email !== undefined && { email: user.email }),
            ...(user.password !== undefined && { password: user.password }),
            ...(user.createdAt !== undefined && { createdAt: user.createdAt }),
            ...(user.updatedAt !== undefined && { updatedAt: user.updatedAt })
        }
    }

    static toJson(user: User): any {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt ?? new Date(),
            updatedAt: user.updatedAt ?? new Date()
        };
    }
}
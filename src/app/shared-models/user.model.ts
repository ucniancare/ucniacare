import { Timestamp } from "@angular/fire/firestore";
import { User } from "../shared-interfaces/user";


export class UserModel {
    static fromJson(json: any, id?: string): User {
        return {
            id: id ?? json.id,
            name: json.name,
            email: json.email,
            password: json.password,
            createdAt: json.createdAt instanceof Timestamp ? json.createdAt.toDate() : json.createdAt
        };
    }

    static toJson(user: User): any {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt ?? new Date()
        };
    }
}
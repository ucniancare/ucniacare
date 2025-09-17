import { Timestamp } from "@angular/fire/firestore";
import { Hotline } from "../shared-interfaces/hotline";


export class HotlineModel {

    static fromJson(json: any): Hotline {
        return {
            id: json.id,
            name: json.name,
            organization: json.organization,
            phoneNumber: json.phoneNumber,
            category: json.category,
            location: json.location,
            availability: json.availability,
            notes: json.notes,
            metaData: json.metaData
        };
    }

    static toJsonPartial(hotline: Partial<Hotline>): any {
        return {
            ...(hotline.id !== undefined && { id: hotline.id }),
            ...(hotline.name !== undefined && { name: hotline.name }),
            ...(hotline.organization !== undefined && { organization: hotline.organization }),
            ...(hotline.phoneNumber !== undefined && { phoneNumber: hotline.phoneNumber }),
            ...(hotline.category !== undefined && { category: hotline.category }),
            ...(hotline.location !== undefined && { location: hotline.location }),
            ...(hotline.availability !== undefined && { availability: hotline.availability }),
            ...(hotline.notes !== undefined && { notes: hotline.notes }),
            ...(hotline.metaData !== undefined && { metaData: hotline.metaData })
        }
    }

    static toJson(hotline: Hotline): any {
        return {
            //id: hotline.id,
            name: hotline.name,
            organization: hotline.organization,
            phoneNumber: hotline.phoneNumber,
            category: hotline.category,
            location: hotline.location,
            availability: hotline.availability,
            notes: hotline.notes,
            metaData: hotline.metaData
        };
    }
}

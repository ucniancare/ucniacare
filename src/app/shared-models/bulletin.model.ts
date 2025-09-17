import { Timestamp } from "@angular/fire/firestore";
import { Bulletin } from "../shared-interfaces/bulletin";


export class BulletinModel {

    static fromJson(json: any): Bulletin {
        return {
            id: json.id,
            type: json.type,
            images: json.images,
            headline: json.headline,
            description: json.description,
            metaData: json.metaData
        };
    }

    static toJsonPartial(bulletin: Partial<Bulletin>): any {
        return {
            ...(bulletin.id !== undefined && { id: bulletin.id }),
            ...(bulletin.type !== undefined && { type: bulletin.type }),
            ...(bulletin.images !== undefined && { images: bulletin.images }),
            ...(bulletin.headline !== undefined && { headline: bulletin.headline }),
            ...(bulletin.description !== undefined && { description: bulletin.description }),
            ...(bulletin.metaData !== undefined && { metaData: bulletin.metaData })
        }
    }

    static toJson(bulletin: Bulletin): any {
        return {
            //id: bulletin.id,
            type: bulletin.type,
            images: bulletin.images,
            headline: bulletin.headline,
            description: bulletin.description,
            metaData: bulletin.metaData
        };
    }
}

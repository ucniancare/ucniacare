import { Timestamp } from "@angular/fire/firestore";
import { Allergy } from "../shared-interfaces/allergy";


export class AllergyModel {

    static fromJson(json: any): Allergy {
        return {
            id: json.id,
            userId: json.userId,
            allergen: json.allergen,
            allergyType: json.allergyType,
            reaction: json.reaction,
            severity: json.severity,
            dateRecorded: json.dateRecorded,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(allergy: Partial<Allergy>): any {
        return {
            ...(allergy.id !== undefined && { id: allergy.id }),
            ...(allergy.userId !== undefined && { userId: allergy.userId }),
            ...(allergy.allergen !== undefined && { allergen: allergy.allergen }),
            ...(allergy.allergyType !== undefined && { allergyType: allergy.allergyType }),
            ...(allergy.reaction !== undefined && { reaction: allergy.reaction }),
            ...(allergy.severity !== undefined && { severity: allergy.severity }),
            ...(allergy.dateRecorded !== undefined && { dateRecorded: allergy.dateRecorded }),
            ...(allergy.notes !== undefined && { notes: allergy.notes }),
            ...(allergy.files !== undefined && { files: allergy.files }),
            ...(allergy.metaData !== undefined && { metaData: allergy.metaData })
        }
    }

    static toJson(allergy: Allergy): any {
        return {
            //id: allergy.id,
            userId: allergy.userId,
            allergen: allergy.allergen,
            allergyType: allergy.allergyType,
            reaction: allergy.reaction,
            severity: allergy.severity,
            dateRecorded: allergy.dateRecorded,
            notes: allergy.notes,
            files: allergy.files,
            metaData: allergy.metaData
        };
    }
}

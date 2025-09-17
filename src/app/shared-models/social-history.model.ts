import { Timestamp } from "@angular/fire/firestore";
import { SocialHistory } from "../shared-interfaces/social-history";


export class SocialHistoryModel {

    static fromJson(json: any): SocialHistory {
        return {
            id: json.id,
            userId: json.userId,
            smokingStatus: json.smokingStatus,
            alcoholUse: json.alcoholUse,
            drugUse: json.drugUse,
            exerciseFrequency: json.exerciseFrequency,
            exerciseNotes: json.exerciseNotes,
            livingStatus: json.livingStatus,
            diet: json.diet,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(socialHistory: Partial<SocialHistory>): any {
        return {
            ...(socialHistory.id !== undefined && { id: socialHistory.id }),
            ...(socialHistory.userId !== undefined && { userId: socialHistory.userId }),
            ...(socialHistory.smokingStatus !== undefined && { smokingStatus: socialHistory.smokingStatus }),
            ...(socialHistory.alcoholUse !== undefined && { alcoholUse: socialHistory.alcoholUse }),
            ...(socialHistory.drugUse !== undefined && { drugUse: socialHistory.drugUse }),
            ...(socialHistory.exerciseFrequency !== undefined && { exerciseFrequency: socialHistory.exerciseFrequency }),
            ...(socialHistory.exerciseNotes !== undefined && { exerciseNotes: socialHistory.exerciseNotes }),
            ...(socialHistory.livingStatus !== undefined && { livingStatus: socialHistory.livingStatus }),
            ...(socialHistory.diet !== undefined && { diet: socialHistory.diet }),
            ...(socialHistory.notes !== undefined && { notes: socialHistory.notes }),
            ...(socialHistory.files !== undefined && { files: socialHistory.files }),
            ...(socialHistory.metaData !== undefined && { metaData: socialHistory.metaData })
        }
    }

    static toJson(socialHistory: SocialHistory): any {
        return {
            //id: socialHistory.id,
            userId: socialHistory.userId,
            smokingStatus: socialHistory.smokingStatus,
            alcoholUse: socialHistory.alcoholUse,
            drugUse: socialHistory.drugUse,
            exerciseFrequency: socialHistory.exerciseFrequency,
            exerciseNotes: socialHistory.exerciseNotes,
            livingStatus: socialHistory.livingStatus,
            diet: socialHistory.diet,
            notes: socialHistory.notes,
            files: socialHistory.files,
            metaData: socialHistory.metaData
        };
    }
}

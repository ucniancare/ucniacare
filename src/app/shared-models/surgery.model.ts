import { Timestamp } from "@angular/fire/firestore";
import { Surgery } from "../shared-interfaces/surgery";


export class SurgeryModel {

    static fromJson(json: any): Surgery {
        return {
            id: json.id,
            userId: json.userId,
            procedureName: json.procedureName,
            date: json.date,
            surgeons: json.surgeons,
            hospitalName: json.hospitalName,
            anesthesiaType: json.anesthesiaType,
            complications: json.complications,
            outcome: json.outcome,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(surgery: Partial<Surgery>): any {
        return {
            ...(surgery.id !== undefined && { id: surgery.id }),
            ...(surgery.userId !== undefined && { userId: surgery.userId }),
            ...(surgery.procedureName !== undefined && { procedureName: surgery.procedureName }),
            ...(surgery.date !== undefined && { date: surgery.date }),
            ...(surgery.surgeons !== undefined && { surgeons: surgery.surgeons }),
            ...(surgery.hospitalName !== undefined && { hospitalName: surgery.hospitalName }),
            ...(surgery.anesthesiaType !== undefined && { anesthesiaType: surgery.anesthesiaType }),
            ...(surgery.complications !== undefined && { complications: surgery.complications }),
            ...(surgery.outcome !== undefined && { outcome: surgery.outcome }),
            ...(surgery.notes !== undefined && { notes: surgery.notes }),
            ...(surgery.files !== undefined && { files: surgery.files }),
            ...(surgery.metaData !== undefined && { metaData: surgery.metaData })
        }
    }

    static toJson(surgery: Surgery): any {
        return {
            //id: surgery.id,
            userId: surgery.userId,
            procedureName: surgery.procedureName,
            date: surgery.date,
            surgeons: surgery.surgeons,
            hospitalName: surgery.hospitalName,
            anesthesiaType: surgery.anesthesiaType,
            complications: surgery.complications,
            outcome: surgery.outcome,
            notes: surgery.notes,
            files: surgery.files,
            metaData: surgery.metaData
        };
    }
}

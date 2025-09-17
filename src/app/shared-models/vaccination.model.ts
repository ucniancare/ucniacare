import { Timestamp } from "@angular/fire/firestore";
import { Vaccination } from "../shared-interfaces/vaccination";


export class VaccinationModel {

    static fromJson(json: any): Vaccination {
        return {
            id: json.id,
            userId: json.userId,
            name: json.name,
            manufacturer: json.manufacturer,
            doseNumber: json.doseNumber,
            doseType: json.doseType,
            dateGiven: json.dateGiven,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(vaccination: Partial<Vaccination>): any {
        return {
            ...(vaccination.id !== undefined && { id: vaccination.id }),
            ...(vaccination.userId !== undefined && { userId: vaccination.userId }),
            ...(vaccination.name !== undefined && { name: vaccination.name }),
            ...(vaccination.manufacturer !== undefined && { manufacturer: vaccination.manufacturer }),
            ...(vaccination.doseNumber !== undefined && { doseNumber: vaccination.doseNumber }),
            ...(vaccination.doseType !== undefined && { doseType: vaccination.doseType }),
            ...(vaccination.dateGiven !== undefined && { dateGiven: vaccination.dateGiven }),
            ...(vaccination.notes !== undefined && { notes: vaccination.notes }),
            ...(vaccination.files !== undefined && { files: vaccination.files }),
            ...(vaccination.metaData !== undefined && { metaData: vaccination.metaData })
        }
    }

    static toJson(vaccination: Vaccination): any {
        return {
            //id: vaccination.id,
            userId: vaccination.userId,
            name: vaccination.name,
            manufacturer: vaccination.manufacturer,
            doseNumber: vaccination.doseNumber,
            doseType: vaccination.doseType,
            dateGiven: vaccination.dateGiven,
            notes: vaccination.notes,
            files: vaccination.files,
            metaData: vaccination.metaData
        };
    }
}

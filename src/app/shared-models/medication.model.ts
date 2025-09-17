import { Timestamp } from "@angular/fire/firestore";
import { Medication } from "../shared-interfaces/medication";


export class MedicationModel {

    static fromJson(json: any): Medication {
        return {
            id: json.id,
            userId: json.userId,
            name: json.name,
            dosage: json.dosage,
            frequency: json.frequency,
            startDate: json.startDate,
            endDate: json.endDate,
            status: json.status,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(medication: Partial<Medication>): any {
        return {
            ...(medication.id !== undefined && { id: medication.id }),
            ...(medication.userId !== undefined && { userId: medication.userId }),
            ...(medication.name !== undefined && { name: medication.name }),
            ...(medication.dosage !== undefined && { dosage: medication.dosage }),
            ...(medication.frequency !== undefined && { frequency: medication.frequency }),
            ...(medication.startDate !== undefined && { startDate: medication.startDate }),
            ...(medication.endDate !== undefined && { endDate: medication.endDate }),
            ...(medication.status !== undefined && { status: medication.status }),
            ...(medication.notes !== undefined && { notes: medication.notes }),
            ...(medication.files !== undefined && { files: medication.files }),
            ...(medication.metaData !== undefined && { metaData: medication.metaData })
        }
    }

    static toJson(medication: Medication): any {
        return {
            //id: medication.id,
            userId: medication.userId,
            name: medication.name,
            dosage: medication.dosage,
            frequency: medication.frequency,
            startDate: medication.startDate,
            endDate: medication.endDate,
            status: medication.status,
            notes: medication.notes,
            files: medication.files,
            metaData: medication.metaData
        };
    }
}

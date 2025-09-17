import { Timestamp } from "@angular/fire/firestore";
import { Admission } from "../shared-interfaces/admission";


export class AdmissionModel {

    static fromJson(json: any): Admission {
        return {
            id: json.id,
            userId: json.userId,
            admissionDate: json.admissionDate,
            dischargeDate: json.dischargeDate,
            hospitalName: json.hospitalName,
            reason: json.reason,
            attendingDoctors: json.attendingDoctors,
            outcome: json.outcome,
            notes: json.notes,
            files: json.files,
            metaData: json.metaData
        };
    }

    static toJsonPartial(admission: Partial<Admission>): any {
        return {
            ...(admission.id !== undefined && { id: admission.id }),
            ...(admission.userId !== undefined && { userId: admission.userId }),
            ...(admission.admissionDate !== undefined && { admissionDate: admission.admissionDate }),
            ...(admission.dischargeDate !== undefined && { dischargeDate: admission.dischargeDate }),
            ...(admission.hospitalName !== undefined && { hospitalName: admission.hospitalName }),
            ...(admission.reason !== undefined && { reason: admission.reason }),
            ...(admission.attendingDoctors !== undefined && { attendingDoctors: admission.attendingDoctors }),
            ...(admission.outcome !== undefined && { outcome: admission.outcome }),
            ...(admission.notes !== undefined && { notes: admission.notes }),
            ...(admission.files !== undefined && { files: admission.files }),
            ...(admission.metaData !== undefined && { metaData: admission.metaData })
        }
    }

    static toJson(admission: Admission): any {
        return {
            //id: admission.id,
            userId: admission.userId,
            admissionDate: admission.admissionDate,
            dischargeDate: admission.dischargeDate,
            hospitalName: admission.hospitalName,
            reason: admission.reason,
            attendingDoctors: admission.attendingDoctors,
            outcome: admission.outcome,
            notes: admission.notes,
            files: admission.files,
            metaData: admission.metaData
        };
    }
}

import { Timestamp } from "@angular/fire/firestore";
import { VitalSigns } from "../shared-interfaces/vital-signs";


export class VitalSignsModel {

    static fromJson(json: any): VitalSigns {
        return {
            id: json.id,
            userId: json.userId,
            temperature: json.temperature,
            heartRate: json.heartRate,
            respiratoryRate: json.respiratoryRate,
            bloodPressure: json.bloodPressure,
            oxygenSaturation: json.oxygenSaturation,
            metaData: json.metaData
        };
    }

    static toJsonPartial(vitalSigns: Partial<VitalSigns>): any {
        return {
            ...(vitalSigns.id !== undefined && { id: vitalSigns.id }),
            ...(vitalSigns.userId !== undefined && { userId: vitalSigns.userId }),
            ...(vitalSigns.temperature !== undefined && { temperature: vitalSigns.temperature }),
            ...(vitalSigns.heartRate !== undefined && { heartRate: vitalSigns.heartRate }),
            ...(vitalSigns.respiratoryRate !== undefined && { respiratoryRate: vitalSigns.respiratoryRate }),
            ...(vitalSigns.bloodPressure !== undefined && { bloodPressure: vitalSigns.bloodPressure }),
            ...(vitalSigns.oxygenSaturation !== undefined && { oxygenSaturation: vitalSigns.oxygenSaturation }),
            ...(vitalSigns.metaData !== undefined && { metaData: vitalSigns.metaData })
        }
    }

    static toJson(vitalSigns: VitalSigns): any {
        return {
            //id: vitalSigns.id,
            userId: vitalSigns.userId,
            temperature: vitalSigns.temperature,
            heartRate: vitalSigns.heartRate,
            respiratoryRate: vitalSigns.respiratoryRate,
            bloodPressure: vitalSigns.bloodPressure,
            oxygenSaturation: vitalSigns.oxygenSaturation,
            metaData: vitalSigns.metaData
        };
    }
}

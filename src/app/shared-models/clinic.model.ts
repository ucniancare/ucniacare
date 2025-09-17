import { Timestamp } from "@angular/fire/firestore";
import { Clinic } from "../shared-interfaces/clinic";


export class ClinicModel {

    static fromJson(json: any): Clinic {
        return {
            id: json.id,
            name: json.name,
            description: json.description,
            openHours: json.openHours,
            breakHours: json.breakHours,
            closingHours: json.closingHours,
            doctors: json.doctors,
            nurses: json.nurses,
            staff: json.staff,
            metaData: json.metaData
        };
    }

    static toJsonPartial(clinic: Partial<Clinic>): any {
        return {
            ...(clinic.id !== undefined && { id: clinic.id }),
            ...(clinic.name !== undefined && { name: clinic.name }),
            ...(clinic.description !== undefined && { description: clinic.description }),
            ...(clinic.openHours !== undefined && { openHours: clinic.openHours }),
            ...(clinic.breakHours !== undefined && { breakHours: clinic.breakHours }),
            ...(clinic.closingHours !== undefined && { closingHours: clinic.closingHours }),
            ...(clinic.doctors !== undefined && { doctors: clinic.doctors }),
            ...(clinic.nurses !== undefined && { nurses: clinic.nurses }),
            ...(clinic.staff !== undefined && { staff: clinic.staff }),
            ...(clinic.metaData !== undefined && { metaData: clinic.metaData })
        }
    }

    static toJson(clinic: Clinic): any {
        return {
            //id: clinic.id,
            name: clinic.name,
            description: clinic.description,
            openHours: clinic.openHours,
            breakHours: clinic.breakHours,
            closingHours: clinic.closingHours,
            doctors: clinic.doctors,
            nurses: clinic.nurses,
            staff: clinic.staff,
            metaData: clinic.metaData
        };
    }
}

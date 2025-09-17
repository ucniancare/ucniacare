import { Timestamp } from "@angular/fire/firestore";
import { Personnel } from "../shared-interfaces/personnel";


export class PersonnelModel {

    static fromJson(json: any): Personnel {
        return {
            id: json.id,
            userId: json.userId,
            field: json.field,
            clinicAssigned: json.clinicAssigned,
            schedule: json.schedule,
            type: json.type,
            metaData: json.metaData
        };
    }

    static toJsonPartial(personnel: Partial<Personnel>): any {
        return {
            ...(personnel.id !== undefined && { id: personnel.id }),
            ...(personnel.userId !== undefined && { userId: personnel.userId }),
            ...(personnel.field !== undefined && { field: personnel.field }),
            ...(personnel.clinicAssigned !== undefined && { clinicAssigned: personnel.clinicAssigned }),
            ...(personnel.schedule !== undefined && { schedule: personnel.schedule }),
            ...(personnel.type !== undefined && { type: personnel.type }),
            ...(personnel.metaData !== undefined && { metaData: personnel.metaData })
        }
    }

    static toJson(personnel: Personnel): any {
        return {
            //id: personnel.id,
            userId: personnel.userId,
            field: personnel.field,
            clinicAssigned: personnel.clinicAssigned,
            schedule: personnel.schedule,
            type: personnel.type,
            metaData: personnel.metaData
        };
    }
}

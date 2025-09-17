import { Timestamp } from "@angular/fire/firestore";
import { MetaData } from "../shared-interfaces/meta-data";


export class MetaDataModel {

    static fromJson(json: any): MetaData {
        return {
            createdAt: json.createdAt,
            createdBy: json.createdBy,
            updatedAt: json.updatedAt,
            updatedBy: json.updatedBy
        };
    }

    static toJsonPartial(metaData: Partial<MetaData>): any {
        return {
            ...(metaData.createdAt !== undefined && { createdAt: metaData.createdAt }),
            ...(metaData.createdBy !== undefined && { createdBy: metaData.createdBy }),
            ...(metaData.updatedAt !== undefined && { updatedAt: metaData.updatedAt }),
            ...(metaData.updatedBy !== undefined && { updatedBy: metaData.updatedBy })
        }
    }

    static toJson(metaData: MetaData): any {
        return {
            createdAt: metaData.createdAt,
            createdBy: metaData.createdBy,
            updatedAt: metaData.updatedAt,
            updatedBy: metaData.updatedBy
        };
    }
}

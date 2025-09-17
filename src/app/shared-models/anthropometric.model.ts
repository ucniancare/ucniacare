import { Timestamp } from "@angular/fire/firestore";
import { Anthropometric } from "../shared-interfaces/anthropometric";


export class AnthropometricModel {

    static fromJson(json: any): Anthropometric {
        return {
            id: json.id,
            userId: json.userId,
            height: json.height,
            weight: json.weight,
            bmi: json.bmi,
            bmiCategory: json.bmiCategory,
            metaData: json.metaData
        };
    }

    static toJsonPartial(anthropometric: Partial<Anthropometric>): any {
        return {
            ...(anthropometric.id !== undefined && { id: anthropometric.id }),
            ...(anthropometric.userId !== undefined && { userId: anthropometric.userId }),
            ...(anthropometric.height !== undefined && { height: anthropometric.height }),
            ...(anthropometric.weight !== undefined && { weight: anthropometric.weight }),
            ...(anthropometric.bmi !== undefined && { bmi: anthropometric.bmi }),
            ...(anthropometric.bmiCategory !== undefined && { bmiCategory: anthropometric.bmiCategory }),
            ...(anthropometric.metaData !== undefined && { metaData: anthropometric.metaData })
        }
    }

    static toJson(anthropometric: Anthropometric): any {
        return {
            //id: anthropometric.id,
            userId: anthropometric.userId,
            height: anthropometric.height,
            weight: anthropometric.weight,
            bmi: anthropometric.bmi,
            bmiCategory: anthropometric.bmiCategory,
            metaData: anthropometric.metaData
        };
    }
}

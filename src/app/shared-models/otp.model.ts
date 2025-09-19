import { OTPTemplateForm } from "../shared-interfaces/otp";

export class OTPModel {

    static fromJson(json: any): OTPTemplateForm {
        return {
            email: json.email,
            otp: json.otp,
            validUntil: json.validUntil,
        };
    }

    static toJsonPartial(otp: Partial<OTPTemplateForm>): any {
        return {
            ...(otp.email !== undefined && { email: otp.email }),
            ...(otp.otp !== undefined && { otp: otp.otp }),
            ...(otp.validUntil !== undefined && { validUntil: otp.validUntil }),
        }
    }

    static toJson(otp: OTPTemplateForm): any {
        return {
            email: otp.email,
            otp: otp.otp,
            validUntil: otp.validUntil,
        };
    }
}

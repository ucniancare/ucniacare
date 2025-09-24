import { OTPTemplateForm } from "../shared-interfaces/email-template-form";

export class OTPUtil {

    public static generateOTP(email: string): OTPTemplateForm {

        const code: string = Math.floor(1000 + Math.random() * 9000).toString();
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 15 * 60 * 1000);
        
        const data: OTPTemplateForm = {
            email: email,
            otp: code,
            validUntil: expirationTime.toISOString() 
        }

        return data;

    }
}
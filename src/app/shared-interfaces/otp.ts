import { MetaData } from "./meta-data";

export class OTPTemplateForm {
    email?: string;
    otp?: string;
    validUntil?: string;
    [key: string]: unknown;
}
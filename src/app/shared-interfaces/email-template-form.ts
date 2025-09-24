import { MetaData } from "./meta-data";

export class OTPTemplateForm {
    email?: string;
    otp?: string;
    validUntil?: string;
    [key: string]: unknown;
}

export class AccountDetailsTemplateForm {
    email?: string;
    name?: string;
    ucIdNumber?: string;
    password?: string;
    [key: string]: unknown;
}


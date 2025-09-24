export class StringUtil {

    public static buildCompleteName(firstName: string, middleName?: string, lastName?: string, extName?: string): string {
        let completeName = firstName;
        if (middleName) completeName += ` ${middleName}`;
        if (lastName) completeName += ` ${lastName}`;
        if (extName) completeName += ` ${extName}`;
        return completeName;
    }

}

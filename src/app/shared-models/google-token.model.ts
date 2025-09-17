import { GoogleToken } from "../shared-interfaces/google-token";


export class GoogleTokenModel {

    static fromJson(json: any): GoogleToken {
        return {
            id: json.id,
            accessToken: json.accessToken,
            metaData: json.metaData
        };
    }

    static toJsonPartial(googleToken: Partial<GoogleToken>): any {
        return {
            ...(googleToken.id !== undefined && { id: googleToken.id }),
            ...(googleToken.accessToken !== undefined && { accessToken: googleToken.accessToken }),
            ...(googleToken.metaData !== undefined && { metaData: googleToken.metaData })
        }
    }

    static toJson(googleToken: GoogleToken): any {
        return {
            //id: googleToken.id,
            accessToken: googleToken.accessToken,
            metaData: googleToken.metaData
        };
    }
}

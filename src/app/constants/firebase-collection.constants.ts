export const COLLECTION = {
    USERACCOUNTS: {
        COLLECTIONNAME: 'userAccounts',
        FIELDS: {
            UCIDNUMBER: 'ucIdNumber',
            PASSWORD: 'password',
            ISLOGGEDIN: 'isLoggedIn',
            LASTLOGIN: 'lastLogin',
        },
    },
    USERS: {
        COLLECTIONNAME: 'users',
        FIELDS: {
            USERACCOUNTID: 'userAccountId',
            FIRSTNAME: 'firstName',
            LASTNAME: 'lastName',
            EMAIL: 'email',
        },
    },
    GOOGLE_TOKEN: {
        COLLECTIONNAME: 'googleToken',
        FIELDS: {
            ACCESS_TOKEN: 'accessToken',
        },
    },
    OTPS: {
        COLLECTIONNAME: 'otps',
        FIELDS: {
            EMAIL: 'email',
            OTP: 'otp',
            TIME: 'time',
        },
    },
}
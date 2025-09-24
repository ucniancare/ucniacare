export const COLLECTION = {
    USERACCOUNTS: {
        COLLECTIONNAME: 'userAccounts',
        FIELDS: {
            UCIDNUMBER: 'ucIdNumber',
            PASSWORD: 'password',
            ISLOGGEDIN: 'isLoggedIn',
            LASTLOGIN: 'lastLogin',
            ISFIRSTLOGIN: 'isFirstLogin',
        },
    },
    USERS: {
        COLLECTIONNAME: 'users',
        FIELDS: {
            USERACCOUNTID: 'userAccountId',
            FIRSTNAME: 'firstName',
            MIDDLENAME: 'middleName',
            LASTNAME: 'lastName',
            EXTNAME: 'extName',
            SEX: 'sex',
            EMAIL: 'email',
            PHONENUMBER: 'phoneNumber',
            DATEOFBIRTH: 'dateOfBirth',
            MARITALSTATUS: 'maritalStatus',
            USERROLES: 'userRoles',
            PROFILEPICTURE: 'profilePicture',
            METADATA: 'metaData',
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
    APPOINTMENTS: {
        COLLECTIONNAME: 'appointments',
        FIELDS: {
            TYPE: 'type',
            DATE: 'date',
            FROM: 'from',
            TO: 'to',
        },
    },
}
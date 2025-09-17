export const COLLECTION = {
    USERACCOUNTS: {
        COLLECTIONNAME: 'userAccounts',
        FIELDS: {
            UCIDNUMBER: 'ucIdNumber',
            PASSWORD: 'password',
        },
    },
    USERS: {
        COLLECTIONNAME: 'users',
        FIELDS: {
            USERACCOUNTID: 'userAccountId',
            FIRSTNAME: 'firstName',
            LASTNAME: 'lastName',
        },
    },
    GOOGLE_TOKEN: {
        COLLECTIONNAME: 'googleToken',
        FIELDS: {
            ACCESS_TOKEN: 'accessToken',
        },
    },
}
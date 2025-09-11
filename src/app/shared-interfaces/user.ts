export interface User {
    id?: string;      // Firestore doc ID
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

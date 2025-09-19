import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { COLLECTION } from '../constants/firebase-collection.constants';
import { UserAccount } from '../shared-interfaces/user-account';
import { MessageService } from 'primeng/api';
import { UserService } from './user.service';
import { APPCONSTS } from '../constants/data.constants';
import { DataSecurityService } from './data-security.service';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})

export class FirebaseService {

    constructor(
        private firestore: Firestore,
        private messageService: MessageService,
        private userService: UserService,
        private dataSecurityService: DataSecurityService,
        private storage: Storage
    ) {

    }

    /**
     * Adds a new document to a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @param data - The data object to add to the collection
     * @param toJson - Optional function to transform data before saving to Firestore
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of the added data with id
     */
    public addData$<T extends object>(collectionName: string, data: T, toJson?: (data: T) => any, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string; }> {
        const ref = collection(this.firestore, collectionName);

        return from(
            addDoc(ref, {
                ...(toJson ? toJson(data) : data),
            })
        ).pipe(
            map(docRef => {
                const raw = { id: docRef.id, ...data, };
                const mapped = fromJson ? fromJson(raw, docRef.id) : raw;
                return mapped as T & { id: string; };
            })
        );
    }

    /**
     * Retrieves all documents from a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of an array of documents with id
     */
    public getAllData$<T extends object>(collectionName: string, fromJson?: (json: any, id?: string) => T): Observable<(T & { id: string; })[]> {
        const ref = collection(this.firestore, collectionName);

        return collectionData(ref, { idField: 'id' }).pipe(
            map(docs =>
                docs.map(doc => {
                    const mapped = fromJson ? fromJson(doc, (doc as any).id) : doc;
                    return mapped as T & { id: string; };
                })
            )
        );
    }

    /**
     * Updates an existing document in a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @param id - The ID of the document to update
     * @param data - The partial data object containing fields to update
     * @param toJson - Optional function to transform data before saving to Firestore
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of the updated data with id
     */
    public updateData$<T extends object>(collectionName: string, id: string, data: Partial<T>, toJson?: (data: Partial<T>) => any, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string; }> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);
        const updatedData = {
            ...(toJson ? toJson(data) : data),
            "metaData.updatedAt": serverTimestamp(),
            "metaData.updatedBy": this.userService.getCurrentUserAccount()?.id || APPCONSTS.SYSTEM,
        };

        return from(updateDoc(docRef, updatedData)).pipe(
            switchMap(() => from(getDoc(docRef))),
            map(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error(`Document with id ${id} not found after update`);
                }
                const raw = { id: snapshot.id, ...snapshot.data() } as any;
                const mapped = fromJson ? fromJson(raw, snapshot.id) : raw;
                return mapped as T & { id: string };
            })
        );
    }

    /**
     * Retrieves a specific document from a Firestore collection by ID
     * @param collectionName - The name of the Firestore collection
     * @param id - The ID of the document to retrieve
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of the document data with id field
     */
    public getData$<T extends object>(collectionName: string, id: string, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string }> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);

        return from(getDoc(docRef)).pipe(
            map(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error(`Document with id ${id} not found`);
                }
                const raw = { id: snapshot.id, ...snapshot.data() } as any;
                const mapped = fromJson ? fromJson(raw, snapshot.id) : raw;
                return mapped as T & { id: string };
            })
        );
    }

    /**
     * Retrieves documents from a Firestore collection by a field (e.g., userAccountId)
     * @param collectionName - The name of the Firestore collection
     * @param field - The field name to filter by
     * @param value - The value to match in the field
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of an array of document data with id field
     */
    public getDataByField$<T extends object>(collectionName: string, field: string, value: any, fromJson?: (json: any, id?: string) => T): Observable<(T & { id: string })[]> {
        const q = query(
            collection(this.firestore, collectionName),
            where(field, '==', value)
        );

        return from(getDocs(q)).pipe(
            map(snapshot => {
                if (snapshot.empty) {
                    throw new Error(`No documents found where ${field} == ${value}`);
                }
                return snapshot.docs.map(docSnap => {
                    const raw = { id: docSnap.id, ...docSnap.data() } as any;
                    return fromJson ? fromJson(raw, docSnap.id) : raw;
                }) as (T & { id: string })[];
            })
        );
    }


    /**
     * Deletes a specific document from a Firestore collection by ID
     * @param collectionName - The name of the Firestore collection
     * @param id - The ID of the document to delete
     * @returns Observable that completes when the document is deleted
     */
    public deleteData$(collectionName: string, id: string): Observable<void> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);

        return from(deleteDoc(docRef));
    }

    /**
   * Deletes documents from a Firestore collection where a field matches a value
   * @param collectionName - The name of the Firestore collection
   * @param field - The field to filter by
   * @param value - The value that the field should match
   * @returns Observable that completes when all matching documents are deleted
   */
    public deleteDataByField$(collectionName: string, field: string, value: any): Observable<void> {
        const colRef = collection(this.firestore, collectionName);
        const q = query(colRef, where(field, "==", value));

        return from(
            getDocs(q).then(snapshot => {
                const deletePromises: Promise<void>[] = [];
                snapshot.forEach(docSnap => {
                    deletePromises.push(deleteDoc(docSnap.ref));
                });
                return Promise.all(deletePromises).then(() => void 0);
            })
        );
    }

    /**
     * Deletes all documents from a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @returns Observable that completes when the collection is deleted
     */
    public deleteCollection$(collectionName: string): Observable<void> {
        const colRef = collection(this.firestore, collectionName);

        return from(getDocs(colRef)).pipe(
            switchMap(snapshot => {
                if (snapshot.empty) {
                    return of(void 0);
                }

                const deleteObservables = snapshot.docs.map(d => from(deleteDoc(doc(this.firestore, `${collectionName}/${d.id}`))));
                return from(Promise.all(deleteObservables)).pipe(map(() => void 0));
            })
        );
    }

    public uploadUserProfilePicture$(userId: string, file: File) {
        const path = `profilePictures/${userId}_${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, path);

        return from(uploadBytes(storageRef, file)).pipe(
            switchMap(snap => from(getDownloadURL(snap.ref))),
            switchMap(url => {
                const userRef = doc(this.firestore, `users/${userId}`);
                return from(updateDoc(userRef, { profilePicture: url })).pipe(
                    // return the URL after updating Firestore
                    switchMap(() => from([url]))
                );
            })
        );
    }

    public authenticateUser$(ucIdNumber: string, password: string): Observable<UserAccount | null> {
        const usersRef = collection(this.firestore, COLLECTION.USERACCOUNTS.COLLECTIONNAME);
        const q = query(usersRef, where('ucIdNumber', '==', ucIdNumber));

        return from(getDocs(q)).pipe(
            map(snapshot => {
                if (snapshot.empty) {
                    return null;
                }

                const doc = snapshot.docs[0];
                const user = { id: doc.id, ...doc.data() } as UserAccount;
                const decrypted = this.dataSecurityService.decryptData(user.password!);
                if (decrypted === password) {
                    return user;
                }

                return null;
            }),
            catchError(err => {
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
                return of(null);
            })
        );
    }




}

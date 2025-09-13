import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FirebaseService {

    constructor(private firestore: Firestore) {

    }

    /**
     * Adds a new document to a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @param data - The data object to add to the collection
     * @param toJson - Optional function to transform data before saving to Firestore
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of the added data with id, createdAt, and updatedAt fields
     */
    public addData$<T extends object>(collectionName: string, data: T, toJson?: (data: T) => any, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string; createdAt: Date, updatedAt: Date }> {
        const ref = collection(this.firestore, collectionName);
        const createdAt = new Date();

        return from(
            addDoc(ref, {
                ...(toJson ? toJson(data) : data),
                createdAt
            })
        ).pipe(
            map(docRef => {
                const raw = { id: docRef.id, ...data, createdAt };
                const mapped = fromJson ? fromJson(raw, docRef.id) : raw;
                return mapped as T & { id: string; createdAt: Date, updatedAt: Date };
            })
        );
    }

    /**
     * Retrieves all documents from a Firestore collection
     * @param collectionName - The name of the Firestore collection
     * @param fromJson - Optional function to transform data after retrieving from Firestore
     * @returns Observable of an array of documents with id, createdAt, and updatedAt fields
     */
    public getAllData$<T extends object>(collectionName: string, fromJson?: (json: any, id?: string) => T): Observable<(T & { id: string; createdAt: Date, updatedAt: Date })[]> {
        const ref = collection(this.firestore, collectionName);

        return collectionData(ref, { idField: 'id' }).pipe(
            map(docs =>
                docs.map(doc => {
                    const mapped = fromJson ? fromJson(doc, (doc as any).id) : doc;
                    return mapped as T & { id: string; createdAt: Date, updatedAt: Date };
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
     * @returns Observable of the updated data with id and updatedAt fields
     */
    public updateData$<T extends object>(collectionName: string, id: string, data: Partial<T>, toJson?: (data: Partial<T>) => any, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string; updatedAt: Date }> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);
        const updatedAt = new Date();

        return from(
            updateDoc(docRef, {
                ...(toJson ? toJson(data) : data),
                updatedAt
            })
        ).pipe(
            switchMap(() => from(getDoc(docRef))),
            map(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error(`Document with id ${id} not found after update`);
                }
                const raw = { id: snapshot.id, ...snapshot.data() } as any;
                const mapped = fromJson ? fromJson(raw, snapshot.id) : raw;
                return mapped as T & { id: string; updatedAt: Date };
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
     * Deletes a specific document from a Firestore collection by ID
     * @param collectionName - The name of the Firestore collection
     * @param id - The ID of the document to delete
     * @returns Observable that completes when the document is deleted
     */
    public deleteData$(collectionName: string, id: string): Observable<void> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);

        return from(deleteDoc(docRef));
    }




}
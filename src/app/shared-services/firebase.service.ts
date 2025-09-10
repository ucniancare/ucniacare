import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: Firestore) {

    }

    public addData$<T extends object>(collectionName: string, data: T, toJson?: (data: T) => any, fromJson?: (json: any, id?: string) => T): Observable<T & { id: string; createdAt: Date }> {
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
                return mapped as T & { id: string; createdAt: Date };
            })
        );
    }

    public getAllData$<T extends object>(collectionName: string, fromJson?: (json: any, id?: string) => T): Observable<(T & { id: string; createdAt: Date })[]> {
        const ref = collection(this.firestore, collectionName);

        return collectionData(ref, { idField: 'id' }).pipe(
            map(docs =>
                docs.map(doc => {
                    const mapped = fromJson ? fromJson(doc, (doc as any).id) : doc;
                    return mapped as T & { id: string; createdAt: Date };
                })
            )
        );
    }

}
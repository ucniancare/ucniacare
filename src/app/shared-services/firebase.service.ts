import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: Firestore) {

    }

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

    public deleteData$(collectionName: string, id: string): Observable<void> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`);

        return from(deleteDoc(docRef));
    }




}
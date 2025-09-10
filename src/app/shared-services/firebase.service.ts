import { Injectable } from '@angular/core'; 
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private firestore: Firestore) {

    }

    async addItem(collectionName: string, data: any) {
        try {
          const ref = collection(this.firestore, collectionName);
          const docRef = await addDoc(ref, data);
          console.log('Document written with ID: ', docRef.id);
          return docRef.id;
        } catch (e) {
          console.error('Error adding document: ', e);
          throw e;
        }
    }
}
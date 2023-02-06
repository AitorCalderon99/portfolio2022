import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import WorkInterface from "../interfaces/work.interface";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private firestore: Firestore) { }

  addWork(work: WorkInterface){
    const workRef = collection(this.firestore, 'work');
    return addDoc(workRef, work);
  }
  getWorks(): Observable<WorkInterface[]>{
    const workRef = collection(this.firestore, 'work');
    return collectionData(workRef, {idField: 'id'}) as Observable<WorkInterface[]>;
  }
  deleteWork(work: WorkInterface){
    const docRef = doc(this.firestore, `work/${work.id}`)
    return deleteDoc(docRef);
  }
}

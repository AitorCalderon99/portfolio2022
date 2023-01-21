import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import WorkInterface from "../interfaces/work.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private firestore: Firestore) { }

  addWork(work: WorkInterface){
    const workRef = collection(this.firestore, 'work');
    return addDoc(workRef, work);
  }
}

/* Servicio para comunicarnos con firebase */

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  /********************* METODOS DE EJEMPLO (YA LOS BORRAREMOS) ************************/

  // Conseguimos las tareas
  getTareas() {
    return this.db.collection('tareas').get();
  }

  putTarea(tarea: any) {
    return this.db.collection('tareas').add(tarea);
  }
}

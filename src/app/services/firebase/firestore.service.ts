/* Servicio para comunicarnos con firebase */

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  /********************* METODOS DE EJEMPLO (YA LOS BORRAREMOS) ************************/

  // Crear un nuevo gato
  public createCat(data: { nombre: string, url: string }) {
    return this.db.collection('cats').add(data);
  }

  //Obtiene un gato
  public getCat(documentId: string) {
    return this.db.collection('cats').doc(documentId).snapshotChanges();
  }

  //Obtiene todos los gatos
  public getCats() {
    return this.db.collection('cats').snapshotChanges();
  }

  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.db.collection('cats').doc(documentId).set(data);
  }
}

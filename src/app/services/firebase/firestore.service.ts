/* Servicio para comunicarnos con firebase */

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/Servicio';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(private db: AngularFirestore) { }

    putServicio(servicio: Servicio, id: string) {
        return this.db.collection('servicios').doc(id).set(servicio);
    }

    /********************* METODOS DE EJEMPLO (YA LOS BORRAREMOS) ************************/

    // Conseguimos las tareas
    getTareas() {
        return this.db.collection('tareas', res => res.orderBy('fecha', 'asc')).get();
    }

    // Creamos una tarea nueva
    putTarea(tarea: any) {
        return this.db.collection('tareas').add(tarea);
    }

    // Actualizamos una tarea
    updateTarea(tarea: any) {
        return this.db.collection('tareas').doc(tarea.id).update({ tarea: tarea.tarea, fecha: Date.now() });
    }

    // Borramos una tarea
    deleteTarea(id: any) {
        return this.db.collection('tareas').doc(id).delete();
    }
}

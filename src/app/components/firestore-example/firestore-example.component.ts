/* Código de un CRUD simple para subir información a firestore */

import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../services/firebase/firestore.service';

@Component({
  selector: 'app-firestore-example',
  templateUrl: './firestore-example.component.html',
  styleUrls: ['./firestore-example.component.css']
})
export class FirestoreExampleComponent implements OnInit {

  // Variables para las tareas
  tarea: any = "";
  tareas: any[] = [];
  error: string = "";
  loading: boolean = false;
  modoEdicion: boolean = false;

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    // Conseguimos las tareas
    this.firestore.getTareas().subscribe(res => {
      res.docs.forEach((doc: any) => this.tareas.push({ id: doc.id, tarea: doc.data().tarea }));
    });
  }

  async submitTarea() {

    // Si no escribió nada lo regresamos
    if (!this.tarea.trim()) {
      this.error = 'Escriba algo por favor';
      return;
    }

    // Esta cargando
    this.loading = true;

    if (this.modoEdicion) {
      console.log('hola');
    } else {
      const nueva = await this.firestore.putTarea({ tarea: this.tarea }).then((res: any) =>
        ({ id: res.id, tarea: this.tarea })
      );
      this.tareas = [...this.tareas, nueva];
    }

    // Termino de subirse la nueva tarea, agregamos el nuevo archivo y permitimos que los
    // botones funcionen de nuevo
    this.loading = false;
    this.tarea = "";
    this.error = "";
  }

  /* const editarTareaForm {
    if (!this.tarea.trim()) {
      this.error = 'Escriba algo por favor';
      console.log('Elemento vacío');
      return;
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? { id: id, tarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea('');
    setError(null);
  }*/

  editarTarea(tarea: any) {

  }

  eliminarTarea(tarea: any) {

  }

}

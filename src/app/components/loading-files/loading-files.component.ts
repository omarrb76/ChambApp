/* Este componente se encarga de mostrar la barra de cargando
y del avance que lleva con cada uno de los archivos que recibió. Esto para
que el cliente obtenga un feedback de que es lo que esta pasando.
Se piensa reusar en varias secciones del proyecto */

import { StorageService } from './../../services/firebase/storage.service';
import { Archivo } from './../../models/Archivo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-files',
  templateUrl: './loading-files.component.html',
  styleUrls: ['./loading-files.component.css']
})
export class LoadingFilesComponent implements OnInit {

  // Los archivos nos los van a mandar desde un componente padre
  @Input() files: Archivo[] = [];

  constructor(private storageService: StorageService) {}
  
  ngOnInit(): void {
    this.subirArchivos();
  }

  // Método para la barrita de carga de la GUI
  getPorcentaje(archivo: Archivo) {
    return `width: ${archivo.porcentaje}%;`;
  }

  // Método para subir los archivos a firebase
  async subirArchivos() {

    // Vamos a esperar a que todo este código termine para continuar con lo demás
    await Promise.all(this.files.map(async (file) => {

      // Empezamos los trabajos de obtener referencia (link al archivo) y de subir el archivo
      let referencia = this.storageService.URLCloudStorage(file.archivo.name);
      let tarea = this.storageService.uploadCloudStorage(file.archivo.name, file.archivo);

      // Nos suscribimos a cambios en el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        console.log(`Tarea de ${file.archivo.name}: ${porcentaje}%`);
        file.porcentaje = porcentaje!;
      });

      // Cuando se acabe la tarea, vamos a obtener la URL
      await tarea.then(() => {
        console.log(`Tarea de ${file.archivo.name}... ¡¡¡LISTA!!!`)
        referencia.getDownloadURL().subscribe((URL) => {
          file.url = URL;
        });
      });

    }));

    // Termino de cargar
    this.storageService.setLoading(false);
  }

}

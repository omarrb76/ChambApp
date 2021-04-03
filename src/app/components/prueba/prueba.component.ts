import { Archivo } from './../../models/Archivo';
import { StorageService } from './../../services/firebase/storage.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  // Formulario con el que manejamos la subida de archivos
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  // Variables para el control de la vista con el formulario
  mensajeArchivo = 'No hay un archivo seleccionado';
  loading = false;

  // Múltiples archivos, en estos arreglos estarán los archivos y las referencias (links) a ellos
  archivos: Archivo[] = [];

  // Usamos el servicio de storage
  constructor(private storageService: StorageService) { }

  //Evento que se gatilla cuando el input de tipo archivo cambia
  cambioArchivo(event: any) {

    // Si el usuario eligió archivos
    if (event.target.files.length > 0) {

      this.mensajeArchivo = 'Archivo(s) preparado(s):';           // Ponemos un mensaje
      for (let i = 0; i < event.target.files.length; i++) {       // Recorremos cada uno de los archivos y lo agregamos a nuetsro arreglo
        this.mensajeArchivo += ' ' + event.target.files[i].name;
        this.archivos.push({                                      // Metemos el nuevo archivo en el arreglo
          archivo: event.target.files[i],
          url: "",
          porcentaje: 0
        });
      }

    } else {

      this.mensajeArchivo = 'No hay un archivo seleccionado';

    }

  }

  //Sube el archivo a Cloud Storage, tiene async a lo wey. Pero funciona
  async subirArchivo() {

    this.loading = true;

    // Vamos a esperar a que todo este código termine para continuar con lo demás
    await Promise.all(this.archivos.map(async (file) => {

      // Empezamos los trabajos de obtener referencia (link al archivo) y de subir el archivo
      let referencia = this.storageService.referenciaCloudStorage(file.archivo.name);
      let tarea = this.storageService.tareaCloudStorage(file.archivo.name, file.archivo);

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
        })
      });

    }));

    // Se termino de cargar, desaparece el spinner
    this.archivoForm.reset();
    this.loading = false;
  }

  getPorcentaje(archivo: Archivo) {
    return `width: ${archivo.porcentaje}%;`;
  }

}

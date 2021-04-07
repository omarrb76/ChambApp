/* Servicio para acceder al storage de firebase */

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Observable de que el sitio esta cargando, nos sirve porque vamos a estar 
  // subiendo archivos en varias partes del proyecto, entonces mejor reusamos código
  private loading$ = new Subject<boolean>();

  constructor(private storage: AngularFireStorage) { }

  // Conseguimos el observable para aquel componente que lo vaya a consumir
  getLoading$() : Observable<boolean> {
    return this.loading$.asObservable();
  }

  // Seteamos el nuevo valor para el sujeto
  setLoading(nuevo: boolean) {
    this.loading$.next(nuevo);
  }

  // Tarea para subir foto
  uploadCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  // Referencia del archivo
  URLCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/firebase/auth.service';
import { WindowService } from './../../services/window.service';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-createservice',
    templateUrl: './createservice.component.html',
    styleUrls: ['./createservice.component.css']
})
export class CreateserviceComponent implements OnInit {

    serviceForm: any = null!;   // Formulario de crear cuenta
    step: number = 1;           // El paso en el que vamos [0 => Nombre del servicio, descripción del servicio, tags | 1 => horario | 2 => fotos ]
    dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']; // Para elegir el horario (ngFor)

    // Variables para poner errores en el formulario
    nombreEditado: boolean = false;
    descripcionEditado: boolean = false;
    usernameEditado: boolean = false;
    telefonoEditado: boolean = false;
    codeEditado: boolean = false;

    constructor(
        private router: Router,
        private firestoreService: FirestoreService,	// No se porque, pero no funciona si le quitan este servicio
        private windowService: WindowService,
        private authService: AuthService
    ) {

        this.serviceForm = new FormGroup({
            nombre: new FormControl(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            descripcion: new FormControl(null, [
                Validators.required,
                Validators.minLength(20),
                Validators.maxLength(255)
            ]),
            dias: new FormControl(null, Validators.required),
            fecha: new FormControl(null, Validators.required),
            genero: new FormControl(null, Validators.required),
            username: new FormControl(null, [
                Validators.required,
                Validators.pattern('[a-zA-Z.0-9-_]+'),
                Validators.minLength(4),
                Validators.maxLength(15)
            ]),
            tipo: new FormControl(null, Validators.required),
            telefono: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')])
        });

    }

    // Si hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {

        this.authService.getUsuarioConectado().subscribe((user: any) => {
            //if (!user) { this.authService.navigate('home'); }
        });

    }

    // Navegamos al link indicado
    navigate(link: string) {
        this.router.navigate([link]);
    }

    // GETS
    get nombre() { return this.serviceForm.get('nombre'); }
    get descripcion() { return this.serviceForm.get('descripcion'); }

    // Función que se manda a llamar para ver si un campo fue editado
    keyUp(campo: string) {
        switch (campo) {
            case 'nombre': this.nombreEditado = true; break;
            case 'descripcion': this.descripcionEditado = true; break;
        }
    }

    // Mostramos diferentes campos del formulario con cada paso
    cambiarPaso(adelante: boolean) {

        // Sumamos o restamos el paso
        adelante ? this.step++ : this.step--;

    }

    // Get que nos permite desactivar los botones si los campos no son válidos
    get signUpFormDisabled() {
        switch (this.step) {
            case 0: return this.nombre.valid && this.descripcion.valid;
            case 1: return false;
            default: return false;
        }
    }

    // Para ponerlo en el horario
    primerLetra(palabra: string) {
        return palabra.charAt(0);
    }

    // Agregamos o removemos el dia al horario del ususario
    agregarRemoverDia(dia: string) {
        const checkbox = <HTMLInputElement>document.getElementById(dia);
        console.log(dia);
        console.log(checkbox.checked);
    }

    // Procesamos el formulario de servicio
    submitServiceForm() {

    }

}

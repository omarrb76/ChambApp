import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/firebase/auth.service';
import { WindowService } from './../../services/window.service';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from 'src/app/models/Horario';

@Component({
    selector: 'app-createservice',
    templateUrl: './createservice.component.html',
    styleUrls: ['./createservice.component.css']
})
export class CreateserviceComponent implements OnInit {

    serviceForm: any = null!;           // Formulario de crear cuenta
    step: number = 1;                   // El paso en el que vamos [0 => Nombre del servicio, descripción del servicio, tags | 1 => horario | 2 => fotos ]
    dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']; // Para elegir el horario (ngFor)
    diaSelected: string = "Domingo";    // Para mostrar el horario de cada dia

    // Variables para poner errores en el formulario
    nombreEditado: boolean = false;
    descripcionEditado: boolean = false;

    constructor(
        private router: Router,
        private firestoreService: FirestoreService,	// No se porque, pero no funciona si le quitan este servicio
        private windowService: WindowService,
        private authService: AuthService
    ) {

        let horario: Horario[] = [];

        this.dias.forEach((x: string) => {
            horario.push({
                dia: x,
                hora_inicio: '10:00',
                hora_termino: '17:00',
                activado: true,
                error: false
            })
        });

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
            horario: new FormControl([...horario], Validators.required)
        });

    }

    // Si hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {

        this.authService.getUsuarioConectado().subscribe((user: any) => {
            //if (!user) { this.authService.navigate('home'); }
        });

    }

    // Navegamos al link indicado
    navigate(link: string) { this.router.navigate([link]); }

    // GETS
    get nombre() { return this.serviceForm.get('nombre'); }
    get descripcion() { return this.serviceForm.get('descripcion'); }
    get days() { return this.serviceForm.get('horario'); }

    // Función que se manda a llamar para ver si un campo fue editado
    keyUp(campo: string) {
        switch (campo) {
            case 'nombre': this.nombreEditado = true; break;
            case 'descripcion': this.descripcionEditado = true; break;
        }
    }

    // Mostramos diferentes campos del formulario con cada paso
    cambiarPaso(adelante: boolean) { adelante ? this.step++ : this.step--; }

    // Get que nos permite desactivar los botones si los campos no son válidos
    get serviceFormDisabled() {
        switch (this.step) {
            case 0: return this.nombre.valid && this.descripcion.valid;
            case 1:
                let result = true;
                this.days.value.forEach((x: Horario) => {
                    if (x.error && x.activado) { result = false; return; }
                });
                const index = this.days.value.findIndex((x: Horario) => x.activado);
                if (index != -1) { return result; }
                else { return false; }
            default: return false;
        }
    }

    // Para ponerlo en el horario
    primerLetra(palabra: string) { return palabra.charAt(0); }

    // Agregamos o removemos el dia al horario del ususario
    agregarRemoverDia(dia: string) {

        const checkbox = <HTMLInputElement>document.getElementById(dia);
        const index = this.days.value.findIndex((x: Horario) => x.dia == dia);

        let horarioNuevo = this.days.value[index];
        this.days.value.splice(index, 1);

        if (checkbox.checked) { horarioNuevo.activado = true; this.diaSelected = dia; }
        else {
            if (dia == this.diaSelected) {

                const nuevoDia = this.days.value.findIndex((x: Horario) => x.activado);
                if (nuevoDia != -1) { this.diaSelected = this.days.value[nuevoDia].dia; }
                else { this.diaSelected = "Ninguno"; }

            }
            horarioNuevo.activado = false;
        }

        this.days.value.push(horarioNuevo);

    }

    // Procesamos el formulario de servicio
    submitServiceForm() {

    }

    checarHora(tiempo1: any, tiempo2: any) {

        const hora_inicio = tiempo1.value.split(":");
        const hora_termino = tiempo2.value.split(":");

        // La hora de inicio es menor a la hora de termino
        if (parseInt(hora_inicio[0]) < parseInt(hora_termino[0])) { return true; }
        // La hora de inicio es igual a la hora de termino, pero los minutos son menores
        else if (parseInt(hora_inicio[0]) == parseInt(hora_termino[0]) && parseInt(hora_inicio[1]) < parseInt(hora_termino[1])) { return true; }
        // Esta mal la hora
        else { return false; }

    }

    // Se manda a llamar cada ve que cambiamos la hora
    cambioHora(tiempo1: any, tiempo2: any) {

        // Encontramos el dia en el arreglo
        const index = this.days.value.findIndex((x: Horario) => x.dia == this.diaSelected);
        let horarioNuevo = this.days.value[index];
        this.days.value.splice(index, 1);

        // Actualizamos información
        horarioNuevo.hora_inicio = tiempo1.value;
        horarioNuevo.hora_termino = tiempo2.value;
        horarioNuevo.activado = true;

        // Si las horas sin válidas, actualizamos el error
        if (this.checarHora(tiempo1, tiempo2)) { horarioNuevo.error = false; }
        else { horarioNuevo.error = true; }

        this.days.value.push(horarioNuevo);

    }

    // Función que se manda a llamar para encontrar un día (usado en los horarios)
    encontrarDia(dia: string) {
        const index = this.days.value.findIndex((x: Horario) => x.dia == dia);
        return this.days.value[index];
    }

    mostrarErrores() {
        let respuesta = "";
        let primeraVez = true;
        this.days.value.forEach((x: Horario) => {
            if (x.error && x.activado) {
                if (primeraVez) {
                    primeraVez = false;
                    respuesta += "El horario de " + x.dia;
                } else {
                    respuesta += ", " + x.dia;
                }
                
            }
        });
        if (!primeraVez) { respuesta += " es erróneo" }
        return respuesta;
    }

}

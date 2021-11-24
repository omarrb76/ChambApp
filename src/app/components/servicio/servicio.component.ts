import { Cita } from './../../models/Cita';
import { Servicio } from './../../models/Servicio';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { AuthService } from './../../services/firebase/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-servicio',
    templateUrl: './servicio.component.html',
    styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

    loading: boolean = true;
    idServicio: string = "";
    servicio: Servicio = null!;
    existeServicio: boolean = false;
    servicePhoneNumber: string = "";
    userFirestore: any;
    calificacion: number = 4;
    calif: any;                     // Para hacer un ciclo en el HTML que ponga las estrellas
    calif_aux: any;                 // Completar las estrellas huecas
    user: any;
    citaForm: any = null!;
    minDate: string = this.getDate();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private firestoreService: FirestoreService
    ) {
        this.citaForm = new FormGroup({
            fecha: new FormControl(null, Validators.required)

        });
    }

    // Si no hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {
        this.authService.getUsuarioConectado().subscribe((user: any) => {
            // Si no hay usuario logeado lo regresamos a inicio
            if (!user) {
                this.authService.navigate('home');
            }
            //Obtenemos el nombre del usuario para la cita
            this.user = user;
            //console.log(this.user);

            // Obtenemos la información del servicio
            this.activatedRoute.params.subscribe(async (params: any) => {
                // El identificador es el nombre de usuario dentro del servicio
                this.idServicio = params.id;
                // Como es un query nos devuleve un array, es probable que cambie eso
                await this.firestoreService.getServicios(this.idServicio).then((servicios: any) => {
                    servicios.forEach((doc: any) => {
                        this.servicio = doc.data();
                        this.servicePhoneNumber = doc.id;
                    })
                });
                // Si no existe el servicio, lo mostraremos en pantalla
                if (!this.servicio) { this.existeServicio = false; }
                else {
                    this.existeServicio = true;
                    // Obtenemos la información del usuario
                    await this.firestoreService.getUser(this.servicePhoneNumber).then((res: any) => this.userFirestore = res.data());
                    // Califiación del servicio
                    this.calif = Array(this.calificacion).fill(0).map((x, i) => i);
                    this.calif_aux = Array(5 - this.calificacion).fill(0).map((x, i) => i);
                }
                //console.log(this.servicio);
                // Dejamos de cargar
                this.loading = false;
            });
        });
    }

    navigate(link: string) { this.router.navigate([link]); }

    get fecha() { return this.citaForm.get('fecha'); }

    agendarServicio() {
        if (!this.fecha.value) {
            alert("Selecciona una fecha, por favor")
        }
        else {
            const cita: Cita = {
                numUsuario: this.user.phoneNumber,
                fechaDeContratacion: this.getDate(),
                fechaAContratar: this.fecha.value,
                nombreServicio: this.servicio.nombre,
                usernamePrestador: this.userFirestore.username
            };
            this.firestoreService.putCita(cita)
                .then(res => alert("¡Cita Agendada!"))
                .catch(err => alert("Error al generar cita"));

        }
    }

    getDate() {
        let dateTime = new Date();
        let currentDate: string = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getUTCDate();
        return currentDate;
    }
}

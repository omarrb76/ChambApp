import { AuthService } from './../../services/firebase/auth.service';
import { WindowService } from './../../services/window.service';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Coahuila', 'Colima', 'Ciudad de México / Distrito Federal', 'Durango', 'Estado de México',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León',
    'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
    'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
]

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    windowRef: any;             // Referencia de la ventana (necesaria para que funcione el reCapctha)
    signUpForm: any = null!;    // Formulario de crear cuenta
    codeForm: any = null!;      // Formulario para colocar SMS del teléfono
    estados = estados;          // Los estados de México
    step: number = 0;           // El paso en el que vamos [0 => nombre, apellido, estado | 1 => fecha de nacimiento, genero, nombre de usuario, tipo de usuario | 2 => telefono | 3 => confirmar telefono ]
    error: string = "";         // Mostramos un mensaje de error si se equivoco en el código de SMS

    // Variables para poner errores en el formulario
    nombreEditado: boolean = false;
    apellidoEditado: boolean = false;
    usernameEditado: boolean = false;
    telefonoEditado: boolean = false;
    codeEditado: boolean = false;

    constructor(
        private router: Router,
        private firestoreService: FirestoreService,	// No se porque, pero no funciona si le quitan este servicio
        private windowService: WindowService,
        private authService: AuthService
    ) {

        this.signUpForm = new FormGroup({
            nombre: new FormControl(null, [
                Validators.required,
                Validators.pattern('[a-zA-Z .]+'),
                Validators.minLength(2),
                Validators.maxLength(25)
            ]),
            apellido: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z .]+')]),
            estado: new FormControl(null, Validators.required),
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

        this.codeForm = new FormGroup({
            code: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{6}')])
        });

    }

    // Si hay un usuario activo, no deberia de estar en esta página
    ngOnInit(): void {
        this.authService.getUsuarioConectado().subscribe((user: any) => {
            if (user) { this.authService.navigate('home'); }
        });
    }

    // Navegamos al link indicado
    navigate(link: string) {
        this.router.navigate([link]);
    }

    // Es llamado cuando se envía el formulario completo
    submitSignUpForm() {

        // Lo único que no puedo verificar antes de envíar el formulario es el teléfono, pero eso se arregla con el if de abajo
        if (this.signUpForm.valid) {

            const appVerifier = this.windowRef.recaptchaVerifier;
            const num = '+52' + this.telefono.value;

            this.authService.signInWithPhoneNumber(num, appVerifier)
                .then(result => {
                    this.windowRef.confirmationResult = result;
                    this.step++;
                })
                .catch(error => console.log(error));

        } else { this.telefonoEditado = true; }

    }

    // Es llamado para enviar el código de SMS
    submitCodeForm() {

        if (this.codeForm.valid) {
            this.windowRef.confirmationResult
                .confirm(this.code.value)
                .then((result: any) => {
                    this.navigate('home');
                    console.log('Inicio sesion correctamente');
                })
                .catch((error: any) => {
                    if (error.code == 'auth/invalid-verification-code') {
                        this.error = "El código ingresado es incorrecto.";
                    }
                    console.log(error, 'Incorrect code entered')
                });
        }

    }

    // Función que se manda a llamar para ver si un campo fue editado
    keyUp(campo: string) {
        switch (campo) {
            case 'nombre': this.nombreEditado = true; break;
            case 'apellido': this.apellidoEditado = true; break;
            case 'username': this.usernameEditado = true; break;
            case 'telefono': this.telefonoEditado = true; break;
            case 'code': this.codeEditado = true; break;
        }
    }

    // GETS
    get nombre() { return this.signUpForm.get('nombre'); }
    get apellido() { return this.signUpForm.get('apellido'); }
    get estado() { return this.signUpForm.get('estado'); }
    get fecha() { return this.signUpForm.get('fecha'); }
    get genero() { return this.signUpForm.get('genero'); }
    get username() { return this.signUpForm.get('username'); }
    get tipo() { return this.signUpForm.get('tipo'); }
    get telefono() { return this.signUpForm.get('telefono'); }
    get code() { return this.codeForm.get('code'); }

    // Get que nos permite desactivar los botones si los campos no son válidos
    get signUpFormDisabled() {
        switch (this.step) {
            case 0: return this.nombre.valid && this.apellido.valid && this.estado.valid;
            case 1: return this.fecha.valid && this.genero.valid && this.username.valid && this.tipo.valid;
            case 2: return false;
            case 3: return this.code.valid;
            default: return false;
        }
    }

    // Mostramos diferentes campos del formulario con cada paso
    cambiarPaso(adelante: boolean) {

        // Sumamos o restamos el paso
        adelante ? this.step++ : this.step--;

        // Esta en el paso de llenar el número de teléfono
        if (this.step == 2) {
            setTimeout(() => {
                // Obtenemos la referencia de la ventana y dibujamos el reCaptcha
                this.windowRef = this.windowService.getWindowRef();
                this.windowRef.recaptchaVerifier = this.authService.recaptchaVerifier();
                this.windowRef.recaptchaVerifier.render();
            }, 0);
        }

    }

}
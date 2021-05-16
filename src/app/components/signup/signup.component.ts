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

  signUpForm: any = null!; // Formulario de crear cuenta
  editado: boolean = false; // Variable que se activa una vez que el usuario ingresa información (no queremos mostrar mensaje de error si el usuario no ha ingresado nada)
  estados = estados; // Los estados de México
  step: number = 0; // El paso en el que vamos [0 => nombre, apellido, estado | 1 => fecha de nacimiento, genero, nombre de usuario, tipo de usuario | 2 => telefono, confirmar telefono ]

  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z .]+')]),
      apellido: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z .]+')]),
      number: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      fecha: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  submitForm() {
    console.log('Fomrulario enviado');
  }

  keyUp() {
    this.editado = true;
    console.log(this.signUpForm.value.nombre)
  }

  get nombre() { return this.signUpForm.get('nombre'); }
  get apellido() { return this.signUpForm.get('apellido'); }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: any = null!; // Formulario de crear cuenta
  editado: boolean = false; // Variable que se activa una vez que el usuario ingresa información (no queremos mostrar mensaje de error si el usuario no ha ingresado nada)

  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z .]+')]),
      apellido: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z .]+')]),
      number: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
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

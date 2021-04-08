/* Servicio para la autenticacion de firebase */

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
    this.auth.useDeviceLanguage(); // Ajusta el lenguaje para que cada persona lo vea segun su idioma
  }

  public recaptchaVerifier() {
    const boton = <HTMLInputElement> document.getElementById("send-sms-number");
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal', // normal
      'callback': (response: any) => {
        boton.disabled = false;
      },
      'expired-callback': () => {
        boton.disabled = true;
      }
    });
  }

  signInWithPhoneNumber(num: string, appVerifier: any) {
    return this.auth.signInWithPhoneNumber(num, appVerifier);
  }
}

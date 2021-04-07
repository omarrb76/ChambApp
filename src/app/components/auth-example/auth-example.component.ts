/* Ejemplo para iniciar sesión con número de teléfono */

import { AuthService } from './../../services/firebase/auth.service';
import { PhoneNumber } from './../../models/PhoneNumber';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { WindowService } from './../../services/window.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-example',
  templateUrl: './auth-example.component.html',
  styleUrls: ['./auth-example.component.css']
})
export class AuthExampleComponent implements OnInit {

  public cats: any;

  windowRef: any;                   // Referencia de la ventana (necesaria para que funcione el reCapctha)
  phoneNumber = new PhoneNumber();  // Número de teléfono (propenso a ser borrado)
  verificationCode: string = "";    // Código de verificación
  user: any;                        // El usuario que inicio sesión

  constructor(
    private firestoreService: FirestoreService,
    private windowService: WindowService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    /* this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    }); */

    // Obtenemos la referencia de la ventana y dibujamos el reCaptcha
    this.windowRef = this.windowService.getWindowRef();
    this.windowRef.recaptchaVerifier = this.authService.recaptchaVerifier();
    this.windowRef.recaptchaVerifier.render();

  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    this.authService.signInWithPhoneNumber(num, appVerifier)
    .then(result => {
      this.windowRef.confirmationResult = result;
    })
    .catch(error => console.log(error));

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then((result: any) => {
      this.user = result.user;
    })
    .catch((error: any) => console.log(error, 'Incorrect code entered'));
  }

}

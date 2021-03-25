import { AuthService } from './../../services/firebase/auth.service';
import { PhoneNumber } from './../../models/PhoneNumber';
import { FirestoreService } from './../../services/firebase/firestore.service';
import { WindowService } from './../../services/window.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  public cats: any;

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string = "";
  user: any;

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
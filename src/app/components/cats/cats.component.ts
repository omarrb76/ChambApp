import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  public cats: any;
  phoneNumber: any;
  otp: any;
  windowRef: any;

  constructor(private firestoreService: FirestoreService) {
    this.windowRef = firestoreService.getWindowRef();
  }

  ngOnInit() {

    this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });

    this.windowRef.recaptchaVerifier = null;
    console.log(this.firestoreService.recaptchaVerifier());
    
  }
}
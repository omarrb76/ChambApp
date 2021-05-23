// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios de NPM
import { NgxImageCompressService } from 'ngx-image-compress';

// Angular Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Componentes
import { AppComponent } from './app.component';
import { LoadingFilesComponent } from './components/loading-files/loading-files.component';
import { FirestoreExampleComponent } from './components/firestore-example/firestore-example.component';
import { AuthExampleComponent } from './components/auth-example/auth-example.component';
import { UploadFilesExampleComponent } from './components/upload-files-example/upload-files-example.component';
import { MenuExampleComponent } from './components/menu-example/menu-example.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './components/faq/faq.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CreateserviceComponent } from './components/createservice/createservice.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { SearchComponent } from './components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingFilesComponent,
    FirestoreExampleComponent,
    AuthExampleComponent,
    UploadFilesExampleComponent,
    MenuExampleComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FaqComponent,
    SignupComponent,
    LoginComponent,
    CreateserviceComponent,
    LoggedinComponent,
    SearchComponent,
    UserProfileComponent,
    ServicioComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CreateserviceComponent } from './components/createservice/createservice.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFilesExampleComponent } from './components/upload-files-example/upload-files-example.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirestoreExampleComponent } from './components/firestore-example/firestore-example.component';
import { AuthExampleComponent } from './components/auth-example/auth-example.component';
import { LoggedinComponent } from "./components/loggedin/loggedin.component";
import { SearchComponent } from "./components/search/search.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ServicioComponent } from "./components/servicio/servicio.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-service', component: CreateserviceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'upload-files', component: UploadFilesExampleComponent },
  { path: 'firestore', component: FirestoreExampleComponent },
  { path: 'auth', component: AuthExampleComponent },
  { path: 'loggedin', component: LoggedinComponent },
  { path: 'search', component: SearchComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'servicio', component: ServicioComponent },
  { path: 'edit-client', component: EditClientComponent },  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

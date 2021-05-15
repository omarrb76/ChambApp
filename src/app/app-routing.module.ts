import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { UploadFilesExampleComponent } from './components/upload-files-example/upload-files-example.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirestoreExampleComponent } from './components/firestore-example/firestore-example.component';
import { AuthExampleComponent } from './components/auth-example/auth-example.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'upload-files', component: UploadFilesExampleComponent },
  { path: 'firestore', component: FirestoreExampleComponent },
  { path: 'auth', component: AuthExampleComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

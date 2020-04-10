import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyLayoutComponent } from './emergency-layout/emergency-layout.component';
import { CoronaLoginComponent } from './corona-login/corona-login.component';
import { AnalyseDetailsComponent } from './analyse-details/analyse-details.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CoronaQuizComponent } from './corona-quiz/corona-quiz.component';
import { LoggedService } from './_guard/logged.service';
import { MedecinService } from './_guard/medecin.service';


const routes: Routes = [
  { path: 'superdashboard', canActivate: [LoggedService, MedecinService], component: DoctorsListComponent},
  { path: 'analyse', canActivate: [LoggedService], component: PatientsListComponent},
  { path: 'medecin-analyse/:id', canActivate: [LoggedService, MedecinService], component: PatientsListComponent},
  { path: 'login', component: CoronaLoginComponent},
  { path: 'login/:medecin', component: CoronaLoginComponent},
  { path: 'quiz', canActivate: [LoggedService], component: CoronaQuizComponent},
  { path: 'emergency', component: EmergencyLayoutComponent},
  { path: '',redirectTo:'/analyse', pathMatch: 'full'},
  { path: 'analyse-details', canActivate: [LoggedService], component: AnalyseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

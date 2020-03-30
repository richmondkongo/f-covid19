import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashComponent } from './doctor-dash/doctor-dash.component';
import { QuizLayoutComponent } from './quiz-layout/quiz-layout.component';
import { EmergencyLayoutComponent } from './emergency-layout/emergency-layout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoronaLoginComponent } from './corona-login/corona-login.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { AnalyseDetailsComponent } from './analyse-details/analyse-details.component';
import { TesteurComponent } from './testeur/testeur.component';


const routes: Routes = [
  { path: 'superdashboard', component: DoctorDashComponent},
  { path: 'dashboard', component: UserDashComponent},
  { path: 'login', component: CoronaLoginComponent},
  { path: 'quiz',component: QuizLayoutComponent}, 
  { path: 'account',component: ProfilePageComponent},
  { path: 'emergency',component: EmergencyLayoutComponent},
  { path: '',redirectTo:'/login', pathMatch: 'full'},
  { path: 'accueil',redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'logout',redirectTo:'/login/false', pathMatch: 'full'},
  { path: 'analyse-details',component: AnalyseDetailsComponent},
  { path: 't', component: TesteurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

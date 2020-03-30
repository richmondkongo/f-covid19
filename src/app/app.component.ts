import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'AntiCorona';
  logged=false;
  menuListe=[{'route':'/accueil' ,'icon':'dashboard', 'title':'Accueil'},{'route':'/quiz' ,'icon':'speaker_notes', 'title':'Questionnaire', 'color':'blue'},{'route':'/account' ,'icon':'account_circle', 'title':'Mon compte', 'color':'red'}, {'route':'/emergency' ,'icon':'warning', 'title':'Urgence', 'color':'gray'},{'route':'/chat' ,'icon':'question_answer', 'title':'Chat', 'color':'gray'},{'route':'/about' ,'icon':'help_outline', 'title':'A propos', 'color':'gray'}, {'route':'/logout' ,'icon':'exit_to_app', 'title':'Se déconnecter', 'color':'black'}]
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.checkAuthStatus();      
    }, 5000);
  }
  
  checkAuthStatus(){
    this.logged = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.logged = true;
        //this.logged = this.authService.isAuth;
      }
    );
  }

  login(){
    this.logged= !this.logged;
    this.router.navigateByUrl('accueil');
  }

  onSignOut() {
    this.authService.signOut();
    this.logged = false;
    //this.logged = this.authService.isAuth;
  }

}

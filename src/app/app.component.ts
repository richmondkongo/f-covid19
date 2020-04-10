import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GService } from './global.service';
import { TypeUserService } from './_services/type-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'AntiCorona';
  typecompared: string = null;
  menu: {
    icon: string,
    link: string,
    title: string
  }[] = [];
  token: any = null;
  menuListe = [{ 'route': '/accueil', 'icon': 'dashboard', 'title': 'Accueil' }, { 'route': '/quiz', 'icon': 'speaker_notes', 'title': 'Questionnaire', 'color': 'blue' }, { 'route': '/account', 'icon': 'account_circle', 'title': 'Mon compte', 'color': 'red' }, { 'route': '/emergency', 'icon': 'warning', 'title': 'Urgence', 'color': 'gray' }, { 'route': '/chat', 'icon': 'question_answer', 'title': 'Chat', 'color': 'gray' }, { 'route': '/about', 'icon': 'help_outline', 'title': 'A propos', 'color': 'gray' }, { 'route': '/logout', 'icon': 'exit_to_app', 'title': 'Se déconnecter', 'color': 'black' }]
  constructor(
    private router: Router,
    private GServ: GService,
    private typeUserServ: TypeUserService,
  ) {
    this.getTypeUser();
  }

  ngOnInit() {
    setInterval(() => {
      if (this.GServ.decrypt(this.GServ.getCookie('token')).length > 0) {
        this.token = JSON.parse(this.GServ.decrypt(this.GServ.getCookie('token')));
        if (this.token && this.token != null && this.token.user && this.token.profil) {
          this.menu = [{
            icon: 'format_color_fill',
            link: '/analyse',
            title: 'Mes analyses'
          }, {
            icon: 'border_color',
            link: '/quiz',
            title: 'Questionnaire'
          }]
          if (this.token.profil.type_user == this.typecompared) {
            this.menu.unshift({
              icon: 'dashboard',
              link: '/superdashboard',
              title: 'Liste des analyses à valider'
            })
          }
        }
      }
    }, 1000);
  }

  onSignOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.GServ.removeCookie();
    this.token = null;
    this.router.navigateByUrl('/login');
  }

  getTypeUser() {
    if (!sessionStorage.type_medecin) {
      this.typeUserServ.read().then(
        (r_typeuser: any) => {
          let r = r_typeuser.results;
          for (let i = 0; i < r.length; i++) {
            const elt = r[i];
            if (this.GServ.no_accent('Corps-médicale') == this.GServ.no_accent(elt.libelle)) {
              this.typecompared = elt.id;
              sessionStorage.type_medecin = this.GServ.encrypt(elt.id);
              i = r.length + 1;
              // console.log(elt);
            } else {
              this.typecompared = null;
            }
          }
        }, (e_typeuser) => {
          console.log(e_typeuser)
        }
      )
    } else {
      this.typecompared = this.GServ.decrypt(sessionStorage.type_medecin);
    }
  }
}

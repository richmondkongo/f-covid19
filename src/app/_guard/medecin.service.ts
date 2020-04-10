import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { GService } from '../global.service';
import { TypeUserService } from '../_services/type-user.service';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  token: any = null;
  typecompared: string = null;

  constructor(
    private GServ: GService,
    private router: Router,
    private typeUserServ: TypeUserService,
  ) {
    this.getTypeUser();
  }

  canActivate(router: ActivatedRouteSnapshot) {
    this.token = JSON.parse(this.GServ.decrypt(this.GServ.getCookie('token')));
    // console.log('user', this.token);
    if (this.token && this.token != null && this.token.user && this.token.profil && this.token.profil.type_user == this.typecompared) {
      return true;
    } else if (this.typecompared == null) {
      setTimeout(() => {
        this.router.navigate(['/superdashboard']);
      }, 1000);
    } else {
      this.router.navigate(['/analyse']);
      alert('Vous n\'êtes pas autorisés à accéder à cette page!');
      return false;
    }
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

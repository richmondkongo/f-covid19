import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { GService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class CitoyenService {

  token: any = null;

  constructor(
    private GServ: GService,
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = this.GServ.decrypt(this.GServ.getCookie('token'));
    console.log(JSON.parse(this.token));
    if (this.token && this.token != null && JSON.parse(this.token).user && JSON.parse(this.token).profil) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    alert('Veuillez-vous connecter afin d\'accéder à cette page!');
    return false;
  }
}

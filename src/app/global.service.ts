import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GService {
  private API_URL = 'http://127.0.0.1:8000/coronaApp/';

  link: any = {
    analyse: this.API_URL + 'analyses/',
    choix: this.API_URL + 'choixs/',
    classification: this.API_URL + 'classifications/',
    consigne: this.API_URL + 'consignes/',
    info_add: this.API_URL + 'infoadditionnelles/',
    maladie: this.API_URL + 'maladies/',
    profile: this.API_URL + 'profiles/',
    question: this.API_URL + 'questions/',
    reponse: this.API_URL + 'reponses/',
    rep_add: this.API_URL + 'repadditionnelles/',
    type_consigne: this.API_URL + 'typeconsignes/',
    type_user: this.API_URL + 'typeusers/',
    user: this.API_URL + 'users/',
    type_rep: this.API_URL + 'typereponses/',
    symptomes: this.API_URL + 'symptomes/'
  }

  TypeTime = {
    annee: 1,
    mois: 2,
    jour: 3 | 0,
    heure: 4,
    minute: 5,
    seconde: 6,
    milliseconde: 7
  };

  constructor(
    private titleService: Title,
    private cookie: CookieService,
  ) {
		this.setTitle('Fight corona');
	}

  public getHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.token,
      })
    };

    return httpOptions;
  }

  public setTitle(newTitle: string) {
    // permet de mettre un titre au site (dans l'inglet)
    this.titleService.setTitle(newTitle);
  }
  
  public getParams(func: any, arg: any): any {
    /*
     *
     * fonction permettant d'obtenir la liste de tout les paramètres d'une fonction et leur valeur comme un json
     * Arguments:
     *    func: nom de la fonction, si getParams est appelé pour une méthode de classe on met this, exemple; getParams(this.nom_methode, arguments)
     *    arg: variable argument qui est une fonction native de javascript qui contient la liste des variables passées en paramètre
     *    exemple: getParams(this.nom_methode, arguments)
     * Return:
     *    objet json des paramètres de la fonction passée en paramètre et leurs valeurs
     */

    let str = func.toString();
    str = str.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/(.)*/g, '').replace(/{[\s\S]*}/, '').replace(/=>/g, '').trim();
    let start = str.indexOf("(") + 1;
    let end = str.length - 1;
    let result = str.substring(start, end).split(", ");
    let params = new Object();
    result.forEach((elt, i) => {
      elt = elt.replace(/=[\s\S]*/g, '').trim();
      if (elt.length > 0) {
        params[elt] = arg[i];
      }
    });

    return params;
  }

  public encrypt(str: string) {
    return str;
  }

  public decrypt(str: string) {
    return str;
  }

  public setCookie(name: string, value: string, expired: { nb: number; unite: number } = { nb: 7, unite: 3 }, path = '/'): void {
    try {
      this.cookie.set(name, value, this.setExpired(expired.nb, expired.unite), path, '', false, 'Lax');
    } catch (e) {
      console.log('Erreur rencontrée au niveau du cookie:', e);
    }
  }

  public getCookie(name: string = null): any {
    // retourne le cookie dont le nom est passé en paramètre ou tout les cookies si rien n'est passé en argument
    return name == null ? this.cookie.getAll() : this.cookie.get(name);
  }

  public removeCookie(name: string = null, path = '/'): void {
    // supprime le cookie dont le nom est passé en paramètre ou tout les cookies si rien n'est passé en argument
    if (name != null) {
      this.cookie.delete(name, path);
    } else {
      this.cookie.deleteAll(path);
    }
  }

  private setExpired(nb: number = 7, unite: number = 3): Date {
    // renvoie la date d'expiration(bien formatée) des cookies(par défaut ce sera  7 jours) en tenant compte de l'unité de temps envoyé (année=1, mois=2, jours=3, heure=4, minute=5, seconde=6, milliseconde=7)
    let now = Date.now();
    let annee = new Date(now).getUTCFullYear();
    let bix =
      annee % 400 == 0 || (annee % 4 == 0 && annee % 100 != 0) ? 366 : 365; // année bissextile ou pas, si oui 366 sinon 365
    switch (unite) {
      case this.TypeTime.annee:
        return new Date(now + 3600 * 24 * bix * nb * 1000);
        break;
      case this.TypeTime.mois:
        return new Date(now + 3600 * 24 * 30 * nb * 1000); // on suppose qu'un mois fait 30 jours ici
        break;
      case this.TypeTime.heure:
        return new Date(now + 3600 * nb * 1000);
        break;
      case this.TypeTime.minute:
        return new Date(now + 60 * nb * 1000);
        break;
      case this.TypeTime.seconde:
        return new Date(now + nb * 1000);
        break;
      case this.TypeTime.milliseconde:
        return new Date(now + nb);
        break;
      default:
        // alert(new Date(now + (3600 * 24 * nb)));
        return new Date(now + 3600 * 24 * nb * 1000);
        break;
    }
  }

  public regexTel(str: string): boolean {
    let phoneReg = /^([0-9]{8,8})$/;
    return phoneReg.test(str);
  }
}

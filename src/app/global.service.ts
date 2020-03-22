import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GService {
  private API_URL = '';

  link: any = {
    analyse: this.API_URL + '',
    choix: this.API_URL + '',
    classification: this.API_URL + '',
    consigne: this.API_URL + '',
    info_add: this.API_URL + '',
    maladie: this.API_URL + '',
    profile: this.API_URL + '',
    question: this.API_URL + '',
    reponse: this.API_URL + '',
    rep_add: this.API_URL + '',
    type_consigne: this.API_URL + '',
    type_user: this.API_URL + '',
    user: this.API_URL + '',
    temperature: this.API_URL + '',
    login: this.API_URL + '',
    register: this.API_URL + '',
  }


  constructor(private titleService: Title) {
		this.setTitle('Fight corona');
	}

  public getHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
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
}

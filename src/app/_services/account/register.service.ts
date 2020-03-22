import { Injectable } from '@angular/core';
import { GService } from 'src/app/global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private G: GService, private httpClient: HttpClient,) { }

  public register(nom: string, prenoms: string, numero: string, password: string) {
    return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.login, {nom, prenoms, numero, password}, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
  }
}

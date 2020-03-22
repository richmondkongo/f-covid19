import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private G: GService, private httpClient: HttpClient,) { }

  public login(numero: string, password) {
    return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.login, {numero, password}, this.G.getHttpOptions()).subscribe(
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

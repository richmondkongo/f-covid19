import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  constructor(private G: GService, private httpClient: HttpClient,) { }

  public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.profile, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	} 

	public readById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.profile + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, numero: string, localisation: string, sexe: number, type_user: number, classe: number, deleted: boolean = false) {
    let params = this.G.getParams(this.update, arguments);
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.profile, params, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, user: number, numero: string, localisation: string, sexe: number, type_user: number, classe: number, deleted: boolean = false) { 
    let params = this.G.getParams(this.update, arguments);
    delete params.id;
    
    return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.profile + id + '/', params, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public delete(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.profile + id + '/', this.G.getHttpOptions()).subscribe(
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

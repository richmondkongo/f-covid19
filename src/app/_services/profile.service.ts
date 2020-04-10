import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {


	constructor(
		private G: GService,
		private httpClient: HttpClient,
	) { }

	public read(filter: string = '') {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.profile + filter, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, numero: string, localisation: string, sexe: number, type_user: string = null, classe: string = null, maladie: string = null, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.profile, { user, numero, localisation, sexe, type_user, maladie, classe, deleted }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, user: number, numero: string, localisation: string, sexe: number, type_user: string, classe: string = null, maladie: string, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.profile + id + '/', { user, numero, localisation, sexe, type_user, maladie, classe, deleted }, this.G.getHttpOptions()).subscribe(
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

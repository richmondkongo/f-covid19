import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {


	constructor(
		private G: GService,
		private httpClient: HttpClient,
		private dbService: NgxIndexedDBService,
	) { }

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

	public readByUser(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.profile + '?user=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, numero: string, localisation: string, sexe: number, type_user: string, classe: string, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.profile, { user, numero, localisation, sexe, type_user, classe, deleted }, this.G.getHttpOptions()).subscribe(
					(res) => {
						this.dbService.add('profil', res).then(
							() => {
								resolve(res);
							}, error => {
								reject(error);
								console.log(error);
							}
						);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, user: number, numero: string, localisation: string, sexe: number, type_user: string, classe: string, deleted: boolean = false) {
		let params = this.G.getParams(this.update, arguments);
		delete params.id;

		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.profile + id + '/', { user, numero, localisation, sexe, type_user, classe, deleted }, this.G.getHttpOptions()).subscribe(
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

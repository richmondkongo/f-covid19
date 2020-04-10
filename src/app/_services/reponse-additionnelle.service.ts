import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
	providedIn: 'root'
})
export class ReponseAdditionnelleService {


	constructor(private G: GService, private httpClient: HttpClient, ) { }

	public read(filter: string='') {
		return new Promise( 
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.rep_add + filter, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, question: string, valeur: string, analyse: string=null, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.rep_add, {user, question, valeur, analyse, deleted}, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, user: number, question: string, valeur: string, analyse: string=null, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.rep_add + id + '/', {user, question, valeur, analyse, deleted}, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.rep_add + id + '/', this.G.getHttpOptions()).subscribe(
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

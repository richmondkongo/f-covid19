import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
	providedIn: 'root'
})
export class ChoixService {
	constructor(private G: GService, private httpClient: HttpClient, ) { }

	public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.choix, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		); 
	}

	public readBy(filter: string, value: string|number) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.choix + `?${filter}=${value}`, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(analyse: string, question: string, valeur: string, reponse: string = null, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.choix, { analyse, question, valeur, reponse, deleted }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: string, analyse: string, question: string, valeur: string, reponse: string = null, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.choix + id + '/', {analyse, question, valeur, reponse, deleted}, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.choix + id + '/', this.G.getHttpOptions()).subscribe(
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

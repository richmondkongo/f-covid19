import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
	providedIn: 'root'
})
export class AnalyseService {

	constructor(private G: GService, private httpClient: HttpClient, ) { }

	public read(filter: string = '') {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.analyse + filter, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public readBy(filter: string, value: string | number) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.analyse + `?${filter}=${value}`, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, maladie: string = null, classification: string = null, score_corona: number = null, score_maladie: number = null, medecin: string = null, validation: number = -1,  deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.analyse, { user, maladie, classification, score_corona, score_maladie, medecin, validation, deleted }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: string, user: number, maladie: string = null, classification: string = null, score_corona: number = null, score_maladie: number = null, medecin: string = null, validation: number = -1, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.analyse + id + '/', { user, maladie, classification, score_corona, score_maladie, medecin, validation, deleted }, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.analyse + id + '/', this.G.getHttpOptions()).subscribe(
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

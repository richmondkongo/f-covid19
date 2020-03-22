import { Injectable } from '@angular/core';
import { GService } from '../global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private G: GService, private httpClient: HttpClient, ) { }

	public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.temperature, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.get<any>(this.G.link.temperature + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(valeur: number, user: number,  boolean = false) {
		let params = this.G.getParams(this.update, arguments);
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.temperature, params, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, valeur: number, user: number, deleted: boolean = false) {
		let params = this.G.getParams(this.update, arguments);
		delete params.id;

		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.temperature + id + '/', params, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.temperature + id + '/', this.G.getHttpOptions()).subscribe(
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

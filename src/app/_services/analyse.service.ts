import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  constructor(private G: GService, private httpClient: HttpClient,) { }

  public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.analyse, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.get<any>(this.G.link.analyse + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(user: number, maladie: string, deleted: boolean = false) {
		// public create(user: number, maladie: string, classification: string, :deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.analyse, {user, maladie, deleted}, this.G.getHttpOptions()).subscribe(
					// this.httpClient.post<any>(this.G.link.analyse, {user, maladie, classification, deleted}, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: string, user: number, maladie: string, deleted: boolean = false) {
		// public update(id: string, user: number, maladie: string, classification: string, deleted: boolean = false) {
    return new Promise(
			(resolve, reject) => {
				// this.httpClient.put<any>(this.G.link.analyse + id + '/', {user, maladie, classification, deleted}, this.G.getHttpOptions()).subscribe(
					this.httpClient.put<any>(this.G.link.analyse + id + '/', {user, maladie, deleted}, this.G.getHttpOptions()).subscribe(
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

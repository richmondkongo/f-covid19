import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {

  
  constructor(private G: GService, private httpClient: HttpClient,) { }

  public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.type_user, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.get<any>(this.G.link.type_user + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(libelle: string, deleted: boolean = false) {
    let params = this.G.getParams(this.update, arguments);
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.type_user, params, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, libelle: string, deleted: boolean = false) {
    let params = this.G.getParams(this.update, arguments);
    delete params.id;
    
    return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.type_user + id + '/', params, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.type_user + id + '/', this.G.getHttpOptions()).subscribe(
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

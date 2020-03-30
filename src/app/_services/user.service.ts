import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GService } from '../global.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
	providedIn: 'root'
})
export class UserService {


	constructor(
		private G: GService,
		private httpClient: HttpClient,
		private dbService: NgxIndexedDBService,
	) { }

	public read() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.user, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.get<any>(this.G.link.user + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public readByUsername(username: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.user + '?username=' + username, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public create(password: string, username: string, first_name: string, last_name: string, email: string, is_staff: boolean = false, is_active: boolean = true, is_superuser: boolean = false, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.user, { password, username, first_name, last_name, email, is_staff, is_active, is_superuser, deleted }, this.G.getHttpOptions()).subscribe(
					(res) => {
						this.dbService.add('user', res).then(
							() => {
								resolve(res);
							}, error => {
								reject(error);
								console.log(error);
							}
						);
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	public update(id: number, password: string, username: string, first_name: string, last_name: string, email: string, is_staff: boolean = false, is_active: boolean = true, is_superuser: boolean = false, deleted: boolean = false) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.user + id + '/', { password, username, first_name, last_name, email, is_staff, is_active, is_superuser, deleted }, this.G.getHttpOptions()).subscribe(
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
				this.httpClient.delete<any>(this.G.link.user + id + '/', this.G.getHttpOptions()).subscribe(
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

import { Injectable } from '@angular/core';
import { GService } from '../global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SymptomesService {

  constructor(private G: GService, private httpClient: HttpClient, ) { }

  public read(filter: string='') {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<any>(this.G.link.symptomes + filter, this.G.getHttpOptions()).subscribe(
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
        this.httpClient.get<any>(this.G.link.symptomes + '?id=' + id, this.G.getHttpOptions()).subscribe(
          (res) => {
            resolve(res);
          }, (err) => {
            reject(err);
          }
        )
      }
    );
  }

  public readByMaladie(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<any>(this.G.link.symptomes + '?maladie=' + id, this.G.getHttpOptions()).subscribe(
          (res) => {
            resolve(res);
          }, (err) => {
            reject(err);
          }
        )
      }
    );
  }

  public readByQuestion(id: string) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<any>(this.G.link.symptomes + '?question=' + id, this.G.getHttpOptions()).subscribe(
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
        this.httpClient.post<any>(this.G.link.symptomes, params, this.G.getHttpOptions()).subscribe(
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
        this.httpClient.put<any>(this.G.link.symptomes + id + '/', params, this.G.getHttpOptions()).subscribe(
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
        this.httpClient.delete<any>(this.G.link.symptomes + id + '/', this.G.getHttpOptions()).subscribe(
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

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        this.isAuth = true;
        resolve(true);
        console.log(this.isAuth);
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}
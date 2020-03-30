import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { GService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corona-login',
  templateUrl: './corona-login.component.html',
  styleUrls: ['./corona-login.component.css']
})
export class CoronaLoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  user: any = {
    nom: '',
    prenom: '',
    contact: '',
    password: '',
    confpassword: '',
  };
  errorMsg: string = null;

  constructor(
    private GServ: GService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private profileServ: ProfileService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.init();
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
      }
    ); 
  }

  init() {
    this.registerForm = this.formBuilder.group({
      nom: [this.user.nom, [Validators.required]],
      prenom: [this.user.prenom, [Validators.required]],
      contact: [this.user.contact, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      confpassword: [this.user.confpassword, [Validators.required]]
    });

    this.loginForm = this.formBuilder.group({
      contact: [this.user.contact, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  login() {
    let f = this.loginForm.value;
    if (this.loginForm.valid) {
      if (this.GServ.regexTel(f.contact)) {
        this.userServ.readByUsername(f.contact).then(
          (res_user: any) => {
            if (res_user.count == 1 && res_user.results[0].password == f.password) {
              this.profileServ.readByUser(res_user.results[0].id).then(
                (res_profile: any) => {
                  let token = {
                    user: res_user,
                    profil: res_profile
                  }
                  console.log(token);
                  this.GServ.setCookie('token', JSON.stringify(token));
                  this.router.navigate(['/quiz'])
                }, (err_profile: any) => {
                  console.log(err_profile);
                }
              )
            } else {
              this.errorMsg = 'Téléphone ou mot de passe incorrecte.'
            }
          }, (err_user: any) => {
            console.log(err_user);
          }
        )
      } else {
        this.errorMsg = 'Veuillez entrer un numéro de téléphone valable.'
      }
    } else {
      this.errorMsg = 'Veuillez remplir tout les champs.'
    }

    setTimeout(() => {
      this.errorMsg = null;
    }, 10000);
  }

  register() {
    let f = this.registerForm.value;
    if (this.registerForm.valid) {
      if (f.password == f.confpassword) {
        if (this.GServ.regexTel(f.contact)) {
          this.userServ.create(f.password, f.contact, f.prenom, f.nom, `${f.nom}${f.prenom}@${f.nom}.com`, false, true, false, false).then(
            (res_user: any) => {
              this.profileServ.create(res_user.id, f.contact, '', 0, "cff23c0b-f1eb-4e3d-b0d2-22257ebbdd7a", "518229ec-c06c-4e4f-bb4a-7c9a5904bf02", false).then(
                (res_profil: any) => {
                  let token = {
                    user: res_user,
                    profil: res_profil
                  }
                  
                  this.GServ.setCookie('token', JSON.stringify(token));
                  this.router.navigate(['/quiz'])
                }, (err_profil: any) => {
                  console.log(err_profil);
                }
              )
            }, (err_user: any) => {
              if (JSON.stringify(err_user).indexOf('A user with that username already exists.') > -1) {
                this.errorMsg = 'Ce numéro de téléphone a déjà été utlisé.'
              }
              console.log(err_user);
            }
          );
        } else {
          this.errorMsg = 'Veuillez entrer un numéro de téléphone valable.'
        }
      } else {
        this.errorMsg = 'Les deux mots de passe doivent être identiques.'
      }
    } else {
      this.errorMsg = 'Veuillez remplir tout les champs.'
    }

    setTimeout(() => {
      this.errorMsg = null;
    }, 10000);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { GService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeUserService } from '../_services/type-user.service';
import { ClassificationService } from '../_services/classification.service';

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
  type_user: any = null; // rececvra le type citoyen
  classe_user: any = null; // rececvra la classe inconnu

  class_searched = 'Citoyen';

  constructor(
    private GServ: GService,
    private formBuilder: FormBuilder,
    private userServ: UserService,
    private profileServ: ProfileService,
    private typeUserServ: TypeUserService,
    private classeServ: ClassificationService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.class_searched = (this.route.snapshot.params['medecin'] && this.GServ.no_accent(this.route.snapshot.params['medecin']) == this.GServ.no_accent("medecin")) ? 'Corps-médicale': 'Citoyen';

    this.typeUserServ.read().then(
      (res: any) => {
        res.results.forEach(elt => {
          if (this.GServ.no_accent(elt.libelle) == this.GServ.no_accent(this.class_searched)) {
            // console.log(elt);
            this.type_user = elt;
          }
        });
      }, (err: any) => {
        console.log(err)
      }
    );

    this.classeServ.read().then(
      (res: any) => {
        res.results.forEach(elt => {
          if (this.GServ.no_accent(elt.libelle) == this.GServ.no_accent('non-testé')) {
            // console.log(elt);
            this.classe_user = elt;
          }
        });
      }, (err: any) => {
        console.log(err)
      }
    );
    this.init();
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
        this.userServ.read(`?username=${f.contact}`).then(
          (res_user: any) => {
            // alert(JSON.stringify(res_user))
            if (res_user.count == 1 && res_user.results[0].password == f.password) {
              this.profileServ.read(`?user=${res_user.results[0].id}`).then(
                (res_profile: any) => {
                  let token = {
                    user: res_user.results[0],
                    profil: res_profile.results[0]
                  }
                  this.GServ.setCookie('token', JSON.stringify(token));
                  if (this.route.snapshot.params['medecin'] && this.GServ.no_accent(this.route.snapshot.params['medecin']) == this.GServ.no_accent("medecin")) {
                    this.router.navigate(['/superdashboard']);
                  } else {
                    this.router.navigate(['/analyse']);
                  }
                }, (err_profile: any) => {
                  console.log(err_profile);
                }
              )
            } else {
              this.errorMsg = 'Téléphone ou mot de passe incorrecte.'
            }
          }, (err_user: any) => {
            // alert('118' + JSON.stringify(err_user))
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
          this.userServ.create(f.password, f.contact, f.prenom, f.nom, `mail${f.contact}@mail.com`, false, true, false, false).then(
            (res_user: any) => {
              // console.log('creation de user:', res_user)
              this.profileServ.create(res_user.id, f.contact, '', 0, this.type_user.id, this.classe_user.id).then(
                (res_profil: any) => {
                  // console.log('creation du profile:', res_profil)
                  let token = {
                    user: res_user,
                    profil: res_profil
                  }

                  this.GServ.setCookie('token', JSON.stringify(token));
                  if (this.route.snapshot.params['medecin'] && this.GServ.no_accent(this.route.snapshot.params['medecin']) == this.GServ.no_accent("medecin")) {
                    this.router.navigate(['/superdashboard']);
                  } else {
                    this.router.navigate(['/quiz']);
                  }
                }, (err_profil: any) => {
                  console.log(err_profil);
                  this.userServ.delete(res_user.id).then(
                    (res_de) => {
                      console.log('suppression du user', res_de)

                    }, (err_de) => {
                      console.log('suppression du user', err_de)
                    }
                  )
                }
              )
            }, (err_user: any) => {
              if (JSON.stringify(err_user).indexOf('A user with that username already exists.') > -1 || JSON.stringify(err_user).indexOf('Un utilisateur avec ce nom existe déjà.') > -1) {
                this.errorMsg = 'Ce numéro de téléphone a déjà été utlisé.'
              } else if (JSON.stringify(err_user).indexOf('Enter a valid email address.')) {
                // this.errorMsg = 'Mail.';
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

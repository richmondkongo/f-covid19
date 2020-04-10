import { Component, OnInit, OnChanges } from '@angular/core';
import { GService } from '../global.service';
import { QuestionService } from '../_services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyseService } from '../_services/analyse.service';
import { ChoixService } from '../_services/choix.service';
import { InformationAdditionnelleService } from '../_services/information-additionnelle.service';
import { ReponseAdditionnelleService } from '../_services/reponse-additionnelle.service';
import { MaladieService } from '../_services/maladie.service';
import { SymptomesService } from '../_services/symptomes.service';
import { ClassificationService } from '../_services/classification.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-corona-quiz',
  templateUrl: './corona-quiz.component.html',
  styleUrls: ['./corona-quiz.component.css']
})
export class CoronaQuizComponent implements OnInit, OnChanges {
  questions: any = null;
  model = { options: '1' };
  current_question = 0;
  type_question = {
    bool: 1,
    others: 2
  }
  repForm: FormGroup;
  rep: {
    type,
    reponse,
    question,
  }[] = [];
  maladies: any = null;
  user_analyse: any = null;
  classe: any = null;

  constructor(
    private GServ: GService,
    private formBuilder: FormBuilder,
    private questionServ: QuestionService,
    private analyseServ: AnalyseService,
    private choixServ: ChoixService,
    private infoAddServ: InformationAdditionnelleService,
    private repAddServ: ReponseAdditionnelleService,
    private maladieServ: MaladieService,
    private symptomeServ: SymptomesService,
    private classeServ: ClassificationService,
    private profileServ: ProfileService,
  ) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void { }

  init(c = null, t = null) {
    this.repForm = this.formBuilder.group({
      choix: [c, [Validators.required]],
      textuel: [t, [Validators.required]],
    });
  }

  ngOnInit() {
    this.analyseServ.read(`?user=${JSON.parse(this.GServ.getCookie('token')).user.id}&validation=-1`).then(
      (r_ana: any) => {
        // console.log('analyse de ce ', r_ana);
        if (r_ana.count == 0) {
          this.setQuiz();
        } else {
          document.getElementById('my-body').innerHTML = '<mat-toolbar> <mat-toolbar-row> <h1 style="width: 100%; color: orange; text-align: center;">Vous avez une analyse en cours présentement, veuillez attendre qu\'elle prenne fin avant de refaire un  autre quiz.</h1> </mat-toolbar-row> </mat-toolbar>';
        }
      }, (e_ana) => {
        console.log(e_ana)
      }
    )

    this.init();
  }

  setCurrentQuestionNext(num: number): void {
    if ((this.repForm.value.choix == null && this.repForm.value.textuel != null) || (this.repForm.value.choix != null && this.repForm.value.textuel == null)) {
      if ((num <= this.questions.count - 1) && (num >= 0)) {
        this.current_question = num;
        let rp_id = (this.repForm.value.choix == null) ? this.repForm.value.textuel : this.repForm.value.choix;

        this.rep[this.current_question - 1].reponse = rp_id;
        if (this.type_question.bool == this.rep[this.current_question].type) {
          this.init(this.rep[this.current_question].reponse, null);
        } else {
          this.init(null, this.rep[this.current_question].reponse);
        }
      }
    }
  }

  setCurrentQuestionPrev(num: number): void {
    if ((num <= this.questions.count - 1) && (num >= 0)) {
      this.current_question = num;
      if (this.type_question.bool == this.rep[this.current_question].type) {
        this.init(this.rep[this.current_question].reponse, null);
      } else {
        this.init(null, this.rep[this.current_question].reponse);
      }
    }
  }

  repSubmit() {
    if (this.type_question.bool == this.rep[this.current_question].type) {
      this.rep[this.current_question].reponse = this.repForm.value.choix;
    } else {
      this.rep[this.current_question].reponse = this.repForm.value.textuel;
    }

    this.analyseServ.create(JSON.parse(this.GServ.getCookie('token')).user.id, null).then(
      (res_ana: any) => {
        // console.log('creation analyse de l\'utlisateur:', res_ana);
        this.user_analyse = res_ana;
        this.rep.forEach((elt, i) => {
          if (elt.type == this.type_question.bool) {
            this.choixServ.create(this.user_analyse.id, elt.question, elt.reponse, null, false).then(
              (res_choix) => {
                if (i == this.rep.length - 1) { this.scoring(); }
                // console.log(res_choix);
              }, (err_choix) => {
                console.log(err_choix);
              }
            );
          } else {
            this.repAddServ.create(parseInt(JSON.parse(this.GServ.getCookie('token')).user.id), elt.question, elt.reponse, this.user_analyse.id).then(
              (res_i) => {
                if (i == this.rep.length - 1) { this.scoring(); }
                // console.log(res_i)
              }, (err_i) => {
                console.log(err_i)
              }
            )
          }

        })
      }, (err_ana) => {
        console.log(err_ana);
      }
    )
  }

  scoring() {
    let score_cor: number = null;
    this.rep.forEach((rp, i1) => {
      if (rp.reponse == 1) {
        this.questions.results[i1].symptomes.forEach((s, i2) => {
          this.maladies.results.forEach((m, i3) => {
            if (m.id == s.maladie) {
              this.maladies.results[i3].score += 1;
            }
          })
        });
      }

      if (i1 == this.rep.length - 1) {
        let best_score: number = 0;
        let analyse_result: any[] = [];

        let cls: any[] = [null, null];
        this.classe.results.forEach((cl, ic) => {
          if (this.GServ.no_accent('non-infecté') == this.GServ.no_accent(cl.libelle)) {
            cls[0] = cl.id;
          } else if (this.GServ.no_accent('En attente') == this.GServ.no_accent(cl.libelle)) {
            cls[1] = cl.id;
          }
        })

        this.maladies.results.forEach((m2, i2) => {
          if (best_score <= m2.score) {
            best_score = m2.score;
          }
          if (m2.libelle.toLowerCase() == "covid-19".toLowerCase()) {
            score_cor = m2.score;
          }

          if (i2 == this.maladies.results.length - 1) {
            for (let i = 0; i < this.maladies.results.length; i++) {
              const m3 = this.maladies.results[i];
              if (m3.score == best_score) {
                if (m3.libelle.toLowerCase() == "covid-19".toLowerCase() && best_score != 0) {
                  // le mec est corona "virussé"
                  document.getElementById('my-body').innerHTML = '<mat-toolbar> <mat-toolbar-row> <h1 style="width: 100%; color: red; text-align: center;">Vous êtes peut être atteint du corona virus, un medecin analysera votre cas afin de vous situer.</h1> </mat-toolbar-row> </mat-toolbar>'
                  this.analyseServ.update(this.user_analyse.id, this.user_analyse.user, m3.id, cls[1], m3.score, m3.score, null, -1, false).then(
                    (res_ana) => {
                      // console.log(res_ana);
                      this.profileServ.update(JSON.parse(this.GServ.getCookie('token')).profil.id, JSON.parse(this.GServ.getCookie('token')).user.id, JSON.parse(this.GServ.getCookie('token')).profil.numero, JSON.parse(this.GServ.getCookie('token')).profil.localisation, JSON.parse(this.GServ.getCookie('token')).profil.sexe, JSON.parse(this.GServ.getCookie('token')).profil.type_user, cls[1], m3.id).then(
                        (r_prof) => {
                          // console.log(r_prof)
                        }, (e_prof) => {
                          console.log(e_prof)
                        }
                      );

                    }, (err_ana) => {
                      console.log(err_ana)
                    }
                  )
                  i = this.maladies.results.length + 1;
                } else {
                  if (i == this.maladies.results.length - 1) {
                    document.getElementById('my-body').innerHTML = '<mat-toolbar> <mat-toolbar-row> <h1 style="width: 100%; color: green; text-align: center;">Bonne nouvelle, vous n\'êtes pas atteint du corona virus.</h1> </mat-toolbar-row> </mat-toolbar>'
                    this.analyseServ.update(this.user_analyse.id, this.user_analyse.user, m3.id, cls[0], score_cor, m3.score, null, -2, false).then(
                      (res_ana) => {
                        // console.log(res_ana);
                        this.profileServ.update(JSON.parse(this.GServ.getCookie('token')).profil.id, JSON.parse(this.GServ.getCookie('token')).user.id, JSON.parse(this.GServ.getCookie('token')).profil.numero, JSON.parse(this.GServ.getCookie('token')).profil.localisation, JSON.parse(this.GServ.getCookie('token')).profil.sexe, JSON.parse(this.GServ.getCookie('token')).profil.type_user, cls[0], m3.id).then(
                          (r_prof) => {
                            // console.log(r_prof)
                          },
                          (e_prof) => {
                            // console.log(e_prof)
                          }
                        );
                      }, (err_ana) => {
                        console.log(err_ana)
                      }
                    )
                  }
                  // autre chose
                  analyse_result.push(m3)
                }
              }
            }
          }
        })
      }
    })
  }

  setQuiz() {
    this.questionServ.read().then(
      (res: any) => {
        this.questions = res;

        this.questions.results.forEach((elt, i) => {
          this.symptomeServ.read(`?question=${elt.id}`).then(
            (res_sq: any) => {
              this.questions.results[i].symptomes = res_sq.results;
            }, (err_sq) => {
              console.log(err_sq)
            }
          )
          this.rep.push({
            type: this.type_question.bool,
            reponse: null,
            question: elt.id
          })
        });

        this.infoAddServ.read().then(
          (res_i: any) => {
            this.questions.count = this.questions.count + res_i.count;
            this.questions.results = [...this.questions.results, ...res_i.results];
            res_i.results.forEach((elt, i) => {
              this.rep.push({
                type: this.type_question.others,
                reponse: null,
                question: elt.id
              })
            });

            this.maladieServ.read().then(
              (res_m: any) => {
                this.maladies = res_m;
                res_m.results.forEach((elt, i) => {
                  this.symptomeServ.readByMaladie(elt.id).then(
                    (res_s: any) => {
                      this.maladies.results[i].symptomes = res_s.results;
                      this.maladies.results[i].score = 0;

                      this.classeServ.read().then(
                        (res_cl) => {
                          this.classe = res_cl;
                        }, (err_cl) => {
                          console.log(err_cl);
                        }
                      )
                    }, (err_s) => {
                      console.log(err_s)
                    }
                  )
                });
              }, (err_m) => {
                console.log(err_m);
              }
            );
          }, (err_i) => {
            console.log(err_i)
          }
        );

      }, (err: any) => {
        console.log(err);
      }
    )
  }
}

import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { GService } from '../global.service';
import { QuestionService } from '../_services/question.service';
import { ChoixService } from '../_services/choix.service';
import { InformationAdditionnelleService } from '../_services/information-additionnelle.service';
import { ReponseAdditionnelleService } from '../_services/reponse-additionnelle.service';
import { SymptomesService } from '../_services/symptomes.service';
import { MaladieService } from '../_services/maladie.service';
import { ConsigneService } from '../_services/consigne.service';

@Component({
  selector: 'app-analyse-details',
  templateUrl: './analyse-details.component.html',
  styleUrls: ['./analyse-details.component.css']
})
export class AnalyseDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() changer: number = null;
  nb_symptome_covid = 0;
  analyse: any = null;
  maladies: any = null;
  questions: any = null;
  consignes: any = null;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 2 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 2 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 }
      ];
    })
  );


  constructor(
    private GServ: GService,
    private questionServ: QuestionService,
    private breakpointObserver: BreakpointObserver,
    private choixServ: ChoixService,
    private repAddServ: ReponseAdditionnelleService,
    private infoAddServ: InformationAdditionnelleService,
    private symptomeServ: SymptomesService,
    private maladieServ: MaladieService,
    private consigneServ: ConsigneService,
  ) { }

  ngOnDestroy() {
    sessionStorage.removeItem('analyse_details');
  }

  ngOnInit(): void {
    if (sessionStorage.analyse_details != 'null') {
      // console.log(sessionStorage.analyse_details)
      this.analyse = JSON.parse(this.GServ.decrypt(sessionStorage.analyse_details));
      // console.log(this.analyse);
      this.questionServ.read().then(
        (r_question) => {
          this.questions = r_question;
          // console.log(r_question);

          this.choixServ.readBy('analyse', this.analyse.id).then(
            (r_choix) => {
              let c: any = r_choix;
              // console.log(r_choix);
              this.questions.results.forEach((elt_question, i_question) => {
                this.questions.results[i_question].choix = c.results[i_question];
                this.questions.results[i_question].type = -1;
                if (i_question == this.questions.results.length - 1) {
                  // this.addRepAddit()
                  this.addSymptome();
                }
              });
            }, (e_choix) => {
              console.log(e_choix);
            }
          )
        }, (e_question) => {
          console.log(e_question);
        }
      )

    }
  }

  ngOnChanges() {
    // alert('changement');
    this.ngOnInit();
  }

  addRepAddit() {
    this.infoAddServ.read().then(
      (r_info_add: any) => {
        let r: any = r_info_add;
        r.results.forEach((e_info_add, i_info_add) => {
          this.repAddServ.read(`?analyse=${this.analyse.id}&question=${e_info_add.id}`).then(
            (r_rep_add: any) => {
              r.results[i_info_add].type = 1;
              r.results[i_info_add].reponse = r_rep_add.results[0];
              if (i_info_add == r.results.length - 1) {
                this.questions.count += r.count;
                this.questions.results = [...this.questions.results, ...r.results];
                this.getConsigneOfMaladie(this.analyse.maladie);

                // console.log('reponse add', r, '\nquestion', this.questions);
              }
            }, (e_rep_add) => {
              console.log(e_rep_add);
            }
          )
        });
        // console.log(this.questions.results);
      }, (e_info_add) => {
        console.log(e_info_add);
      }
    );
  }

  addSymptome() {
    this.maladieServ.read().then(
      (res_m: any) => {
        this.maladies = res_m;
        this.maladies.results.forEach((elt, i) => {
          this.symptomeServ.readByMaladie(elt.id).then(
            (res_s: any) => {
              this.maladies.results[i].symptomes = res_s.results;
              if (elt.libelle.toLowerCase() == "covid-19".toLowerCase()) {
                this.nb_symptome_covid = res_s.count
              }
            }, (err_s) => {
              console.log(err_s)
            }
          )

          if (i == this.maladies.results.length - 1) {
            this.addRepAddit();
          }
        });
      }, (err_m) => {
        console.log(err_m);
      }
    );
  }

  getConsigneOfMaladie(maladie_id) {
    this.consigneServ.read(`?maladie=${maladie_id}`).then(
      (r_con) => {
        this.consignes = r_con;
        // console.log('Liste des consignes:', r_con);
      }, (e_con) => {
        console.log(e_con);
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-testeur',
  templateUrl: './testeur.component.html',
  styleUrls: ['./testeur.component.css']
})
export class TesteurComponent implements OnInit {
  questions = [{
    libelle: "Pensez-vous avoir ou avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?",
    numero: 1
  },{
    libelle: 'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',
    numero: 2,
  },{
    libelle: 'Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?',
    numero: 3,
  },{
    libelle: 'Ces derniers jours, avez-vous un mal de gorge ?',
    numero: 4,
  },{
    libelle: 'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.',
    numero: 5,
  },{
    libelle: 'Ces derniers jours, avez-vous une fatigue inhabituelle ?',
    numero: 6,
  }]
  constructor(
    private questionServ: QuestionService,
    private userServ: UserService,
    private profileServ: ProfileService
  ) { }

  ngOnInit() {
    /*
    this.profileServ.create(2, "59573239", '', 1, "95aa9f5a-a528-46d5-af7c-1e27112a9d44", "45184eae-3730-44c2-8528-02239ee9a4e1", false)
    .then(
      (res: any) => {
        console.log(res);
      }, (err: any) => {
        console.log(err);
      }
    )
    */
   this.questions.forEach((elt, i) => {
    this.questionServ.create(elt.numero, elt.libelle).then(
      (res: any)=> {
        console.log('ok', res);
      }, (err) => {
        console.log(err)
      }
    )
   })
/*
    this.userServ.create('password', 'use1rname', 'first_name', 'last_name', '1email@gmail.com', false, true, false, false).then(
      (res: any) => {
        console.log(res);
        this.profileServ.create(res.id, "59573237", '', 1, "95aa9f5a-a528-46d5-af7c-1e27112a9d44", "45184eae-3730-44c2-8528-02239ee9a4e1", false)
          .then(
            (res: any) => {
              console.log(res); 
            }, (err: any) => {
              console.log(err);
            }
          )
      }, (err: any) => {
        console.log(err);
      }
    );
    */

  }

}

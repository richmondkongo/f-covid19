import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DoctorsListDataSource, DoctorsListItem } from './doctors-list-datasource';
import { Router } from '@angular/router';
import { AnalyseService } from '../_services/analyse.service';
import { ClassificationService } from '../_services/classification.service';
import { GService } from '../global.service';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { TypeUserService } from '../_services/type-user.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements AfterViewInit, OnInit {
  changer: number = 0;
  stat: {
    totalAna: number,
    totalVal: number,
    totalAnaTdy: number,
    totalValTdy: number,
  } = {
      totalAna: 0,
      totalVal: 0,
      totalAnaTdy: 0,
      totalValTdy: 0,
    }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DoctorsListItem>;
  dataSource: DoctorsListDataSource = new DoctorsListDataSource([]);
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 2', cols: 1, rows: 4 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'contact'];
  profile: any = null;
  clss: any = null;
  type: any = null;
  patient: any = null;

  constructor(
    private analyseServ: AnalyseService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private GServ: GService,
    private classeServ: ClassificationService,
    private userServ: UserService,
    private profileServ: ProfileService,
    private typeUserServ: TypeUserService
  ) { }


  ngOnInit() {
    this.statistique(JSON.parse(this.GServ.getCookie('token')).user.id);

    this.classeServ.read().then(
      (r_classe: any) => {
        this.clss = r_classe
        for (let i_cls = 0; i_cls < r_classe.results.length; i_cls++) {
          const cls = r_classe.results[i_cls];
          if (this.GServ.no_accent(cls.libelle) == this.GServ.no_accent('En attente')) {
            this.clss.princ = cls.id;
            // console.clear(); console.log('Liste des classes:', this.clss);
            i_cls = r_classe.results.length + 1;
            this.typeUserServ.read().then(
              (res: any) => {
                this.type = res
                res.results.forEach(elt => {
                  if (this.GServ.no_accent(elt.libelle) == this.GServ.no_accent('Citoyen')) {
                    // console.clear(); console.log('Liste des types:', elt);
                    this.type.princ = elt.id;
                    this.getProfile();
                  }
                });
              }, (err: any) => {
                console.log(err)
              }
            );
          }
        }
      }, (e_classe) => {
        console.log(e_classe);
      }
    );

  }

  ngAfterViewInit() {
    if (this.profile != null && this.profile.count > 0) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  getProfile() {
    this.profileServ.read(`?classe=${this.clss.princ}&type_user=${this.type.princ}`).then(
      (r_prof) => {
        this.profile = r_prof;
        let item: DoctorsListItem[] = [];
        // console.clear(); console.log('Liste des profiles:', this.profile);
        this.profile.results.forEach((e_prof, i_prof) => {
          this.userServ.read(`?id=${e_prof.user}`).then(
            (r_user: any) => {
              this.profile.results[i_prof].user = r_user.results[0]
              try {
                item.push({ id: e_prof.id, name: this.profile.results[i_prof].user.first_name + '  ' + this.profile.results[i_prof].user.last_name, contact: this.profile.results[i_prof].numero })
              } catch (error) {
                this.ngOnInit();
              }
              if (i_prof == this.profile.results.length - 1) {
                this.dataSource = new DoctorsListDataSource(item);
                this.ngAfterViewInit();
                this.setPatient(item[0].id);
              }
            }, (e_user) => {
              console.log(e_user);
            }
          );
        })
      }, (e_prof) => {
        console.log(e_prof);
      }
    )
  }

  viewQuestRep(rw: any) {
    this.setPatient(rw.id)
  }

  viewAllAna(rw: any) {
    this.setPatient(rw.id);
    this.router.navigate([`/medecin-analyse/${JSON.parse(sessionStorage.patient_analyse).user.id}`]);
  }

  setPatient(id) {
    for (let i_prof = 0; i_prof < this.profile.results.length; i_prof++) {
      const e_prof = this.profile.results[i_prof];
      if (id == e_prof.id) {
        this.analyseServ.read(`?user=${e_prof.user.id}&validation=-1`).then(
          (r_ana: any) => {
            sessionStorage.analyse_details = (r_ana.count > 0) ? JSON.stringify(r_ana.results[0]) : JSON.stringify(null);
            // console.log(r_ana)
            this.changer += 1;
          }, (e_ana) => {
            console.log(e_ana);
          }
        );
        this.patient = e_prof;
        sessionStorage.patient_analyse = JSON.stringify(e_prof);
        i_prof = this.profile.results.length + 1;
        // console.log('patient=', this.patient)
      }
    }
  }

  validation(v: number) {
    console.log(this.clss)
    let cls: any[] = [null, null, null];
    this.clss.results.forEach((cl, ic) => {
      if (this.GServ.no_accent('non-infecté') == this.GServ.no_accent(cl.libelle)) {
        cls[0] = cl.id;
      } else if (this.GServ.no_accent('Confirmé') == this.GServ.no_accent(cl.libelle)) {
        cls[1] = cl.id;
      }
    })

    let ana = JSON.parse(sessionStorage.analyse_details);
    let patient = JSON.parse(sessionStorage.patient_analyse);

    cls[2] = (v == 1) ? cls[1] : cls[0];
    this.profileServ.update(patient.id, patient.user.id, patient.numero, patient.localisation, patient.sexe, patient.type_user, cls[2], patient.maladie, false).then(
      (r_prof: any) => {
        console.log('modification du profile suite à la validation du medecin:', r_prof);
        for (let i = 0; i < this.profile.results.length; i++) {
          const elt = this.profile.results[i];
          if (elt.id == patient.id) {
            // console.clear(); console.log(patient)
            this.profile.results.splice(i, 1);
            this.profile.count -= 1;
          }

          let item: DoctorsListItem[] = [];
          try {
            item.push({ id: this.profile.results[i].id, name: this.profile.results[i].user.first_name + '  ' + this.profile.results[i].user.last_name, contact: this.profile.results[i].numero })
          } catch (error) {
            this.ngOnInit();
          }
          if (i == this.profile.results.length - 1) {
            this.dataSource = new DoctorsListDataSource(item);
            this.ngAfterViewInit();
            this.setPatient(item[0].id);
          }
        }
      }, (e_prof) => {
        console.log(e_prof);
      }
    )

    this.analyseServ.update(ana.id, ana.user, ana.maladie, cls[2], ana.score_corona, ana.score_maladie, JSON.parse(this.GServ.getCookie('token')).user.id, v, false).then(
      (r_ana) => {
        // console.log(r_ana);
        sessionStorage.analyse_details = 'null';
      }, (e_ana) => {
        console.log(e_ana);
      }
    )


  }

  statistique(id: string) {
    this.analyseServ.read(`?medecin=${id}`).then(
      (r_ana: any) => {
        this.stat = {
          totalAna: 0,
          totalVal: 0,
          totalAnaTdy: 0,
          totalValTdy: 0,
        };
        this.stat.totalAna = r_ana.count;
        // console.clear();
        let d = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
        r_ana.results.forEach((e_ana, i_ana) => {
          // console.log('\n\n\ndate d\'aujourd\'hui:', d, d.getTime(), '\ndate de la bd:', e_ana.update_at.split('T')[0], new Date(e_ana.update_at.split('T')[0]).getTime(), e_ana.id)
          if (d.getTime() <= new Date(e_ana.update_at.split('T')[0]).getTime()) {
            this.stat.totalAnaTdy += 1;
            if (e_ana.validation == 1) {
              this.stat.totalValTdy += 1;
            }
          }

          if (e_ana.validation == 1) {
            this.stat.totalVal += 1;
          }
        })
      }, (e_ana) => {
        console.log(e_ana);
      }
    )
  }
}

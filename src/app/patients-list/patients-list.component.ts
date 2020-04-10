import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientsListDataSource, PatientsListItem } from './patients-list-datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalyseService } from '../_services/analyse.service';
import { GService } from '../global.service';
import { ClassificationService } from '../_services/classification.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<PatientsListItem>;
  dataSource: PatientsListDataSource;
  viewReturn: boolean = false;
  user_analyse: any = null;
  displayedColumns = ['id', 'etat', 'date', 'heure'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private anaServ: AnalyseService,
    private GServ: GService,
    private classe: ClassificationService,
  ) { }

  ngOnInit() {
    this.dataSource = new PatientsListDataSource([]);
    if (this.route.snapshot.params['id']) {
      this.viewReturn = true;
      this.getUserAnalyse(this.route.snapshot.params['id'])
    } else {
      this.getUserAnalyse(JSON.parse(this.GServ.getCookie('token')).user.id)
    }

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  goToDetails(row: any) {
    for (let i = 0; i < this.user_analyse.results.length; i++) {
      const elt = this.user_analyse.results[i];
      if (elt.id == row.id) {
        sessionStorage.analyse_details = this.GServ.encrypt(JSON.stringify(elt));
        i = this.user_analyse.results.length + 1;
        this.router.navigateByUrl('/analyse-details');
      }
    }
  }

  getUserAnalyse(id: string|number) {
    this.anaServ.readBy('user', id).then(
      (res_ana: any) => {
        this.user_analyse = res_ana;
        this.user_analyse.results.forEach((ana, i1) => {
          this.classe.readBy('id', ana.classification).then(
            (res_cl: any) => {
              this.user_analyse.results[i1].classe = res_cl.results[0];
              if (i1 == this.user_analyse.results.length - 1) {
                let item: PatientsListItem[] = [];
                this.user_analyse.results.forEach((ua, iua) => {
                  let dsplit = ua.update_at.split('T');
                  let hsplit = dsplit[1].split('.');
                  try {
                    item.push({ id: ua.id, etat: ua.classe.libelle, date: dsplit[0], heure: hsplit[0] })
                  } catch (error) {
                    this.ngOnInit();
                  }
                })
                this.dataSource = new PatientsListDataSource(item);
                this.ngAfterViewInit();
              }
            }, (err_cl) => {
              console.log(err_cl)
            }
          )


        });
      }, (err: any) => {
        console.log(err);
      }
    );
  }
}

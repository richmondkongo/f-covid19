import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DoctorsListItem {
  name: string;
  id: number;
  date?:string;
  heure?:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DoctorsListItem[] = [
  {id: 1, name: 'Adopo jordan', date:'Hier',heure:'15h00'},
  {id: 2, name: 'kouame yoel', date:'Hier',heure:'09h50'},
  {id: 3, name: 'Etty Foule' , date:'Avant-hier',heure:'13h07'},
  {id: 4, name: 'Yeo Caudanna' , date:'20-03-2020',heure:'17h12'},
  {id: 5, name: 'Ahissan Samuel' , date:'20-03-2020',heure:'08h00'},
  {id: 6, name: 'Sapohi liline', date:'19-03-2020',heure:'15h00'},
  {id: 7, name: 'Assi Arlette', date:'19-03-2020',heure:'09h50'},
  {id: 8, name: 'Ouohi Anselme' , date:'18-03-2020',heure:'13h07'},
  {id: 9, name: 'Tacka Walter' , date:'17-03-2020',heure:'17h12'},
  {id: 10, name: 'Abdallah Hakim' , date:'17-03-2020',heure:'08h00'},
];

/**
 * Data source for the DoctorsList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DoctorsListDataSource extends DataSource<DoctorsListItem> {
  data: DoctorsListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DoctorsListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DoctorsListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DoctorsListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'heure': return compare(+a.heure, +b.heure, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

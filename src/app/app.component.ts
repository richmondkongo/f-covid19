import { Component } from '@angular/core';
import { AnalyseService } from './_services/analyse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'f-covid19';

  constructor(private a: AnalyseService) {
    this.a.update(1,2,3,4,false).then(
      (res)=> {
        
      }
    );
  }

  private fun(at: number,bim: string): void {
    console.log(this.getParams(this.fun, arguments));
    // console.log(arguments, '\n\n', at, b);
  }

  getParams(func, arg) {
    let str = func.toString();
    str = str.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/(.)*/g, '').replace(/{[\s\S]*}/, '').replace(/=>/g, '').trim();
    let start = str.indexOf("(")+1;
    let end = str.length-1;
    let result = str.substring(start, end).split(", ");
    let params = new Object();
    result.forEach((elt,i) => {
      elt = elt.replace(/=[\s\S]*/g, '').trim();
      if (elt.length > 0) {
        params[elt]= arg[i];
      }
    });

    return params;
  }
}

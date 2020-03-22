import { Component } from '@angular/core';
import { AnalyseService } from './_services/analyse.service';
import { GService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'f-covid19';

  constructor(private G: GService) {
    // donne un titre à l'onglet du site
    this.G.setTitle(this.title);
  }
}

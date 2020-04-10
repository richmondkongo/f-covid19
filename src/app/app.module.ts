import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialDesignModule } from './material-design/material-design.module';
import { HttpClientModule } from '@angular/common/http';

import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AcoronaFormFieldComponent } from './acorona-form-field/acorona-form-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AcoronaNavigationComponent } from './acorona-navigation/acorona-navigation.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CoronaQuizComponent } from './corona-quiz/corona-quiz.component';
import { EmergencyLayoutComponent } from './emergency-layout/emergency-layout.component';
import { CoronaLoginComponent } from './corona-login/corona-login.component';
import { AnalyseDetailsComponent } from './analyse-details/analyse-details.component';

const dbConfig = {
  name: 'covid-19',
  version: 1,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'locale_id', autoIncrement: true },
    storeSchema: [
      // { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }, {
    store: 'profil',
    storeConfig: { keyPath: 'locale_id', autoIncrement: true },
    storeSchema: [
      // { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }]
};


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    AcoronaFormFieldComponent,
    AcoronaNavigationComponent,
    PatientsListComponent,
    DoctorsListComponent,
    NavBarComponent,
    CoronaQuizComponent,
    EmergencyLayoutComponent,
    CoronaLoginComponent,
    AnalyseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),

    ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

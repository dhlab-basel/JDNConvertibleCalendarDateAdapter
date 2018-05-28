import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//
// import the material design modules
//
import {AppMaterialModule} from './app-material-module';
import 'hammerjs';

import {AppComponent, HeaderComponent} from './app.component';
import {
  MatJDNConvertibleCalendarDateAdapterModule
} from './modules/jdnconvertiblecalendardateadapter/adapter/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppMaterialModule,
    MatJDNConvertibleCalendarDateAdapterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    HeaderComponent
  ]
})
export class AppModule { }


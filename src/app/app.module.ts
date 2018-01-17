import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//
// import the material design modules
//
import {AppMaterialModule} from './app-material-module';

import { AppComponent } from './app.component';
import {
  MatJDNConvertibleCalendarDateAdapterModule
} from './modules/jdnconvertiblecalendardateadapter/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    MatJDNConvertibleCalendarDateAdapterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


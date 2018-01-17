import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatJDNConvertibleCalendarDateAdapterModule
} from './modules/jdnconvertiblecalendardateadapter/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatJDNConvertibleCalendarDateAdapterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

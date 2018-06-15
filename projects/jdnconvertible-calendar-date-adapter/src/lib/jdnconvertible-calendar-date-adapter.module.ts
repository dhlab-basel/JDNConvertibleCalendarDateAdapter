import {NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {JDNConvertibleCalendarDateAdapter} from './jdnconvertible-calendar-date-adapter';
import {MAT_JDN_DATE_FORMATS} from './jdnconvertible-calendar-date-formats';


@NgModule({
  providers: [
    {provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter, deps: [MAT_DATE_LOCALE]}
  ]
})
export class JDNConvertibleCalendarDateAdapterModule {
}

@NgModule({
  imports: [JDNConvertibleCalendarDateAdapterModule],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MAT_JDN_DATE_FORMATS}],
})
export class MatJDNConvertibleCalendarDateAdapterModule {
}

export {JDNConvertibleCalendarDateAdapter} from './jdnconvertible-calendar-date-adapter';


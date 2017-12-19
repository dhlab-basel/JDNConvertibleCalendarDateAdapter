import { NgModule }     from '@angular/core';
import {JDNConvertibleCalendarDateAdapter} from "./JDNConvertibleCalendarDateAdapter";
import {DateAdapter} from "@angular/material";

@NgModule({
    providers: [
        {provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter/*, deps: [MAT_DATE_LOCALE]*/}
    ]
})
export class JDNConvertibleCalendarDateAdapterModule {}

@NgModule({
    imports: [JDNConvertibleCalendarDateAdapterModule]//,
    //providers: [{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}],
})
export class MatJDNConvertibleCalendarDateAdapterModule {}
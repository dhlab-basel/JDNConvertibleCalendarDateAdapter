import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import {JDNConvertibleCalendarDateAdapter} from "./JDNConvertibleCalendarDateAdapter";
import {DateAdapter} from "@angular/material";

@NgModule({
    imports: [CommonModule],
    providers: [
        {provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter}
    ]
})
export class JDNConvertibleCalendarDateAdapterModule {




}
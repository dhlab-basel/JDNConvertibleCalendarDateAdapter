import {Injectable} from "@angular/core";
import {DateAdapter} from "@angular/material";
import JDNConvertibleCalendar from '../node_modules/jdnconvertiblecalendar/src/JDNConvertibleCalendar'

@Injectable()
export class JDNConvertibleCalendarDateAdapter extends DateAdapter<JDNConvertibleCalendar.JDNConvertibleCalendar> {

    getYear(date: JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.year;
    }

    getMonth(date: JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.month;
    }

    getDate(date: JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.day;
    }

    getDayOfWeek(date: JDNConvertibleCalendar) {
        return date.toCalendarPeriod().periodStart.dayOfWeek;
    }

}
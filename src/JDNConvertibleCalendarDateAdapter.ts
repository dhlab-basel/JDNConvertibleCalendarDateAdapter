import {Injectable} from "@angular/core";
import {DateAdapter} from "@angular/material";
import {JDNConvertibleCalendar, JDNConvertibleConversion} from '../node_modules/jdnconvertiblecalendar/src'

@Injectable()
/**
 * Implements `DateAdapter` for `JDNConvertibleCalendar`.
 *
 * `JDNConvertibleCalendar` supports periods (dates with different precisions), but here only exact days are supported for now.
 */
export class JDNConvertibleCalendarDateAdapter extends DateAdapter<JDNConvertibleCalendar.JDNConvertibleCalendar> {

    getYear(date: JDNConvertibleCalendar.JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.year;
    }

    getMonth(date: JDNConvertibleCalendar.JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.month;
    }

    getDate(date: JDNConvertibleCalendar.JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.day;
    }

    getDayOfWeek(date: JDNConvertibleCalendar.JDNConvertibleCalendar) {
        return date.toCalendarPeriod().periodStart.dayOfWeek;
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        // TODO: implement this properly, taking calendar format and locale into account
        return ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    getDateNames(): string[] {
        // TODO: implement this properly, taking calendar format and locale into account
        let dateNames: string[] = [];
        for (let i = 1; i++; i <= 31) {
            dateNames.push(String(i));
        }

        return dateNames;
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        // TODO: implement this properly, taking calendar format and locale into account
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }

    getYearName(date: JDNConvertibleCalendar.JDNConvertibleCalendar): string {
        return String(date.toCalendarPeriod().periodStart.year);
    }

    getFirstDayOfWeek(): number {
        // TODO: implement this properly, taking calendar format into account
        return 0;
    }

    getNumDaysInMonth(date: JDNConvertibleCalendar.JDNConvertibleCalendar): number {
        const calendarPeriod = date.toCalendarPeriod();

        return date.daysInMonth(calendarPeriod.periodStart);
    }

    clone(date: JDNConvertibleCalendar.JDNConvertibleCalendar): JDNConvertibleCalendar.JDNConvertibleCalendar {
        // TODO: no actual cloning is needed as JDNConvertibleCalendar will not mutate when not explicitly requested
        return date;
    }

    createDate(year: number, month: number, date: number): JDNConvertibleCalendar.JDNConvertibleCalendar {

        // TODO: support different calendar formats
        // assume Gregorian for now

        // month param is 0 indexed, but we use 1 based index for months
        const calDate = new JDNConvertibleCalendar.CalendarDate(year, month+1, date);

        const jdn = JDNConvertibleConversion.gregorianToJDN(calDate);

        return new JDNConvertibleCalendar.GregorianCalendarDate(new JDNConvertibleCalendar.JDNPeriod(jdn, jdn));

    }

    today(): JDNConvertibleCalendar.JDNConvertibleCalendar {

        // get today's date from the native JS Date object
        const today: Date = new Date();

        const year = today.getFullYear();

        // 0 based month
        const month = today.getMonth();

        // day of month, 1 based index
        const day = today.getDate();

        // Gregorian calendar assumed (default)
        return this.createDate(year, month, day);

    }

    parse(value: any, parseFormat: any): JDNConvertibleCalendar.JDNConvertibleCalendar | null {
        // TODO: implement this properly

        return null;
    }

    format(date: JDNConvertibleCalendar.JDNConvertibleCalendar, displayFormat: any): string {
        // TODO: implement this properly

        return '';
    }

    




}
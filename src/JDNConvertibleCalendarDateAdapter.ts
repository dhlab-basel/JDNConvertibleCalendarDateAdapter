import {Injectable} from "@angular/core";
import {DateAdapter} from "@angular/material";
import {JDNConvertibleCalendarModule} from '../node_modules/jdnconvertiblecalendar/src/JDNConvertibleCalendar'
import {JDNConvertibleConversionModule} from '../node_modules/jdnconvertiblecalendar/src/JDNCalendarConversion'


@Injectable()
/**
 * Implements `DateAdapter` for `JDNConvertibleCalendar`.
 *
 * `JDNConvertibleCalendar` supports periods (dates with different precisions), but here only exact days are supported for now.
 */
export class JDNConvertibleCalendarDateAdapter extends DateAdapter<JDNConvertibleCalendarModule.JDNConvertibleCalendar> {

    getYear(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.year;
    }

    getMonth(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): number {
        // return 0 index based month
        return date.toCalendarPeriod().periodStart.month -1;
    }

    getDate(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): number {
        return date.toCalendarPeriod().periodStart.day;
    }

    getDayOfWeek(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar) {
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

    getYearName(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): string {
        return String(date.toCalendarPeriod().periodStart.year);
    }

    getFirstDayOfWeek(): number {
        // TODO: implement this properly, taking calendar format into account
        return 0;
    }

    getNumDaysInMonth(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): number {
        const calendarPeriod = date.toCalendarPeriod();

        return date.daysInMonth(calendarPeriod.periodStart);
    }

    clone(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): JDNConvertibleCalendarModule.JDNConvertibleCalendar {
        // TODO: no actual cloning is needed as JDNConvertibleCalendar will not mutate when not explicitly requested
        return date;
    }

    createDate(year: number, month: number, date: number): JDNConvertibleCalendarModule.JDNConvertibleCalendar {

        // TODO: support different calendar formats
        // assume Gregorian for now

        // month param is 0 indexed, but we use 1 based index for months
        const calDate = new JDNConvertibleCalendarModule.CalendarDate(year, month+1, date);

        const jdn = JDNConvertibleConversionModule.gregorianToJDN(calDate);

        return new JDNConvertibleCalendarModule.GregorianCalendarDate(new JDNConvertibleCalendarModule.JDNPeriod(jdn, jdn));

    }

    today(): JDNConvertibleCalendarModule.JDNConvertibleCalendar {

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

    parse(value: any, parseFormat: any): JDNConvertibleCalendarModule.JDNConvertibleCalendar | null {
        // TODO: implement this properly

        return null;
    }

    format(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar, displayFormat: any): string {
        // TODO: implement this properly

        return '';
    }

    addCalendarYears(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar, years: number): JDNConvertibleCalendarModule.JDNConvertibleCalendar {

        // mutates the object
        date.transposePeriodByYear(years);

        return date;
    }

    addCalendarMonths(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar, months: number): JDNConvertibleCalendarModule.JDNConvertibleCalendar {

        // mutates the object
        date.transposePeriodByMonth(months);

        return date;

    }

    addCalendarDays(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar, days: number): JDNConvertibleCalendarModule.JDNConvertibleCalendar {

        // mutates the object
        date.transposePeriodByDay(days);

        return date;
    }

    toIso8601(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar) {
        // TODO: implement this properly

        return '';

    }


    isDateInstance(obj: any): boolean {
        return (obj instanceof JDNConvertibleCalendarModule.JDNConvertibleCalendar);
    }

    isValid(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar): boolean {
        // TODO: implement this properly

        return true;
    }

    invalid(): JDNConvertibleCalendarModule.JDNConvertibleCalendar {
        // TODO: create an invalid instance? For testing?

        return this.today();
    }



}
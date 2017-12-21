/*
 * Copyright © 2017 Lukas Rosenthaler, Benjamin Geer, Ivan Subotic,
 * Tobias Schweizer, André Kilchenmann, and Sepideh Alassi.
 *
 * This file is part of JDNConvertibleCalendarDateAdapter.
 *
 * JDNConvertibleCalendarDateAdapter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JDNConvertibleCalendarDateAdapter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with JDNConvertibleCalendarDateAdapter.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Injectable} from "@angular/core";
import {DateAdapter} from "@angular/material";
import {JDNConvertibleCalendarModule} from 'jdnconvertiblecalendar/src/JDNConvertibleCalendar'
import {JDNConvertibleConversionModule} from 'jdnconvertiblecalendar/src/JDNCalendarConversion'


@Injectable()
/**
 * Implements `DateAdapter` for `JDNConvertibleCalendar`.
 *
 * `JDNConvertibleCalendar` supports periods (dates with different precisions), but here only exact days are supported for now.
 */
export class JDNConvertibleCalendarDateAdapter extends DateAdapter<JDNConvertibleCalendarModule.JDNConvertibleCalendar> {

    private static readonly DD_MM_YYYY = 'DD-MM-YYYY';

    private static readonly MM_YYYY = 'MM-YYYY';

    private static readonly displayDateFormats = [JDNConvertibleCalendarDateAdapter.DD_MM_YYYY, JDNConvertibleCalendarDateAdapter.MM_YYYY];

    private static readonly parsableDateFormats = [JDNConvertibleCalendarDateAdapter.DD_MM_YYYY];

    private static readonly dateFormatRegexes = {
        'DD-MM-YYYY': /^(\d?\d)-(\d?\d)-(\d{4})/
    };

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
        return ['Jan', 'Feb',  'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    }

    getDateNames(): string[] {
        // TODO: implement this properly, taking calendar format and locale into account
        let dateNames: string[] = [];
        for (let i = 1; i <= 31; i++) {
            dateNames.push(String(i));
        }

        return dateNames;
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        // TODO: implement this properly, taking calendar format and locale into account
        return ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
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

        let date;
        if (parseFormat !== undefined && typeof parseFormat == 'string' && JDNConvertibleCalendarDateAdapter.parsableDateFormats.indexOf(parseFormat) !== -1) {

            switch (parseFormat) {
                case JDNConvertibleCalendarDateAdapter.DD_MM_YYYY: {

                    let dateStringRegex = JDNConvertibleCalendarDateAdapter.dateFormatRegexes[parseFormat];

                    const parsed: Array<any> | null = dateStringRegex.exec(value);

                    if (parsed !== null) {

                        // index 0 is the whole match

                        // month index must be 0 based
                        date = this.createDate(parseInt(parsed[3]), parseInt(parsed[2])-1, parseInt(parsed[1]));
                        break;

                    } else {
                        console.log(`Error: parsing of date string failed: ${value}`);
                        return null;
                    }
                }
                default: {
                    console.log(`Error: supported parsable format was not handled correctly: ${parseFormat}`);
                    return null;
                }
            }


        } else {
            console.log(`Error: unknown parseFormat ${parseFormat}`);
            return null;
        }

        return date;
    }

    format(date: JDNConvertibleCalendarModule.JDNConvertibleCalendar, displayFormat: any): string {
        let dateString = '';
        if (displayFormat !== undefined && typeof displayFormat == 'string' && JDNConvertibleCalendarDateAdapter.displayDateFormats.lastIndexOf(displayFormat) !== -1) {

            const calendarPeriod = date.toCalendarPeriod();

            switch (displayFormat) {

                case JDNConvertibleCalendarDateAdapter.DD_MM_YYYY: {

                    dateString = `${calendarPeriod.periodStart.day}-${calendarPeriod.periodStart.month}-${calendarPeriod.periodStart.year}`;
                    break;

                }

                case JDNConvertibleCalendarDateAdapter.MM_YYYY: {
                    dateString = `${calendarPeriod.periodStart.month}-${calendarPeriod.periodStart.year}`;
                    break;
                }

                default: {
                    console.log(`Error: supported display format was not handled correctly: ${displayFormat}`);
                }

            }

        } else {
            console.log(`Error: unknown displayFormat ${displayFormat}`);
        }

        return dateString;
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

    // deprecated, to be removed
    fromIso8601(iso8601String: string): JDNConvertibleCalendarModule.JDNConvertibleCalendar | null {

        return null;
    }

}
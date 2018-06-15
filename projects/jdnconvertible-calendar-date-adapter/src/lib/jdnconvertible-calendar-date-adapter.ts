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

import {Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material';
import {
  CalendarDate,
  GregorianCalendarDate,
  JDNConvertibleCalendar,
  JDNConvertibleConversionModule,
  JDNPeriod,
  JulianCalendarDate
} from 'jdnconvertiblecalendar';


@Injectable()
/**
 * Implements `DateAdapter` for `JDNConvertibleCalendar`.
 *
 * `JDNConvertibleCalendar` supports periods (dates with different precisions), but here only exact days are supported for now.
 */
export class JDNConvertibleCalendarDateAdapter extends DateAdapter<JDNConvertibleCalendar> {

  private static readonly DD_MM_YYYY = 'DD-MM-YYYY';

  private static readonly MM_YYYY = 'MM-YYYY';

  private static readonly displayDateFormats = [JDNConvertibleCalendarDateAdapter.DD_MM_YYYY, JDNConvertibleCalendarDateAdapter.MM_YYYY];

  private static readonly parsableDateFormats = [JDNConvertibleCalendarDateAdapter.DD_MM_YYYY];

  private static readonly dateFormatRegexes = {
    'DD-MM-YYYY': new RegExp('^(\\d?\\d)-(\\d?\\d)-(\\d{4})')
  };

  // the currently active calendar format
  private _activeCalendarFormat = 'Gregorian';

  get activeCalendarFormat() {
    return this._activeCalendarFormat;
  }

  /**
   * Adds leading zeros to a given number and returns the resulting string.
   *
   * @param num the given number.
   * @param digits the number of expected digits.
   * @returns string containing leading zeros.
   */
  private static addLeadingZeroToNumber(num: number, digits: number): string {

    const missingDigits = digits - String(num).length;

    if (missingDigits > 0) {
      let leadingZeros = '';
      for (let i = 0; i < missingDigits; i++) {
        leadingZeros += '0';
      }

      return `${leadingZeros}${num}`;

    } else {
      return String(num);
    }

  }

  /**
   * Converts the given date to the indicated calendar format.
   *
   * @param date the date to be converted.
   * @param format the calendar format to convert to.
   * @returns converted date.
   */
  convertCalendarFormat(date: JDNConvertibleCalendar, format: string): JDNConvertibleCalendar {

    // another instance has to be returned, otherwise "activeDate" set method is not triggered for MatYearView

    const dateMod = this.clone(date);

    switch (format) {
      case 'Gregorian':
        this._activeCalendarFormat = 'Gregorian';
        return dateMod.convertCalendar('Gregorian');

      case 'Julian':
        this._activeCalendarFormat = 'Julian';
        return dateMod.convertCalendar('Julian');

      default:
        // invalid format
        return dateMod;
    }
  }

  getYear(date: JDNConvertibleCalendar): number {
    return date.toCalendarPeriod().periodStart.year;
  }

  getMonth(date: JDNConvertibleCalendar): number {
    // return 0 index based month
    return date.toCalendarPeriod().periodStart.month - 1;
  }

  getDate(date: JDNConvertibleCalendar): number {
    return date.toCalendarPeriod().periodStart.day;
  }

  getDayOfWeek(date: JDNConvertibleCalendar): number {

    // dayOfWeek is an optional class member, but always set when returned by this method
    const dayOfWeek: number | undefined = date.toCalendarPeriod().periodStart.dayOfWeek;

    if (dayOfWeek !== undefined) {
      return dayOfWeek;
    } else {
      throw new Error('day of week is not set although it should be');
    }

  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // TODO: implement this properly, taking calendar format and locale into account
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  }

  getDateNames(): string[] {
    // TODO: implement this properly, taking calendar format and locale into account
    const dateNames: string[] = [];
    for (let i = 1; i <= 31; i++) {
      dateNames.push(String(i));
    }

    return dateNames;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    // TODO: implement this properly, taking calendar format and locale into account
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  }

  getYearName(date: JDNConvertibleCalendar): string {
    return String(date.toCalendarPeriod().periodStart.year);
  }

  getFirstDayOfWeek(): number {
    // TODO: implement this properly, taking calendar format into account
    return 0;
  }

  getNumDaysInMonth(date: JDNConvertibleCalendar): number {
    const calendarPeriod = date.toCalendarPeriod();

    return date.daysInMonth(calendarPeriod.periodStart);
  }

  clone(date: JDNConvertibleCalendar): JDNConvertibleCalendar {

    const jdnPeriod = date.toJDNPeriod();

    switch (this._activeCalendarFormat) {
      case 'Gregorian':
        return new GregorianCalendarDate(jdnPeriod);

      case 'Julian':
        return new JulianCalendarDate(jdnPeriod);
    }

  }

  /**
   * Creates a date in the specified calendar format.
   *
   * @param year the date's year.
   * @param month the date's month (0-based index).
   * @param date the date's day.
   * @param calendar the calendar format to be used.
   * @returns a date in the specified calendar format.
   */
  private createCalendarDate(year: number, month: number, date: number, calendar: string): JDNConvertibleCalendar {
    // month param is 0 indexed, but we use 1 based index for months
    const calDate = new CalendarDate(year, month + 1, date);

    let jdn;

    switch (calendar) {
      case 'Gregorian':
        jdn = JDNConvertibleConversionModule.gregorianToJDN(calDate);
        return new GregorianCalendarDate(new JDNPeriod(jdn, jdn));

      case 'Julian':
        jdn = JDNConvertibleConversionModule.julianToJDN(calDate);
        return new JulianCalendarDate(new JDNPeriod(jdn, jdn));
    }
  }

  createDate(year: number, month: number, date: number): JDNConvertibleCalendar {

    // create a date in the active calendar format
    return this.createCalendarDate(year, month, date, this._activeCalendarFormat);

  }

  today(): JDNConvertibleCalendar {

    // get today's date from the native JS Date object
    const today: Date = new Date();

    const year = today.getFullYear();

    // 0 based month
    const month = today.getMonth();

    // day of month, 1 based index
    const day = today.getDate();

    // create a Gregorian calendar date from the native JS object
    const dateGregorian = this.createCalendarDate(year, month, day, 'Gregorian');

    // convert the date to the active calendar format
    const date = this.convertCalendarFormat(dateGregorian, this._activeCalendarFormat);

    return date;

  }

  parse(value: any, parseFormat: any): JDNConvertibleCalendar | null {

    let date;
    if (parseFormat !== undefined && typeof parseFormat === 'string' && JDNConvertibleCalendarDateAdapter.parsableDateFormats.indexOf(parseFormat) !== -1) {

      switch (parseFormat) {
        case JDNConvertibleCalendarDateAdapter.DD_MM_YYYY: {

          const dateStringRegex = JDNConvertibleCalendarDateAdapter.dateFormatRegexes[parseFormat];

          const parsed: Array<any> | null = dateStringRegex.exec(value);

          if (parsed !== null) {

            // index 0 is the whole match

            // month index must be 0 based
            date = this.createDate(parseInt(parsed[3]), parseInt(parsed[2]) - 1, parseInt(parsed[1]));
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

  format(date: JDNConvertibleCalendar, displayFormat: any): string {
    let dateString = '';
    if (displayFormat !== undefined && typeof displayFormat === 'string' && JDNConvertibleCalendarDateAdapter.displayDateFormats.lastIndexOf(displayFormat) !== -1) {

      const calendarPeriod = date.toCalendarPeriod();

      switch (displayFormat) {

        case JDNConvertibleCalendarDateAdapter.DD_MM_YYYY: {

          dateString =
            `${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(calendarPeriod.periodStart.day, 2)}-${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(calendarPeriod.periodStart.month, 2)}-${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(calendarPeriod.periodStart.year, 4)}`;
          break;

        }

        case JDNConvertibleCalendarDateAdapter.MM_YYYY: {
          dateString = `${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(calendarPeriod.periodStart.month, 2)}-${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(calendarPeriod.periodStart.year, 4)}`;
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

  addCalendarYears(date: JDNConvertibleCalendar, years: number): JDNConvertibleCalendar {

    // another instance has to be returned, otherwise "activeDate" set method is not triggered for MatYearView

    const dateMod = this.clone(date);

    dateMod.transposePeriodByYear(years);

    return dateMod;

  }

  addCalendarMonths(date: JDNConvertibleCalendar, months: number): JDNConvertibleCalendar {

    // another instance has to be returned, otherwise "activeDate" set method is not triggered for MatMonthView

    const dateMod = this.clone(date);

    dateMod.transposePeriodByMonth(months);

    return dateMod;
  }

  addCalendarDays(date: JDNConvertibleCalendar, days: number): JDNConvertibleCalendar {

    // another instance has to be returned, otherwise events do not work correctly

    const dateMod = this.clone(date);

    dateMod.transposePeriodByDay(days);

    return dateMod;
  }

  toIso8601(date: JDNConvertibleCalendar) {

    // use Gregorian
    const gregorianCal = date.convertCalendar('Gregorian');

    const gregorianCalPeriod = gregorianCal.toCalendarPeriod();

    console.log('to iso');

    return `${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(gregorianCalPeriod.periodStart.year, 4)}-${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(gregorianCalPeriod.periodStart.month, 2)}-${JDNConvertibleCalendarDateAdapter.addLeadingZeroToNumber(gregorianCalPeriod.periodStart.day, 2)}`;

  }


  isDateInstance(obj: any): boolean {
    return (obj instanceof JDNConvertibleCalendar);
  }

  isValid(date: JDNConvertibleCalendar): boolean {
    // TODO: implement this properly

    return true;
  }

  invalid(): JDNConvertibleCalendar {
    // TODO: create an invalid instance? For testing?

    return this.today();
  }


}

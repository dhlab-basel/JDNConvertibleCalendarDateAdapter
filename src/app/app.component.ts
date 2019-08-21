import {Component, Directive, Host, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatCalendar, MatDatepickerContent } from '@angular/material/datepicker';
import {CalendarDate, CalendarPeriod, GregorianCalendarDate, JDNConvertibleCalendar, JulianCalendarDate, IslamicCalendarDate} from 'jdnconvertiblecalendar';
import {JDNConvertibleCalendarDateAdapter} from 'jdnconvertible-calendar-date-adapter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;

  headerComponent = HeaderComponent;

  // October 13 1729 (Julian calendar)
  startCalDate = new CalendarDate(1729, 10, 13);
  startDate = new JulianCalendarDate(new CalendarPeriod(this.startCalDate, this.startCalDate));

  // October 24 1729 (Julian calendar)
  startCalDate2 = new CalendarDate(1729, 10, 24);
  startDate2 = new GregorianCalendarDate(new CalendarPeriod(this.startCalDate2, this.startCalDate2));

  // October 24 1729 (Islamic calendar)
  startCalDate3 = new CalendarDate(1142, 4, 1);
  startDate3 = new IslamicCalendarDate(new CalendarPeriod(this.startCalDate3, this.startCalDate3));

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    this.form = this.fb.group({
      dateValue: [this.startDate, Validators.compose([Validators.required])]
    });

    this.form.valueChanges.subscribe((data) => {
      console.log(data.dateValue);
    });

    this.form2 = this.fb.group({
      dateValue2: [this.startDate2, Validators.compose([Validators.required])]
    });

    this.form2.valueChanges.subscribe((data) => {
      console.log(data.dateValue2);
    });

    this.form3 = this.fb.group({
      dateValue3: [this.startDate3, Validators.compose([Validators.required])]
    });

    this.form3.valueChanges.subscribe((data) => {
      console.log(data.dateValue3);
    });

  }
}

@Component({
  selector: 'app-calendar-header',
  template: `
    <mat-select placeholder="Calendar Format" [formControl]="form.controls['calendar']">
      <mat-option *ngFor="let cal of supportedCalendars" [value]="cal">{{cal}}</mat-option>
    </mat-select>
    <mat-calendar-header></mat-calendar-header>
  `,
  styleUrls: []
})
export class HeaderComponent<D> implements OnInit {
  constructor(@Host() private _calendar: MatCalendar<JDNConvertibleCalendar>,
              private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
              private _datepickerContent: MatDatepickerContent<JDNConvertibleCalendar>,
              @Inject(FormBuilder) private fb: FormBuilder) {
  }

  form: FormGroup;

  supportedCalendars = JDNConvertibleCalendar.supportedCalendars;

  ngOnInit() {

    // get the active date's calendar format
    let activeCalendar: 'Gregorian' | 'Julian' | 'Islamic';

    switch (this._calendar.activeDate.calendarName) {

      case 'Gregorian': {
        activeCalendar = 'Gregorian';
        break;
      }

      case 'Julian': {
        activeCalendar = 'Julian';
        break;
      }

      case 'Islamic': {
        activeCalendar = 'Islamic';
        break;
      }

    }

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      // set the calendar the active date uses (Gregorian or Julian)
      if (this._dateAdapter.activeCalendar !== activeCalendar) {
        this._dateAdapter.activeCalendar = activeCalendar;
      }

    }

    // build a form for the calendar selection
    this.form = this.fb.group({
      calendar: [activeCalendar, Validators.required]
    });

    // update the selected calendar
    this.form.valueChanges.subscribe((data) => {
      this.convertCalendar(data.calendar);
    });

  }

  /**
   * Converts the date in the current format into the target format.
   *
   * @param {"Gregorian" | "Julian"} calendar the target calendar format.
   */
  convertCalendar(calendar: 'Gregorian' | 'Julian' | 'Islamic') {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      const convertedDate = this._dateAdapter.convertCalendar(this._calendar.activeDate, calendar);

      this._calendar.activeDate = convertedDate;

      this._datepickerContent.datepicker.select(convertedDate);

      this._calendar.updateTodaysDate();

    }
  }
}

@Directive({
  selector: 'jdn-datepicker',
  providers: [
    { provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter, deps: [MAT_DATE_LOCALE] }
  ]
})
export class JdnDatepicker {
  constructor(private adapter: DateAdapter<JDNConvertibleCalendar>) {
  }
}


import {Component, Host, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatCalendar, MatDatepickerContent} from '@angular/material';
import {CalendarDate, JDNConvertibleCalendar, JDNPeriod, JulianCalendarDate} from 'jdnconvertiblecalendar';
import {JDNConvertibleCalendarDateAdapter} from 'jdnconvertible-calendar-date-adapter';
import {JDNConvertibleCalendarModule} from "jdnconvertiblecalendar/dist/src/JDNConvertibleCalendar";
import CalendarPeriod = JDNConvertibleCalendarModule.CalendarPeriod;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;

  headerComponent = HeaderComponent;

  // October 13 1729 (Gregorian calendar)
  startCalDate = new CalendarDate(1729, 10, 13);
  startDate = new JulianCalendarDate(new CalendarPeriod(this.startCalDate, this.startCalDate));

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    this.form = this.fb.group({
      dateValue: [this.startDate, Validators.compose([Validators.required])]
    });

    this.form.valueChanges.subscribe((data) => {
      console.log(data.dateValue);
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
    const activeCalendar: 'Gregorian' | 'Julian' = this._calendar.activeDate.calendarName === 'Gregorian' ? 'Gregorian' : 'Julian';

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      // set the calendar the active date uses (Gregorian or Julian)
      if (this._dateAdapter.activeCalendar !== activeCalendar) {
        this._dateAdapter.activeCalendar = activeCalendar;
      }
    }

    // build a form for the calendar format selection
    this.form = this.fb.group({
      calendar: [activeCalendar, Validators.required]
    });

    // update the selected calendar
    this.form.valueChanges.subscribe((data) => {
      this.convertCalendarDate(data.calendar);
    });

  }

  /**
   * Converts the date in the current format into the target format.
   *
   * @param {"Gregorian" | "Julian"} calendar the target calendar format.
   */
  convertCalendarDate(calendar: 'Gregorian' | 'Julian') {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);

      this._calendar.activeDate = convertedDate;

      this._datepickerContent.datepicker.select(convertedDate);

      this._calendar.updateTodaysDate();
    }
  }
}


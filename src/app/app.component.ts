import {Component, Host, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatCalendar} from '@angular/material';
import {JDNConvertibleCalendar} from 'jdnconvertiblecalendar';
import {JDNConvertibleCalendarDateAdapter} from './modules/jdnconvertiblecalendardateadapter/adapter/JDNConvertibleCalendarDateAdapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;

  headerComponent = HeaderComponent;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {

    this.form = this.fb.group({
      dateValue: [null, Validators.compose([Validators.required])]
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
      <mat-option *ngFor="let cal of supportedCalendarFormats" [value]="cal">{{cal}}</mat-option>
    </mat-select>
    <mat-calendar-header></mat-calendar-header>
  `,
  styleUrls: []
})
export class HeaderComponent<D> implements OnInit {
  constructor(@Host() private _calendar: MatCalendar<JDNConvertibleCalendar>,
              private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
              @Inject(FormBuilder) private fb: FormBuilder) {
  }

  form: FormGroup;

  supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;

  activeFormat;

  ngOnInit() {

    this.activeFormat = 'Gregorian';

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.activeFormat = this._dateAdapter.activeCalendarFormat;
    }

    // build a form for the calendar format selection
    this.form = this.fb.group({
      calendar: [this.activeFormat, Validators.required]
    });

    // update the selected calendar format
    this.form.valueChanges.subscribe((data) => {
      this.convertCalendar(data.calendar);
    });

  }

  /**
   * Converts the date in the current format into the target format.
   *
   * @param {"Gregorian" | "Julian"} calendar the target calendar format.
   */
  convertCalendar(calendar: 'Gregorian' | 'Julian') {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);

      this._calendar.activeDate = convertedDate;

      // update the calendar UI after date format conversion
      // TODO: today's date is not reset correctly
      this._calendar.ngAfterContentInit();

      this._calendar._dateSelected(convertedDate);
    }
  }
}



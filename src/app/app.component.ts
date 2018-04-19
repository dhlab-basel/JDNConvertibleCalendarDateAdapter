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
    <mat-form-field>
      <mat-select placeholder="Calendar Format" [formControl]="form.controls['calendar']">
        <mat-option *ngFor="let cal of supportedCalendarFormats" [value]="cal">{{cal}}</mat-option>
      </mat-select>
    </mat-form-field>
    <div class="custom-header">
      <button mat-icon-button (click)="previousClicked('year')">&lt;&lt;</button>
      <button mat-icon-button (click)="previousClicked('month')">&lt;</button>
      <span class="custom-header-label">{{periodLabel}}</span>
      <button mat-icon-button (click)="nextClicked('month')">&gt;</button>
      <button mat-icon-button (click)="nextClicked('year')">&gt;&gt;</button>
    </div>
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

  convertCalendar(calendar: 'Gregorian' | 'Julian') {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);

      this._calendar.activeDate = convertedDate;

      this._calendar._dateSelected(convertedDate);

      const view: 'month' | 'year' | 'multi-year' = this._calendar.currentView;

      this._calendar._goToDateInView(convertedDate, view);
    }
  }

  get periodLabel() {
    const year = this._dateAdapter.getYearName(this._calendar.activeDate);
    const month = (this._dateAdapter.getMonth(this._calendar.activeDate) + 1);
    return `${month}/${year}`;
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

}



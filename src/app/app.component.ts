import {Component, Host, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MatCalendar} from '@angular/material';
import {JDNConvertibleCalendar, GregorianCalendarDate, JDNPeriod, JulianCalendarDate} from 'jdnconvertiblecalendar';
import {JDNConvertibleCalendarDateAdapter} from 'jdnconvertible-calendar-date-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;

  headerComponent = HeaderComponent;

  private jdn = 2352861; // October 24th 1729 (Gregorian calendar)
  startDate = new JulianCalendarDate(new JDNPeriod(this.jdn, this.jdn));

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

  ngOnInit() {

    console.log('init header');

    // get the active date's calendar format
    const activeCalendarFormat: 'Gregorian' | 'Julian' = this._calendar.activeDate.calendarFormat === 'Gregorian' ? 'Gregorian' : 'Julian';

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      // set the active date's calendar format if not set correctly
      // TODO: this is necessary if the start date is not Gregorian
      // TODO: the format should not be set from the outside, only the data adapter should control
      if (this._dateAdapter.activeCalendarFormat !== activeCalendarFormat) {
        this._dateAdapter.activeCalendarFormat = activeCalendarFormat;
      }
    }

    console.log(activeCalendarFormat);

    // build a form for the calendar format selection
    this.form = this.fb.group({
      calendar: [activeCalendarFormat, Validators.required]
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

      this._calendar._dateSelected(convertedDate);

      // update view after calendar format conversion
      const view = this._calendar.currentView === 'month' ? this._calendar.monthView :
        (this._calendar.currentView === 'year' ? this._calendar.yearView : this._calendar.multiYearView);

      view.ngAfterContentInit();
    }
  }
}


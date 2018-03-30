import {Component, Host, Inject} from '@angular/core';
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
    <select (change)="convertCalendar($event.target.value)">
      <option>Gregorian</option>
      <option>Julian</option>
    </select>
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
export class HeaderComponent<D> {
  constructor(@Host() private _calendar: MatCalendar<JDNConvertibleCalendar>,
              private _dateAdapter: DateAdapter<JDNConvertibleCalendar>) {
  }

  convertCalendar(calendar: 'Gregorian' | 'Julian') {

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {

      const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);

      this._calendar.activeDate = convertedDate;

      this._calendar._dateSelected(convertedDate);
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



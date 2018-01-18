import {JDNConvertibleCalendarDateAdapter} from './JDNConvertibleCalendarDateAdapter';
import {JDNConvertibleCalendarModule} from 'jdnconvertiblecalendar/dist/JDNConvertibleCalendar';
import JDNConvertibleCalendar = JDNConvertibleCalendarModule.JDNConvertibleCalendar;
import {JDNConvertibleCalendarDateAdapterModule} from './index';
import {async, inject, TestBed} from '@angular/core/testing';
import {DateAdapter} from '@angular/material';
import GregorianCalendarDate = JDNConvertibleCalendarModule.GregorianCalendarDate;
import JDNPeriod = JDNConvertibleCalendarModule.JDNPeriod;
import CalendarDate = JDNConvertibleCalendarModule.CalendarDate;


describe('JDNConvertibleCalendarDateAdapter', () => {
  let adapter: JDNConvertibleCalendarDateAdapter;
  let assertValidDate: (d: JDNConvertibleCalendar | null, valid: boolean) => void;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JDNConvertibleCalendarDateAdapterModule]
    }).compileComponents();
  }));

  beforeEach(inject([DateAdapter], (dateAdapter: JDNConvertibleCalendarDateAdapter) => {
    adapter = dateAdapter;

    assertValidDate = (d: JDNConvertibleCalendar | null, valid: boolean) => {
      expect(adapter.isDateInstance(d)).not.toBeNull(`Expected ${d} to be a date instance`);
      expect(adapter.isValid(d!)).toBe(valid,
        `Expected ${d} to be ${valid ? 'valid' : 'invalid'},` +
        ` but was ${valid ? 'invalid' : 'valid'}`);
    };
  }));

  it('should get year', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.getYear(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)))).toBe(2017);
  });

  it('should get month', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.getMonth(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)))).toBe(0);
  });

  it('should get date', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.getDate(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)))).toBe(1);
  });

  it('should get day of week', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.getDayOfWeek(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)))).toBe(0);
  });

  it('should get long month names', () => {
    expect(adapter.getMonthNames('long')).toEqual(['Jan', 'Feb',  'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
  });

  it('should get date names', () => {
    expect(adapter.getDateNames()).toEqual([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ]);
  });

  it('should get long day of week names', () => {
    expect(adapter.getDayOfWeekNames('long')).toEqual(['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']);
  });

  it('should get year name', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.getYearName(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)))).toBe('2017');
  });

  it('should get first day of week', () => {
    expect(adapter.getFirstDayOfWeek()).toBe(0);
  });

  it('should create a GregorianCalendarDate', () => {
    expect(adapter.createDate(2017, 0, 1).toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 1, 1, 0));
  });

  it('should parse string according to given format', () => {
    // January 2 2017
    const jdn = 2457756;

    expect(adapter.parse('02-01-2017', 'DD-MM-YYYY')).toEqual(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)));

  });

  it('should add years', () => {
    // January 1 2017
    const jdn = 2457755;

    expect(adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), 1))
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)));

    expect(adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), -1))
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn - 366, jdn - 366))); // leap year

  });


});

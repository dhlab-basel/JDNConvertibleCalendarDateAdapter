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
    expect(adapter.getMonthNames('long')).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
  });

  it('should get date names', () => {
    expect(adapter.getDateNames()).toEqual([
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ]);
  });

  it('should get long day of week names', () => {
    expect(adapter.getDayOfWeekNames('long')).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']);
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

    const future = adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), 1);

    expect(future)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)));

    expect(future.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2018, 1, 1, 1));

    const past = adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), -1);

    expect(past)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn - 366, jdn - 366))); // leap year

    expect(past.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2016, 1, 1, 5));

  });

  it('should respect leap years when adding years', () => {
    // February 29 2016
    const jdn = 2457448;

    const future = adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), 1);

    expect(future)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)));

    expect(future.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 2, 28, 2));

    const past = adapter.addCalendarYears(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), -1);

    expect(past)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn - 366, jdn - 366)));

    expect(past.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2015, 2, 28, 6));
  });

  it('should add months', () => {
    // January 1 2017
    const jdn = 2457755;

    const future = adapter.addCalendarMonths(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), 1);

    expect(future)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 31, jdn + 31)));

    expect(future.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 2, 1, 3));

    const past = adapter.addCalendarMonths(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), -1);

    expect(past)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn - 31, jdn - 31)));

    expect(past.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2016, 12, 1, 4));

  });

  it('should respect month length differences when adding months', () => {
    // January 31 2017
    const jdn1 = 2457785;

    const future = adapter.addCalendarMonths(new GregorianCalendarDate(new JDNPeriod(jdn1, jdn1)), 1);

    expect(future)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn1 + 28, jdn1 + 28)));

    expect(future.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 2, 28, 2));

    // March 31 2017
    const jdn2 = 2457844;

    const past = adapter.addCalendarMonths(new GregorianCalendarDate(new JDNPeriod(jdn2, jdn2)), -1);

    expect(past)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn2 - 31, jdn2 - 31)));

    expect(past.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 2, 28, 2));

  });

  it('should add days', () => {

    // January 1 2017
    const jdn = 2457755;

    const future = adapter.addCalendarDays(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), 1);

    expect(future)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 1, jdn + 1)));

    expect(future.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2017, 1, 2, 1));

    const past = adapter.addCalendarDays(new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), -1);

    expect(past)
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn - 1, jdn - 1)));

    expect(past.toCalendarPeriod().periodStart).toEqual(new CalendarDate(2016, 12, 31, 6));
  });

  it('should compare dates', () => {
    // January 1 2017
    const jdn = 2457755;

    const january1st2017 = new GregorianCalendarDate(new JDNPeriod(jdn, jdn));
    const january2nd2017 = new GregorianCalendarDate(new JDNPeriod(jdn + 1, jdn + 1));

    const february1st2017 = new GregorianCalendarDate(new JDNPeriod(jdn + 31, jdn + 31));

    const january1st2018 = new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365));

    expect(adapter.compareDate(january1st2017, january2nd2017)).toBeLessThan(0);

    expect(adapter.compareDate(january1st2017, february1st2017)).toBeLessThan(0);

    expect(adapter.compareDate(january1st2017, january1st2018)).toBeLessThan(0);

    expect(adapter.compareDate(january1st2017, january1st2017)).toBe(0);

    expect(adapter.compareDate(january1st2018, january1st2017)).toBeGreaterThan(0);

    expect(adapter.compareDate(february1st2017, january1st2017)).toBeGreaterThan(0);

    expect(adapter.compareDate(january2nd2017, january1st2017)).toBeGreaterThan(0);
  });

  it('should clamp date at lower bound', () => {
    // January 1 2017
    const jdn = 2457755;

    // Given date January 1 2017, min: January 1 2018, max: January 1 2018
    expect(adapter.clampDate(
      new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)), new GregorianCalendarDate(new JDNPeriod(jdn + (365 * 2), jdn + (365 * 2)))))
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)));

  });

  it('should clamp date at upper bound', () => {
    // January 1 2018
    const jdn = 2458120;

    // Given date January 1 2020, min: January 1 2018, max: January 1 2019
    expect(adapter.clampDate(
      new GregorianCalendarDate(new JDNPeriod(jdn + (2 * 365), jdn + (2 * 365))), new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365))))
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365)));
  });

  it('should clamp date already within bounds', () => {
    // January 1 2018
    const jdn = 2458120;

    // Given date February 2018, min: January 1 2018, max: January 1 2019
    expect(adapter.clampDate(
      new GregorianCalendarDate(new JDNPeriod(jdn + 31, jdn + 31)), new GregorianCalendarDate(new JDNPeriod(jdn, jdn)), new GregorianCalendarDate(new JDNPeriod(jdn + 365, jdn + 365))))
      .toEqual(new GregorianCalendarDate(new JDNPeriod(jdn + 31, jdn + 31)));
  });

  it('should create valid dates from valid ISO strings', () => {
    assertValidDate(adapter.deserialize('1985-04-12T23:20:50.52Z'), true);

  });

});

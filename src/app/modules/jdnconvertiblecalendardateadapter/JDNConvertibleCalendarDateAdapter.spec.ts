import {JDNConvertibleCalendarDateAdapter} from './JDNConvertibleCalendarDateAdapter';
import {JDNConvertibleCalendarModule} from 'jdnconvertiblecalendar/dist/JDNConvertibleCalendar';
import JDNConvertibleCalendar = JDNConvertibleCalendarModule.JDNConvertibleCalendar;
import {JDNConvertibleCalendarDateAdapterModule} from './index';
import {async, inject, TestBed} from '@angular/core/testing';
import {DateAdapter} from '@angular/material';
import GregorianCalendarDate = JDNConvertibleCalendarModule.GregorianCalendarDate;
import JDNPeriod = JDNConvertibleCalendarModule.JDNPeriod;


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

});

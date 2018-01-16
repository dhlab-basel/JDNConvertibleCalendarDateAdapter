import {async, inject, TestBed} from '@angular/core/testing';
import {JDNConvertibleCalendarDateAdapter} from "./JDNConvertibleCalendarDateAdapter";
import {JDNConvertibleCalendar, GregorianCalendarDate, JDNPeriod} from 'jdnconvertiblecalendar';
import {DateAdapter, DEC, FEB, JAN, MAR, MAT_DATE_LOCALE} from '@angular/material/core';

import {} from 'jasmine';
import {JDNConvertibleCalendarDateAdapterModule} from "./index";

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

});
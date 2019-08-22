import {InjectionToken} from '@angular/core';

export const ACTIVE_CALENDAR = new InjectionToken<'Gregorian' | 'Julian' | 'Islamic'>('Active Calendar');

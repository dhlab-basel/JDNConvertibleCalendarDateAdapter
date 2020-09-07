# JDNConvertibleCalendarDateAdapter

## Introduction

`JDNConvertibleCalendarDateAdapter` provides an implementation of the Angular Material `DateAdapter` 
(<https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings>) for `JDNConvertibleCalendar` (<https://www.npmjs.com/package/jdnconvertiblecalendar>), 
so that the Angular Material DatePicker UI can be used with different calendar formats.

## NPM Package

`JDNConvertibleCalendarDateAdapter` is available as an npm module: <https://www.npmjs.com/package/jdnconvertiblecalendardateadapter>.

## Use with Angular Material Datepicker

Add `jdnconvertiblecalendardateadapter` and `jdnconvertiblecalendar` to the dependencies in your `package.json` and run `npm install`. 
Add `MatJDNConvertibleCalendarDateAdapterModule` to your application's module configuration. See <https://github.com/dhlab-basel/JDNConvertibleCalendarDateAdapter/blob/develop/src/app/app.module.ts> as an example. 

See also <https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings> for instructions how to integrate it with Angular Material 2.

## Angular Version

This module works with Angular 10 and Angular Material 10 (see `projects/jdnconvertible-calendar-date-adapter/package.json`). 

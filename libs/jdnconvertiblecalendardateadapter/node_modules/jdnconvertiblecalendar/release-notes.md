# Release Notes

## Releases

- v0.0.1: initial version with conversion formulae from fourmilab.ch

- v0.0.2: conversion formulae rewritten (consistent handling of year 0), added more extensive tests ([#4](https://github.com/dhlab-basel/JDNConvertibleCalendar/pull/4))

- v0.0.3: provide alternative constructor signature to create a date from a calendar period ([#6](https://github.com/dhlab-basel/JDNConvertibleCalendar/pull/6))

- v0.0.4: provide implementation for the Islamic calendar ([#10](https://github.com/dhlab-basel/JDNConvertibleCalendar/pull/10))

- v0.0.5: provide names for weekdays and months

- v0.0.6: change build options ([#23](https://github.com/dhlab-basel/JDNConvertibleCalendar/pull/23))

- v0.0.7 fix problem in calculating JDN for Gregorian calendar dates ([#30](https://github.com/dhlab-basel/JDNConvertibleCalendar/pull/30))

## Publish to npm

From the project root, run `npm publish --dry-run`.
If everything looks good, omit the dry run flag.

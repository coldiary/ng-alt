# NgAlt
![Build](https://travis-ci.org/coldiary/ng-alt.svg?branch=master)

An Angular directive used the same way as [@NgSwitch](https://angular.io/api/common/NgSwitch) except that it only renders the first truthy directive in the group :

```html
<div ngAltGroup>
  <span *ngAlt="false">A</span>
  <span *ngAlt="true">B</span>
  <span *ngAlt="true">C</span>
</div>
```

This will render :
```html
<div>
  <span>B</span>
</div>
```

Exemple with form errors:
```html
  <mat-input-container>
    <input matInput formControlName="password">
    <mat-error ngAltGroup>
      <span *ngAlt="form.controls.email.hasError('required')">Must not be empty</span>
      <span *ngAlt="form.controls.email.hasError('minLength')" translate>Must be at least 8 chars long</span>
      <span *ngAlt="form.controls.email.hasError('invalid')" translate>Must be contain symbols, digits and mixed upper and lower cased letters</span>
    </mat-error>
  </mat-input-container>
```

This will render the first truthy error only in order of appearance.

## Installation

```sh
  npm install --save ng-alt

  # or

  yarn add ng-alt
```

## Usage

Import the module in any Angular module you want to use the directive :

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgAltModule } from 'ng-alt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAltModule, // <--- add the module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use it as above :
- Wrap all alternatives in an element with the `[ngAltGroup]` directive.
- Add the `[ngAlt]` directive to every element to be conditionally rendered (**order matters**).

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run packagr` to package the module into the `dist/` folder.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Copyright

This project is covered by an MIT license. Refer to the LICENSE file.


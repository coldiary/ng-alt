import { NgModule } from '@angular/core';
import { NgAltDirective, NgAltGroupDirective } from './ng-alt.directive';

@NgModule({
  declarations: [ NgAltGroupDirective, NgAltDirective ],
  exports: [ NgAltGroupDirective, NgAltDirective ]
})
export class NgAltModule { }

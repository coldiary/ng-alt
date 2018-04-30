import { Directive, Input, TemplateRef, ViewContainerRef, Host } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

export interface ViewState {
  view: NgAltDirective;
  cond: boolean;
}

@Directive({ selector: '[ngAltGroup]' })
export class NgAltGroupDirective {
  _state: ViewState[] = []
  state: Subject<ViewState[]> = new Subject();

  addAlternative(view: NgAltDirective) {
    this._state = [ ...this._state, { view, cond: false } ];
    this.enforceState();
  }

  updateAlternative(view: NgAltDirective) {
    const index = this._state.findIndex(alt => alt.view === view);
    if (index === -1) return;
    this._state = Object.assign([], this._state, { [index]: { view, cond: false } });
    this.enforceState();
  }

  enforceState() {
    this._state = this._state.map(alt => ({ ...alt, cond: false }));
    const index = this._state.findIndex(alt => alt.view.cond);
    if (index !== -1) this._state[index].cond = true;
    this.state.next(this._state);
  }

}

@Directive({ selector: '[ngAlt]' })
export class NgAltDirective {
  cond = false;
  hasView = false;
  sub: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Host() private ngAltGroup: NgAltGroupDirective,
  ) {}

  ngOnInit() {
    this.ngAltGroup.addAlternative(this);
    this.sub = this.ngAltGroup.state
      .filter(states => states.some(state => state.view === this))
      .flatMap(states => Observable.of(states.filter(state => state.view === this)[0]))
      .subscribe(state => this.updateState(state));
  }

  updateState(state: ViewState) {
    if (state.cond && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!state.cond && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  @Input() set ngAlt(cond: boolean) {
    this.cond = cond;
    this.ngAltGroup.updateAlternative(this);
  }
}

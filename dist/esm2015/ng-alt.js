import { Directive, Input, TemplateRef, ViewContainerRef, Host, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class NgAltGroupDirective {
    constructor() {
        this._state = [];
        this.state = new Subject();
    }
    /**
     * @param {?} view
     * @return {?}
     */
    addAlternative(view) {
        this._state = [...this._state, { view, cond: false }];
        this.enforceState();
    }
    /**
     * @param {?} view
     * @return {?}
     */
    updateAlternative(view) {
        const /** @type {?} */ index = this._state.findIndex(alt => alt.view === view);
        if (index === -1)
            return;
        this._state = Object.assign([], this._state, { [index]: { view, cond: false } });
        this.enforceState();
    }
    /**
     * @return {?}
     */
    enforceState() {
        this._state = this._state.map(alt => (Object.assign({}, alt, { cond: false })));
        const /** @type {?} */ index = this._state.findIndex(alt => alt.view.cond);
        if (index !== -1)
            this._state[index].cond = true;
        this.state.next(this._state);
    }
}
NgAltGroupDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngAltGroup]' },] },
];
class NgAltDirective {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     * @param {?} ngAltGroup
     */
    constructor(templateRef, viewContainer, ngAltGroup) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.ngAltGroup = ngAltGroup;
        this.cond = false;
        this.hasView = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ngAltGroup.addAlternative(this);
        this.sub = this.ngAltGroup.state
            .filter(states => states.some(state => state.view === this))
            .flatMap(states => Observable.of(states.filter(state => state.view === this)[0]))
            .subscribe(state => this.updateState(state));
    }
    /**
     * @param {?} state
     * @return {?}
     */
    updateState(state) {
        if (state.cond && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
        else if (!state.cond && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.sub)
            this.sub.unsubscribe();
    }
    /**
     * @param {?} cond
     * @return {?}
     */
    set ngAlt(cond) {
        this.cond = cond;
        this.ngAltGroup.updateAlternative(this);
    }
}
NgAltDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngAlt]' },] },
];
/** @nocollapse */
NgAltDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: NgAltGroupDirective, decorators: [{ type: Host },] },
];
NgAltDirective.propDecorators = {
    "ngAlt": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgAltModule {
}
NgAltModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAltGroupDirective, NgAltDirective],
                exports: [NgAltGroupDirective, NgAltDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgAltModule, NgAltDirective as ɵb, NgAltGroupDirective as ɵa };
//# sourceMappingURL=ng-alt.js.map

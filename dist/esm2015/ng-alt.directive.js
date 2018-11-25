/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef, Host } from '@angular/core';
import { of as observableOf, Subject } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
/**
 * @record
 */
export function ViewState() { }
if (false) {
    /** @type {?} */
    ViewState.prototype.view;
    /** @type {?} */
    ViewState.prototype.cond;
}
export class NgAltGroupDirective {
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
        /** @type {?} */
        const index = this._state.findIndex(alt => alt.view === view);
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
        /** @type {?} */
        const index = this._state.findIndex(alt => alt.view.cond);
        if (index !== -1)
            this._state[index].cond = true;
        this.state.next(this._state);
    }
}
NgAltGroupDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngAltGroup]' },] }
];
if (false) {
    /** @type {?} */
    NgAltGroupDirective.prototype._state;
    /** @type {?} */
    NgAltGroupDirective.prototype.state;
}
export class NgAltDirective {
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
            .asObservable()
            .pipe(filter(states => states.some(state => state.view === this)), flatMap(states => observableOf(states.filter(state => state.view === this)[0])))
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
    { type: Directive, args: [{ selector: '[ngAlt]' },] }
];
/** @nocollapse */
NgAltDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: NgAltGroupDirective, decorators: [{ type: Host }] }
];
NgAltDirective.propDecorators = {
    ngAlt: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgAltDirective.prototype.cond;
    /** @type {?} */
    NgAltDirective.prototype.hasView;
    /** @type {?} */
    NgAltDirective.prototype.sub;
    /**
     * @type {?}
     * @private
     */
    NgAltDirective.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    NgAltDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    NgAltDirective.prototype.ngAltGroup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWx0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWFsdC8iLCJzb3VyY2VzIjpbIm5nLWFsdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRWpELCtCQUdDOzs7SUFGQyx5QkFBcUI7O0lBQ3JCLHlCQUFjOztBQUloQixNQUFNLE9BQU8sbUJBQW1CO0lBRGhDO1FBRUUsV0FBTSxHQUFnQixFQUFFLENBQUE7UUFDeEIsVUFBSyxHQUF5QixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBcUI5QyxDQUFDOzs7OztJQW5CQyxjQUFjLENBQUMsSUFBb0I7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUFvQjs7Y0FDOUIsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7UUFDN0QsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUss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LENBQUM7SUFDMUMsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7Ozs7WUFuQ1AsV0FBVztZQUFFLGdCQUFnQjtZQTRDeEIsbUJBQW1CLHVCQUE5QyxJQUFJOzs7b0JBNEJOLEtBQUs7Ozs7SUFuQ04sOEJBQWE7O0lBQ2IsaUNBQWdCOztJQUNoQiw2QkFBa0I7Ozs7O0lBR2hCLHFDQUFxQzs7Ozs7SUFDckMsdUNBQXVDOzs7OztJQUN2QyxvQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmxhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBWaWV3U3RhdGUge1xuICB2aWV3OiBOZ0FsdERpcmVjdGl2ZTtcbiAgY29uZDogYm9vbGVhbjtcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nQWx0R3JvdXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nQWx0R3JvdXBEaXJlY3RpdmUge1xuICBfc3RhdGU6IFZpZXdTdGF0ZVtdID0gW11cbiAgc3RhdGU6IFN1YmplY3Q8Vmlld1N0YXRlW10+ID0gbmV3IFN1YmplY3QoKTtcblxuICBhZGRBbHRlcm5hdGl2ZSh2aWV3OiBOZ0FsdERpcmVjdGl2ZSkge1xuICAgIHRoaXMuX3N0YXRlID0gWyAuLi50aGlzLl9zdGF0ZSwgeyB2aWV3LCBjb25kOiBmYWxzZSB9IF07XG4gICAgdGhpcy5lbmZvcmNlU3RhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZUFsdGVybmF0aXZlKHZpZXc6IE5nQWx0RGlyZWN0aXZlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9zdGF0ZS5maW5kSW5kZXgoYWx0ID0+IGFsdC52aWV3ID09PSB2aWV3KTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLl9zdGF0ZSwgeyBbaW5kZXhdOiB7IHZpZXcsIGNvbmQ6IGZhbHNlIH0gfSk7XG4gICAgdGhpcy5lbmZvcmNlU3RhdGUoKTtcbiAgfVxuXG4gIGVuZm9yY2VTdGF0ZSgpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlLm1hcChhbHQgPT4gKHsgLi4uYWx0LCBjb25kOiBmYWxzZSB9KSk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9zdGF0ZS5maW5kSW5kZXgoYWx0ID0+IGFsdC52aWV3LmNvbmQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHRoaXMuX3N0YXRlW2luZGV4XS5jb25kID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXRlLm5leHQodGhpcy5fc3RhdGUpO1xuICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nQWx0XScgfSlcbmV4cG9ydCBjbGFzcyBOZ0FsdERpcmVjdGl2ZSB7XG4gIGNvbmQgPSBmYWxzZTtcbiAgaGFzVmlldyA9IGZhbHNlO1xuICBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASG9zdCgpIHByaXZhdGUgbmdBbHRHcm91cDogTmdBbHRHcm91cERpcmVjdGl2ZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubmdBbHRHcm91cC5hZGRBbHRlcm5hdGl2ZSh0aGlzKTtcbiAgICB0aGlzLnN1YiA9IHRoaXMubmdBbHRHcm91cC5zdGF0ZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKHN0YXRlcyA9PiBzdGF0ZXMuc29tZShzdGF0ZSA9PiBzdGF0ZS52aWV3ID09PSB0aGlzKSksXG4gICAgICAgIGZsYXRNYXAoc3RhdGVzID0+IG9ic2VydmFibGVPZihzdGF0ZXMuZmlsdGVyKHN0YXRlID0+IHN0YXRlLnZpZXcgPT09IHRoaXMpWzBdKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoc3RhdGUgPT4gdGhpcy51cGRhdGVTdGF0ZShzdGF0ZSkpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUoc3RhdGU6IFZpZXdTdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5jb25kICYmICF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXN0YXRlLmNvbmQgJiYgdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YikgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBuZ0FsdChjb25kOiBib29sZWFuKSB7XG4gICAgdGhpcy5jb25kID0gY29uZDtcbiAgICB0aGlzLm5nQWx0R3JvdXAudXBkYXRlQWx0ZXJuYXRpdmUodGhpcyk7XG4gIH1cbn1cbiJdfQ==
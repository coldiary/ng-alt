import { Directive, Input, TemplateRef, ViewContainerRef, Host, NgModule } from '@angular/core';
import { of, Subject } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .asObservable()
            .pipe(filter(states => states.some(state => state.view === this)), flatMap(states => of(states.filter(state => state.view === this)[0])))
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgAltModule {
}
NgAltModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAltGroupDirective, NgAltDirective],
                exports: [NgAltGroupDirective, NgAltDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgAltModule, NgAltDirective as ɵb, NgAltGroupDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWx0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1hbHQvbmctYWx0LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctYWx0L25nLWFsdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZsYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgdmlldzogTmdBbHREaXJlY3RpdmU7XG4gIGNvbmQ6IGJvb2xlYW47XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdEdyb3VwXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0FsdEdyb3VwRGlyZWN0aXZlIHtcbiAgX3N0YXRlOiBWaWV3U3RhdGVbXSA9IFtdXG4gIHN0YXRlOiBTdWJqZWN0PFZpZXdTdGF0ZVtdPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgYWRkQWx0ZXJuYXRpdmUodmlldzogTmdBbHREaXJlY3RpdmUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFsgLi4udGhpcy5fc3RhdGUsIHsgdmlldywgY29uZDogZmFsc2UgfSBdO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICB1cGRhdGVBbHRlcm5hdGl2ZSh2aWV3OiBOZ0FsdERpcmVjdGl2ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldyA9PT0gdmlldyk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5fc3RhdGUsIHsgW2luZGV4XTogeyB2aWV3LCBjb25kOiBmYWxzZSB9IH0pO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICBlbmZvcmNlU3RhdGUoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9zdGF0ZS5tYXAoYWx0ID0+ICh7IC4uLmFsdCwgY29uZDogZmFsc2UgfSkpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldy5jb25kKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLl9zdGF0ZVtpbmRleF0uY29uZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5uZXh0KHRoaXMuX3N0YXRlKTtcbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdF0nIH0pXG5leHBvcnQgY2xhc3MgTmdBbHREaXJlY3RpdmUge1xuICBjb25kID0gZmFsc2U7XG4gIGhhc1ZpZXcgPSBmYWxzZTtcbiAgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEhvc3QoKSBwcml2YXRlIG5nQWx0R3JvdXA6IE5nQWx0R3JvdXBEaXJlY3RpdmUsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nQWx0R3JvdXAuYWRkQWx0ZXJuYXRpdmUodGhpcyk7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm5nQWx0R3JvdXAuc3RhdGVcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihzdGF0ZXMgPT4gc3RhdGVzLnNvbWUoc3RhdGUgPT4gc3RhdGUudmlldyA9PT0gdGhpcykpLFxuICAgICAgICBmbGF0TWFwKHN0YXRlcyA9PiBvYnNlcnZhYmxlT2Yoc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS52aWV3ID09PSB0aGlzKVswXSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMudXBkYXRlU3RhdGUoc3RhdGUpKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHN0YXRlOiBWaWV3U3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY29uZCAmJiAhdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5jb25kICYmIHRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWIpIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbmdBbHQoY29uZDogYm9vbGVhbikge1xuICAgIHRoaXMuY29uZCA9IGNvbmQ7XG4gICAgdGhpcy5uZ0FsdEdyb3VwLnVwZGF0ZUFsdGVybmF0aXZlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdBbHREaXJlY3RpdmUsIE5nQWx0R3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL25nLWFsdC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsgTmdBbHRHcm91cERpcmVjdGl2ZSwgTmdBbHREaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBOZ0FsdEdyb3VwRGlyZWN0aXZlLCBOZ0FsdERpcmVjdGl2ZSBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQWx0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFB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
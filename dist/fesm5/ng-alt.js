import { __spread, __assign } from 'tslib';
import { Directive, Input, TemplateRef, ViewContainerRef, Host, NgModule } from '@angular/core';
import { of, Subject } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgAltGroupDirective = /** @class */ (function () {
    function NgAltGroupDirective() {
        this._state = [];
        this.state = new Subject();
    }
    /**
     * @param {?} view
     * @return {?}
     */
    NgAltGroupDirective.prototype.addAlternative = /**
     * @param {?} view
     * @return {?}
     */
    function (view) {
        this._state = __spread(this._state, [{ view: view, cond: false }]);
        this.enforceState();
    };
    /**
     * @param {?} view
     * @return {?}
     */
    NgAltGroupDirective.prototype.updateAlternative = /**
     * @param {?} view
     * @return {?}
     */
    function (view) {
        var _a;
        /** @type {?} */
        var index = this._state.findIndex(function (alt) { return alt.view === view; });
        if (index === -1)
            return;
        this._state = Object.assign([], this._state, (_a = {}, _a[index] = { view: view, cond: false }, _a));
        this.enforceState();
    };
    /**
     * @return {?}
     */
    NgAltGroupDirective.prototype.enforceState = /**
     * @return {?}
     */
    function () {
        this._state = this._state.map(function (alt) { return (__assign({}, alt, { cond: false })); });
        /** @type {?} */
        var index = this._state.findIndex(function (alt) { return alt.view.cond; });
        if (index !== -1)
            this._state[index].cond = true;
        this.state.next(this._state);
    };
    NgAltGroupDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngAltGroup]' },] }
    ];
    return NgAltGroupDirective;
}());
var NgAltDirective = /** @class */ (function () {
    function NgAltDirective(templateRef, viewContainer, ngAltGroup) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.ngAltGroup = ngAltGroup;
        this.cond = false;
        this.hasView = false;
    }
    /**
     * @return {?}
     */
    NgAltDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngAltGroup.addAlternative(this);
        this.sub = this.ngAltGroup.state
            .asObservable()
            .pipe(filter(function (states) { return states.some(function (state) { return state.view === _this; }); }), flatMap(function (states) { return of(states.filter(function (state) { return state.view === _this; })[0]); }))
            .subscribe(function (state) { return _this.updateState(state); });
    };
    /**
     * @param {?} state
     * @return {?}
     */
    NgAltDirective.prototype.updateState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (state.cond && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
        else if (!state.cond && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    };
    /**
     * @return {?}
     */
    NgAltDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    Object.defineProperty(NgAltDirective.prototype, "ngAlt", {
        set: /**
         * @param {?} cond
         * @return {?}
         */
        function (cond) {
            this.cond = cond;
            this.ngAltGroup.updateAlternative(this);
        },
        enumerable: true,
        configurable: true
    });
    NgAltDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngAlt]' },] }
    ];
    /** @nocollapse */
    NgAltDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: NgAltGroupDirective, decorators: [{ type: Host }] }
    ]; };
    NgAltDirective.propDecorators = {
        ngAlt: [{ type: Input }]
    };
    return NgAltDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgAltModule = /** @class */ (function () {
    function NgAltModule() {
    }
    NgAltModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgAltGroupDirective, NgAltDirective],
                    exports: [NgAltGroupDirective, NgAltDirective]
                },] }
    ];
    return NgAltModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgAltModule, NgAltDirective as ɵb, NgAltGroupDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWx0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1hbHQvbmctYWx0LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctYWx0L25nLWFsdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZsYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgdmlldzogTmdBbHREaXJlY3RpdmU7XG4gIGNvbmQ6IGJvb2xlYW47XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdEdyb3VwXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0FsdEdyb3VwRGlyZWN0aXZlIHtcbiAgX3N0YXRlOiBWaWV3U3RhdGVbXSA9IFtdXG4gIHN0YXRlOiBTdWJqZWN0PFZpZXdTdGF0ZVtdPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgYWRkQWx0ZXJuYXRpdmUodmlldzogTmdBbHREaXJlY3RpdmUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFsgLi4udGhpcy5fc3RhdGUsIHsgdmlldywgY29uZDogZmFsc2UgfSBdO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICB1cGRhdGVBbHRlcm5hdGl2ZSh2aWV3OiBOZ0FsdERpcmVjdGl2ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldyA9PT0gdmlldyk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5fc3RhdGUsIHsgW2luZGV4XTogeyB2aWV3LCBjb25kOiBmYWxzZSB9IH0pO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICBlbmZvcmNlU3RhdGUoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9zdGF0ZS5tYXAoYWx0ID0+ICh7IC4uLmFsdCwgY29uZDogZmFsc2UgfSkpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldy5jb25kKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLl9zdGF0ZVtpbmRleF0uY29uZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5uZXh0KHRoaXMuX3N0YXRlKTtcbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdF0nIH0pXG5leHBvcnQgY2xhc3MgTmdBbHREaXJlY3RpdmUge1xuICBjb25kID0gZmFsc2U7XG4gIGhhc1ZpZXcgPSBmYWxzZTtcbiAgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEhvc3QoKSBwcml2YXRlIG5nQWx0R3JvdXA6IE5nQWx0R3JvdXBEaXJlY3RpdmUsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nQWx0R3JvdXAuYWRkQWx0ZXJuYXRpdmUodGhpcyk7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm5nQWx0R3JvdXAuc3RhdGVcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihzdGF0ZXMgPT4gc3RhdGVzLnNvbWUoc3RhdGUgPT4gc3RhdGUudmlldyA9PT0gdGhpcykpLFxuICAgICAgICBmbGF0TWFwKHN0YXRlcyA9PiBvYnNlcnZhYmxlT2Yoc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS52aWV3ID09PSB0aGlzKVswXSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMudXBkYXRlU3RhdGUoc3RhdGUpKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHN0YXRlOiBWaWV3U3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY29uZCAmJiAhdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5jb25kICYmIHRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWIpIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbmdBbHQoY29uZDogYm9vbGVhbikge1xuICAgIHRoaXMuY29uZCA9IGNvbmQ7XG4gICAgdGhpcy5uZ0FsdEdyb3VwLnVwZGF0ZUFsdGVybmF0aXZlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdBbHREaXJlY3RpdmUsIE5nQWx0R3JvdXBEaXJlY3RpdmUgfSBmcm9tICcuL25nLWFsdC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsgTmdBbHRHcm91cERpcmVjdGl2ZSwgTmdBbHREaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBOZ0FsdEdyb3VwRGlyZWN0aXZlLCBOZ0FsdERpcmVjdGl2ZSBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQWx0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIm9ic2VydmFibGVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJ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
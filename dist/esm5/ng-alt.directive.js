/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        this._state = tslib_1.__spread(this._state, [{ view: view, cond: false }]);
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
        this._state = this._state.map(function (alt) { return (tslib_1.__assign({}, alt, { cond: false })); });
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
export { NgAltGroupDirective };
if (false) {
    /** @type {?} */
    NgAltGroupDirective.prototype._state;
    /** @type {?} */
    NgAltGroupDirective.prototype.state;
}
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
            .pipe(filter(function (states) { return states.some(function (state) { return state.view === _this; }); }), flatMap(function (states) { return observableOf(states.filter(function (state) { return state.view === _this; })[0]); }))
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
export { NgAltDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWx0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWFsdC8iLCJzb3VyY2VzIjpbIm5nLWFsdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVqRCwrQkFHQzs7O0lBRkMseUJBQXFCOztJQUNyQix5QkFBYzs7QUFHaEI7SUFBQTtRQUVFLFdBQU0sR0FBZ0IsRUFBRSxDQUFBO1FBQ3hCLFVBQUssR0FBeUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQXFCOUMsQ0FBQzs7Ozs7SUFuQkMsNENBQWM7Ozs7SUFBZCxVQUFlLElBQW9CO1FBQ2pDLElBQUksQ0FBQyxNQUFNLG9CQUFRLElBQUksQ0FBQyxNQUFNLEdBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCwrQ0FBaUI7Ozs7SUFBakIsVUFBa0IsSUFBb0I7OztZQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksRUFBakIsQ0FBaUIsQ0FBQztRQUM3RCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sWUFBSSxHQUFD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QyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFhLGlDQUFLOzs7OztRQUFsQixVQUFtQixJQUFhO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7O2dCQXhDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFOzs7O2dCQW5DUCxXQUFXO2dCQUFFLGdCQUFnQjtnQkE0Q3hCLG1CQUFtQix1QkFBOUMsSUFBSTs7O3dCQTRCTixLQUFLOztJQUlSLHFCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7U0F4Q1ksY0FBYzs7O0lBQ3pCLDhCQUFhOztJQUNiLGlDQUFnQjs7SUFDaEIsNkJBQWtCOzs7OztJQUdoQixxQ0FBcUM7Ozs7O0lBQ3JDLHVDQUF1Qzs7Ozs7SUFDdkMsb0NBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZsYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgdmlldzogTmdBbHREaXJlY3RpdmU7XG4gIGNvbmQ6IGJvb2xlYW47XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdEdyb3VwXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0FsdEdyb3VwRGlyZWN0aXZlIHtcbiAgX3N0YXRlOiBWaWV3U3RhdGVbXSA9IFtdXG4gIHN0YXRlOiBTdWJqZWN0PFZpZXdTdGF0ZVtdPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgYWRkQWx0ZXJuYXRpdmUodmlldzogTmdBbHREaXJlY3RpdmUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFsgLi4udGhpcy5fc3RhdGUsIHsgdmlldywgY29uZDogZmFsc2UgfSBdO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICB1cGRhdGVBbHRlcm5hdGl2ZSh2aWV3OiBOZ0FsdERpcmVjdGl2ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldyA9PT0gdmlldyk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5fc3RhdGUsIHsgW2luZGV4XTogeyB2aWV3LCBjb25kOiBmYWxzZSB9IH0pO1xuICAgIHRoaXMuZW5mb3JjZVN0YXRlKCk7XG4gIH1cblxuICBlbmZvcmNlU3RhdGUoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9zdGF0ZS5tYXAoYWx0ID0+ICh7IC4uLmFsdCwgY29uZDogZmFsc2UgfSkpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3RhdGUuZmluZEluZGV4KGFsdCA9PiBhbHQudmlldy5jb25kKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB0aGlzLl9zdGF0ZVtpbmRleF0uY29uZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5uZXh0KHRoaXMuX3N0YXRlKTtcbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ0FsdF0nIH0pXG5leHBvcnQgY2xhc3MgTmdBbHREaXJlY3RpdmUge1xuICBjb25kID0gZmFsc2U7XG4gIGhhc1ZpZXcgPSBmYWxzZTtcbiAgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQEhvc3QoKSBwcml2YXRlIG5nQWx0R3JvdXA6IE5nQWx0R3JvdXBEaXJlY3RpdmUsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5nQWx0R3JvdXAuYWRkQWx0ZXJuYXRpdmUodGhpcyk7XG4gICAgdGhpcy5zdWIgPSB0aGlzLm5nQWx0R3JvdXAuc3RhdGVcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihzdGF0ZXMgPT4gc3RhdGVzLnNvbWUoc3RhdGUgPT4gc3RhdGUudmlldyA9PT0gdGhpcykpLFxuICAgICAgICBmbGF0TWFwKHN0YXRlcyA9PiBvYnNlcnZhYmxlT2Yoc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS52aWV3ID09PSB0aGlzKVswXSkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHN0YXRlID0+IHRoaXMudXBkYXRlU3RhdGUoc3RhdGUpKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHN0YXRlOiBWaWV3U3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY29uZCAmJiAhdGhpcy5oYXNWaWV3KSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5jb25kICYmIHRoaXMuaGFzVmlldykge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWIpIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbmdBbHQoY29uZDogYm9vbGVhbikge1xuICAgIHRoaXMuY29uZCA9IGNvbmQ7XG4gICAgdGhpcy5uZ0FsdEdyb3VwLnVwZGF0ZUFsdGVybmF0aXZlKHRoaXMpO1xuICB9XG59XG4iXX0=
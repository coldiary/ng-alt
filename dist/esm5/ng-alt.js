import { __spread } from 'tslib';
import { Directive, Input, TemplateRef, ViewContainerRef, Host, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

var NgAltGroupDirective = /** @class */ (function () {
    function NgAltGroupDirective() {
        this._state = [];
        this.state = new Subject();
    }
    NgAltGroupDirective.prototype.addAlternative = function (view) {
        this._state = __spread(this._state, [{ view: view, cond: false }]);
        this.enforceState();
    };
    NgAltGroupDirective.prototype.updateAlternative = function (view) {
        var index = this._state.findIndex(function (alt) { return alt.view === view; });
        if (index === -1)
            return;
        this._state = Object.assign([], this._state, (_a = {}, _a[index] = { view: view, cond: false }, _a));
        this.enforceState();
        var _a;
    };
    NgAltGroupDirective.prototype.enforceState = function () {
        this._state = this._state.map(function (alt) { return (Object.assign({}, alt, { cond: false })); });
        var index = this._state.findIndex(function (alt) { return alt.view.cond; });
        if (index !== -1)
            this._state[index].cond = true;
        this.state.next(this._state);
    };
    return NgAltGroupDirective;
}());
NgAltGroupDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngAltGroup]' },] },
];
var NgAltDirective = /** @class */ (function () {
    function NgAltDirective(templateRef, viewContainer, ngAltGroup) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.ngAltGroup = ngAltGroup;
        this.cond = false;
        this.hasView = false;
    }
    NgAltDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.ngAltGroup.addAlternative(this);
        this.sub = this.ngAltGroup.state
            .filter(function (states) { return states.some(function (state) { return state.view === _this; }); })
            .flatMap(function (states) { return Observable.of(states.filter(function (state) { return state.view === _this; })[0]); })
            .subscribe(function (state) { return _this.updateState(state); });
    };
    NgAltDirective.prototype.updateState = function (state) {
        if (state.cond && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
        else if (!state.cond && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    };
    NgAltDirective.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    Object.defineProperty(NgAltDirective.prototype, "ngAlt", {
        set: function (cond) {
            this.cond = cond;
            this.ngAltGroup.updateAlternative(this);
        },
        enumerable: true,
        configurable: true
    });
    return NgAltDirective;
}());
NgAltDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngAlt]' },] },
];
NgAltDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: NgAltGroupDirective, decorators: [{ type: Host },] },
]; };
NgAltDirective.propDecorators = {
    "ngAlt": [{ type: Input },],
};
var NgAltModule = /** @class */ (function () {
    function NgAltModule() {
    }
    return NgAltModule;
}());
NgAltModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgAltGroupDirective, NgAltDirective],
                exports: [NgAltGroupDirective, NgAltDirective]
            },] },
];

export { NgAltModule, NgAltDirective as ɵb, NgAltGroupDirective as ɵa };
//# sourceMappingURL=ng-alt.js.map

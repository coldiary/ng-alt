(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable'), require('rxjs/Subject'), require('rxjs/add/observable/of'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/mergeMap')) :
	typeof define === 'function' && define.amd ? define('ng-alt', ['exports', '@angular/core', 'rxjs/Observable', 'rxjs/Subject', 'rxjs/add/observable/of', 'rxjs/add/operator/filter', 'rxjs/add/operator/mergeMap'], factory) :
	(factory((global['ng-alt'] = {}),global.ng.core,global.Rx,global.Rx));
}(this, (function (exports,core,Observable,Subject) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */










function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var NgAltGroupDirective = /** @class */ (function () {
    function NgAltGroupDirective() {
        this._state = [];
        this.state = new Subject.Subject();
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
    { type: core.Directive, args: [{ selector: '[ngAltGroup]' },] },
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
            .flatMap(function (states) { return Observable.Observable.of(states.filter(function (state) { return state.view === _this; })[0]); })
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
    { type: core.Directive, args: [{ selector: '[ngAlt]' },] },
];
NgAltDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: NgAltGroupDirective, decorators: [{ type: core.Host },] },
]; };
NgAltDirective.propDecorators = {
    "ngAlt": [{ type: core.Input },],
};
var NgAltModule = /** @class */ (function () {
    function NgAltModule() {
    }
    return NgAltModule;
}());
NgAltModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [NgAltGroupDirective, NgAltDirective],
                exports: [NgAltGroupDirective, NgAltDirective]
            },] },
];

exports.NgAltModule = NgAltModule;
exports.ɵb = NgAltDirective;
exports.ɵa = NgAltGroupDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-alt.umd.js.map

import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
export interface ViewState {
    view: NgAltDirective;
    cond: boolean;
}
export declare class NgAltGroupDirective {
    _state: ViewState[];
    state: Subject<ViewState[]>;
    addAlternative(view: NgAltDirective): void;
    updateAlternative(view: NgAltDirective): void;
    enforceState(): void;
}
export declare class NgAltDirective {
    private templateRef;
    private viewContainer;
    private ngAltGroup;
    cond: boolean;
    hasView: boolean;
    sub: Subscription;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, ngAltGroup: NgAltGroupDirective);
    ngOnInit(): void;
    updateState(state: ViewState): void;
    ngOnDestroy(): void;
    ngAlt: boolean;
}

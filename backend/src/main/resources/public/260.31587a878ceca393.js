"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[260],{8324:(B,y,c)=>{c.d(y,{v:()=>C});var p=c(655),e=c(3429),g=c(8228),M=c(9360);class C extends g.g{constructor(){super(...arguments),this.zipCode="",this.name=""}}(0,p.gn)([(0,e.D)(()=>M.K)],C.prototype,"country",void 0)},9360:(B,y,c)=>{c.d(y,{K:()=>e});var p=c(8228);class e extends p.g{constructor(){super(...arguments),this.description="",this.identificationCode=""}}},287:(B,y,c)=>{c.d(y,{h:()=>p});class p{constructor(){this.criteriaQuick="",this.betweenAttributes=[],this.ordering="ASC"}getBetweenAttributes(){return this.betweenAttributes}addBetweenAttribute(g){let M=this.betweenAttributes.findIndex(C=>C.attribute===g.attribute);M<0?this.betweenAttributes.push(g):this.betweenAttributes[M]=g}clearAllBetweenAttributes(){this.betweenAttributes=[]}removeBetweenAttribute(g){let M=this.betweenAttributes.findIndex(C=>C.attribute===g);M>=0&&this.betweenAttributes.splice(M,1)}}},5595:(B,y,c)=>{c.d(y,{y:()=>M});var p=c(591),e=c(537),g=c(287);class M{constructor(){this.entities$=new p.X([]),this.totalEntitiesLength$=new p.X(void 0),this.bottomReached$=new p.X(!1),this.isLoading$=new p.X(!1),this.entities=this.entities$.asObservable(),this.totalEntitiesLength=this.totalEntitiesLength$.asObservable(),this.isLoading=this.isLoading$.asObservable(),this.searchModel=new g.h,this.NUMBER_OF_ITEMS_ON_PAGE=50}get numberOfItemsOnPage(){return this.NUMBER_OF_ITEMS_ON_PAGE}set numberOfItemsOnPage(S){this.NUMBER_OF_ITEMS_ON_PAGE=S,this.requestFirstPage()}resetNumberOfItemsOnPage(){this.NUMBER_OF_ITEMS_ON_PAGE=50,this.requestFirstPage()}setWebService(S){return this.webService=S,this}setOrdering(S){return this.searchModel.ordering=S,this}setFilter(S){this.searchModel=S,this.requestFirstPage()}requestFirstPage(){this.bottomReached$.next(!1),this.entities$.next([]),this.totalEntitiesLength$.next(0),this.requestNextPage()}requestNextPage(){this.bottomReached$.getValue()||(this.isLoading$.next(!0),this.webService?.searchEntities(this.searchModel,this.entities$.getValue().length||0,this.NUMBER_OF_ITEMS_ON_PAGE).pipe((0,e.x)(()=>{this.isLoading$.next(!1)})).subscribe(S=>{this.entities$.next(this.entities$.getValue().concat(S.entities));const w=this.entities$.getValue().length||0;this.bottomReached$.next(!(w<S.totalCount)),this.totalEntitiesLength$.next(S.totalCount)}))}}},3429:(B,y,c)=>{c.d(y,{D:()=>e});var p=c(1061);function e(g,M={}){return function(C,S){const w=Reflect.getMetadata("design:type",C,S);p.m.addTypeMetadata({target:C.constructor,propertyName:S,reflectedType:w,typeFunction:g,options:M})}}},655:(B,y,c)=>{function C(t,o,i,s){var u,a=arguments.length,r=a<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,o,i,s);else for(var m=t.length-1;m>=0;m--)(u=t[m])&&(r=(a<3?u(r):a>3?u(o,i,r):u(o,i))||r);return a>3&&r&&Object.defineProperty(o,i,r),r}c.d(y,{gn:()=>C})},4603:(B,y,c)=>{c.d(y,{I:()=>K,s:()=>$});var p=c(4650),e=c(7625),g=c(13),M=c(2868),C=c(8929),S=c(3753),w=c(4385);let $=(()=>{class b{constructor(P,U){this.matSelect=P,this.ngZone=U,this.threshold="15%",this.debounceTime=150,this.infiniteScroll=new p.vpe,this.thrPx=0,this.thrPc=0,this.singleOptionHeight=3,this.destroyed$=new C.xQ}ngOnInit(){this.evaluateThreshold()}ngAfterViewInit(){this.matSelect.openedChange.pipe((0,e.R)(this.destroyed$)).subscribe(P=>{P&&(this.panel=this.matSelect.panel.nativeElement,this.singleOptionHeight=this.getSelectItemHeightPx(),this.registerScrollListener())})}ngOnDestroy(){this.destroyed$.next(!0),this.destroyed$.complete()}evaluateThreshold(){this.threshold.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(this.threshold)/100):(this.thrPx=parseFloat(this.threshold),this.thrPc=0)}registerScrollListener(){(0,S.R)(this.panel,"scroll").pipe((0,e.R)(this.destroyed$),(0,g.b)(this.debounceTime),(0,M.b)(P=>{this.handleScrollEvent(P)})).subscribe()}handleScrollEvent(P){this.ngZone.runOutsideAngular(()=>{if(this.complete)return;const x=this.singleOptionHeight*this.matSelect.options.length;this.panel.clientHeight+P.target.scrollTop+(0!==this.thrPc?x*this.thrPc:this.thrPx)>=x&&this.ngZone.run(()=>this.infiniteScroll.emit())})}getSelectItemHeightPx(){return 3*parseFloat(getComputedStyle(this.panel).fontSize)}}return b.\u0275fac=function(P){return new(P||b)(p.Y36(w.gD),p.Y36(p.R0b))},b.\u0275dir=p.lG2({type:b,selectors:[["","msInfiniteScroll",""]],inputs:{threshold:"threshold",debounceTime:"debounceTime",complete:"complete"},outputs:{infiniteScroll:"infiniteScroll"}}),b})(),K=(()=>{class b{}return b.\u0275fac=function(P){return new(P||b)},b.\u0275mod=p.oAB({type:b}),b.\u0275inj=p.cJS({imports:[w.LD]}),b})()},3231:(B,y,c)=>{c.d(y,{Co:()=>re,nu:()=>se});var p=c(9521),e=c(4650),g=c(4006),M=c(3238),C=c(9549),S=c(4385),w=c(591),W=c(1086),$=c(3426),K=c(8929),b=c(7545),D=c(4850),P=c(1059),U=c(8583),x=c(7625),V=c(2986),F=c(2198),z=c(2868),q=c(6534),ee=c(2687),J=c(6709),G=c(1572),Z=c(4859),Y=c(7392),k=c(6895),Q=c(266);const te=["searchSelectInput"],t=["innerSelectSearch"];function o(h,O){if(1&h){const n=e.EpF();e.TgZ(0,"mat-checkbox",9),e.NdJ("change",function(f){e.CHM(n);const d=e.oxw();return e.KtG(d._emitSelectAllBooleanToParent(f.checked))}),e.qZA()}if(2&h){const n=e.oxw();e.Q6J("color",null==n.matFormField?null:n.matFormField.color)("checked",n.toggleAllCheckboxChecked)("indeterminate",n.toggleAllCheckboxIndeterminate)("matTooltip",n.toggleAllCheckboxTooltipMessage)("matTooltipPosition",n.toogleAllCheckboxTooltipPosition)}}function i(h,O){1&h&&e._UZ(0,"mat-spinner",10)}function s(h,O){1&h&&e.Hsn(0,1,["*ngIf","clearIcon; else defaultIcon"])}function a(h,O){if(1&h&&(e.TgZ(0,"mat-icon",14),e._uU(1),e.qZA()),2&h){const n=e.oxw(2);e.Q6J("svgIcon",n.closeSvgIcon),e.xp6(1),e.hij(" ",n.closeSvgIcon?null:n.closeIcon," ")}}function r(h,O){if(1&h){const n=e.EpF();e.TgZ(0,"button",11),e.NdJ("click",function(){e.CHM(n);const f=e.oxw();return e.KtG(f._reset(!0))}),e.YNc(1,s,1,0,"ng-content",12),e.YNc(2,a,2,2,"ng-template",null,13,e.W1O),e.qZA()}if(2&h){const n=e.MAs(3),l=e.oxw();e.xp6(1),e.Q6J("ngIf",l.clearIcon)("ngIfElse",n)}}function u(h,O){1&h&&e.Hsn(0,2,["*ngIf","noEntriesFound; else defaultNoEntriesFound"])}function m(h,O){if(1&h&&e._uU(0),2&h){const n=e.oxw(2);e.Oqu(n.noEntriesFoundLabel)}}function A(h,O){if(1&h&&(e.TgZ(0,"div",15),e.YNc(1,u,1,0,"ng-content",12),e.YNc(2,m,1,1,"ng-template",null,16,e.W1O),e.qZA()),2&h){const n=e.MAs(3),l=e.oxw();e.xp6(1),e.Q6J("ngIf",l.noEntriesFound)("ngIfElse",n)}}const _=[[["",8,"mat-select-search-custom-header-content"]],[["","ngxMatSelectSearchClear",""]],[["","ngxMatSelectNoEntriesFound",""]]],v=function(h,O){return{"mat-select-search-inner-multiple":h,"mat-select-search-inner-toggle-all":O}},L=[".mat-select-search-custom-header-content","[ngxMatSelectSearchClear]","[ngxMatSelectNoEntriesFound]"];let E=(()=>{class h{}return h.\u0275fac=function(n){return new(n||h)},h.\u0275dir=e.lG2({type:h,selectors:[["","ngxMatSelectSearchClear",""]]}),h})();const R=["ariaLabel","clearSearchInput","closeIcon","closeSvgIcon","disableInitialFocus","disableScrollToActiveOnOptionsChanged","enableClearOnEscapePressed","hideClearSearchButton","indexAndLengthScreenReaderText","noEntriesFoundLabel","placeholderLabel","preventHomeEndKeyPropagation","searching"],H=new e.OlP("mat-selectsearch-default-options");let ie=(()=>{class h{}return h.\u0275fac=function(n){return new(n||h)},h.\u0275dir=e.lG2({type:h,selectors:[["","ngxMatSelectNoEntriesFound",""]]}),h})(),se=(()=>{class h{constructor(n,l,f,d=null,I,j=null,N){this.matSelect=n,this.changeDetectorRef=l,this._viewportRuler=f,this.matOption=d,this.liveAnnouncer=I,this.matFormField=j,this.placeholderLabel="Suche",this.type="text",this.closeIcon="close",this.noEntriesFoundLabel="Keine Optionen gefunden",this.indexAndLengthScreenReaderText=" of ",this.clearSearchInput=!0,this.searching=!1,this.disableInitialFocus=!1,this.enableClearOnEscapePressed=!1,this.preventHomeEndKeyPropagation=!1,this.disableScrollToActiveOnOptionsChanged=!1,this.ariaLabel="dropdown search",this.showToggleAllCheckbox=!1,this.toggleAllCheckboxChecked=!1,this.toggleAllCheckboxIndeterminate=!1,this.toggleAllCheckboxTooltipMessage="",this.toogleAllCheckboxTooltipPosition="below",this.hideClearSearchButton=!1,this.alwaysRestoreSelectedOptionsMulti=!1,this.toggleAll=new e.vpe,this.onTouched=T=>{},this._options$=new w.X(null),this.optionsList$=this._options$.pipe((0,b.w)(T=>T?T.changes.pipe((0,D.U)(X=>X.toArray()),(0,P.O)(T.toArray())):(0,W.of)(null))),this.optionsLength$=this.optionsList$.pipe((0,D.U)(T=>T?T.length:0)),this._formControl=new g.NI(""),this._showNoEntriesFound$=(0,$.aj)([this._formControl.valueChanges,this.optionsLength$]).pipe((0,D.U)(([T,X])=>this.noEntriesFoundLabel&&T&&X===this.getOptionsLengthOffset())),this._onDestroy=new K.xQ,this.applyDefaultOptions(N)}get isInsideMatOption(){return!!this.matOption}get value(){return this._formControl.value}set _options(n){this._options$.next(n)}get _options(){return this._options$.getValue()}applyDefaultOptions(n){if(n)for(const l of R)n.hasOwnProperty(l)&&(this[l]=n[l])}ngOnInit(){const n="mat-select-search-panel";this.matSelect.panelClass?Array.isArray(this.matSelect.panelClass)?this.matSelect.panelClass.push(n):"string"==typeof this.matSelect.panelClass?this.matSelect.panelClass=[this.matSelect.panelClass,n]:"object"==typeof this.matSelect.panelClass&&(this.matSelect.panelClass[n]=!0):this.matSelect.panelClass=n,this.matOption?(this.matOption.disabled=!0,this.matOption._getHostElement().classList.add("contains-mat-select-search")):console.error("<ngx-mat-select-search> must be placed inside a <mat-option> element"),this.matSelect.openedChange.pipe((0,U.g)(1),(0,x.R)(this._onDestroy)).subscribe(l=>{l?(this.updateInputWidth(),this.disableInitialFocus||this._focus()):this.clearSearchInput&&this._reset()}),this.matSelect.openedChange.pipe((0,V.q)(1)).pipe((0,x.R)(this._onDestroy)).subscribe(()=>{this.matSelect._keyManager?this.matSelect._keyManager.change.pipe((0,x.R)(this._onDestroy)).subscribe(()=>this.adjustScrollTopToFitActiveOptionIntoView()):console.log("_keyManager was not initialized."),this._options=this.matSelect.options;let l=this._options.toArray()[this.getOptionsLengthOffset()];this._options.changes.pipe((0,x.R)(this._onDestroy)).subscribe(()=>{setTimeout(()=>{const f=this._options.toArray(),d=f[this.getOptionsLengthOffset()],I=this.matSelect._keyManager;I&&this.matSelect.panelOpen&&((!this.matSelect.compareWith(l,d)||!I.activeItem||!f.find(N=>this.matSelect.compareWith(N,I.activeItem)))&&I.setFirstItemActive(),setTimeout(()=>{this.updateInputWidth()}),this.disableScrollToActiveOnOptionsChanged||this.adjustScrollTopToFitActiveOptionIntoView()),l=d})})}),this._showNoEntriesFound$.pipe((0,x.R)(this._onDestroy)).subscribe(l=>{this.matOption&&(l?this.matOption._getHostElement().classList.add("mat-select-search-no-entries-found"):this.matOption._getHostElement().classList.remove("mat-select-search-no-entries-found"))}),this._viewportRuler.change().pipe((0,x.R)(this._onDestroy)).subscribe(()=>{this.matSelect.panelOpen&&this.updateInputWidth()}),this.initMultipleHandling(),this.optionsList$.pipe((0,x.R)(this._onDestroy)).subscribe(()=>{this.changeDetectorRef.markForCheck()})}_emitSelectAllBooleanToParent(n){this.toggleAll.emit(n)}ngOnDestroy(){this._onDestroy.next(),this._onDestroy.complete()}_isToggleAllCheckboxVisible(){return this.matSelect.multiple&&this.showToggleAllCheckbox}_handleKeydown(n){(n.key&&1===n.key.length||n.keyCode>=p.A&&n.keyCode<=p.Z||n.keyCode>=p.xE&&n.keyCode<=p.aO||n.keyCode===p.L_||this.preventHomeEndKeyPropagation&&(n.keyCode===p.Sd||n.keyCode===p.uR))&&n.stopPropagation(),this.matSelect.multiple&&n.key&&n.keyCode===p.K5&&setTimeout(()=>this._focus()),!0===this.enableClearOnEscapePressed&&n.keyCode===p.hY&&this.value&&(this._reset(!0),n.stopPropagation())}_handleKeyup(n){if(n.keyCode===p.LH||n.keyCode===p.JH){const l=this.matSelect._getAriaActiveDescendant(),f=this._options.toArray().findIndex(d=>d.id===l);if(-1!==f){const d=this._options.toArray()[f];this.liveAnnouncer.announce(d.viewValue+" "+this.getAriaIndex(f)+this.indexAndLengthScreenReaderText+this.getAriaLength())}}}getAriaIndex(n){return 0===this.getOptionsLengthOffset()?n+1:n}getAriaLength(){return this._options.toArray().length-this.getOptionsLengthOffset()}writeValue(n){this._lastExternalInputValue=n,this._formControl.setValue(n),this.changeDetectorRef.markForCheck()}onBlur(){this.onTouched()}registerOnChange(n){this._formControl.valueChanges.pipe((0,F.h)(l=>l!==this._lastExternalInputValue),(0,z.b)(()=>this._lastExternalInputValue=void 0),(0,x.R)(this._onDestroy)).subscribe(n)}registerOnTouched(n){this.onTouched=n}_focus(){if(!this.searchSelectInput||!this.matSelect.panel)return;const n=this.matSelect.panel.nativeElement,l=n.scrollTop;this.searchSelectInput.nativeElement.focus(),n.scrollTop=l}_reset(n){this._formControl.setValue(""),n&&this._focus()}initMultipleHandling(){this.matSelect.ngControl?(this.previousSelectedValues=this.matSelect.ngControl.value,this.matSelect.ngControl.valueChanges.pipe((0,x.R)(this._onDestroy)).subscribe(n=>{let l=!1;if(this.matSelect.multiple&&(this.alwaysRestoreSelectedOptionsMulti||this._formControl.value&&this._formControl.value.length)&&this.previousSelectedValues&&Array.isArray(this.previousSelectedValues)){(!n||!Array.isArray(n))&&(n=[]);const f=this.matSelect.options.map(d=>d.value);this.previousSelectedValues.forEach(d=>{!n.some(I=>this.matSelect.compareWith(I,d))&&!f.some(I=>this.matSelect.compareWith(I,d))&&(n.push(d),l=!0)})}this.previousSelectedValues=n,l&&this.matSelect._onChange(n)})):this.matSelect.multiple&&console.error("the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true")}adjustScrollTopToFitActiveOptionIntoView(){if(this.matSelect.panel&&this.matSelect.options.length>0){const n=this.getMatOptionHeight(),l=this.matSelect._keyManager.activeItemIndex||0,f=(0,M.CB)(l,this.matSelect.options,this.matSelect.optionGroups),d=(this.matOption?-1:0)+f+l,I=this.matSelect.panel.nativeElement.scrollTop,j=this.innerSelectSearch.nativeElement.offsetHeight,N=Math.floor((256-j)/n),T=Math.round((I+j)/n)-1;T>=d?this.matSelect.panel.nativeElement.scrollTop=d*n:T+N<=d&&(this.matSelect.panel.nativeElement.scrollTop=(d+1)*n-(256-j))}}updateInputWidth(){if(!this.innerSelectSearch||!this.innerSelectSearch.nativeElement)return;let l,n=this.innerSelectSearch.nativeElement;for(;n=n.parentElement;)if(n.classList.contains("mat-select-panel")){l=n;break}l&&(this.innerSelectSearch.nativeElement.style.width=l.clientWidth+"px")}getMatOptionHeight(){return this.matSelect.options.length>0?this.matSelect.options.first._getHostElement().getBoundingClientRect().height:0}getOptionsLengthOffset(){return this.matOption?1:0}}return h.\u0275fac=function(n){return new(n||h)(e.Y36(S.gD),e.Y36(e.sBO),e.Y36(q.rL),e.Y36(M.ey,8),e.Y36(ee.Kd),e.Y36(C.KE,8),e.Y36(H,8))},h.\u0275cmp=e.Xpm({type:h,selectors:[["ngx-mat-select-search"]],contentQueries:function(n,l,f){if(1&n&&(e.Suo(f,E,5),e.Suo(f,ie,5)),2&n){let d;e.iGM(d=e.CRH())&&(l.clearIcon=d.first),e.iGM(d=e.CRH())&&(l.noEntriesFound=d.first)}},viewQuery:function(n,l){if(1&n&&(e.Gf(te,7,e.SBq),e.Gf(t,7,e.SBq)),2&n){let f;e.iGM(f=e.CRH())&&(l.searchSelectInput=f.first),e.iGM(f=e.CRH())&&(l.innerSelectSearch=f.first)}},hostVars:2,hostBindings:function(n,l){2&n&&e.ekj("mat-select-search-inside-mat-option",l.isInsideMatOption)},inputs:{placeholderLabel:"placeholderLabel",type:"type",closeIcon:"closeIcon",closeSvgIcon:"closeSvgIcon",noEntriesFoundLabel:"noEntriesFoundLabel",indexAndLengthScreenReaderText:"indexAndLengthScreenReaderText",clearSearchInput:"clearSearchInput",searching:"searching",disableInitialFocus:"disableInitialFocus",enableClearOnEscapePressed:"enableClearOnEscapePressed",preventHomeEndKeyPropagation:"preventHomeEndKeyPropagation",disableScrollToActiveOnOptionsChanged:"disableScrollToActiveOnOptionsChanged",ariaLabel:"ariaLabel",showToggleAllCheckbox:"showToggleAllCheckbox",toggleAllCheckboxChecked:"toggleAllCheckboxChecked",toggleAllCheckboxIndeterminate:"toggleAllCheckboxIndeterminate",toggleAllCheckboxTooltipMessage:"toggleAllCheckboxTooltipMessage",toogleAllCheckboxTooltipPosition:"toogleAllCheckboxTooltipPosition",hideClearSearchButton:"hideClearSearchButton",alwaysRestoreSelectedOptionsMulti:"alwaysRestoreSelectedOptionsMulti"},outputs:{toggleAll:"toggleAll"},features:[e._Bn([{provide:g.JU,useExisting:(0,e.Gpc)(()=>h),multi:!0}])],ngContentSelectors:L,decls:11,vars:14,consts:[["matInput","",1,"mat-select-search-input","mat-select-search-hidden"],[1,"mat-select-search-inner","mat-typography","mat-datepicker-content","mat-tab-header",3,"ngClass"],["innerSelectSearch",""],["class","mat-select-search-toggle-all-checkbox","matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",3,"color","checked","indeterminate","matTooltip","matTooltipPosition","change",4,"ngIf"],["autocomplete","off",1,"mat-select-search-input","mat-input-element",3,"type","formControl","placeholder","keydown","keyup","blur"],["searchSelectInput",""],["class","mat-select-search-spinner","diameter","16",4,"ngIf"],["mat-button","","mat-icon-button","","aria-label","Clear","class","mat-select-search-clear",3,"click",4,"ngIf"],["class","mat-select-search-no-entries-found",4,"ngIf"],["matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",1,"mat-select-search-toggle-all-checkbox",3,"color","checked","indeterminate","matTooltip","matTooltipPosition","change"],["diameter","16",1,"mat-select-search-spinner"],["mat-button","","mat-icon-button","","aria-label","Clear",1,"mat-select-search-clear",3,"click"],[4,"ngIf","ngIfElse"],["defaultIcon",""],[3,"svgIcon"],[1,"mat-select-search-no-entries-found"],["defaultNoEntriesFound",""]],template:function(n,l){1&n&&(e.F$t(_),e._UZ(0,"input",0),e.TgZ(1,"div",1,2),e.YNc(3,o,1,5,"mat-checkbox",3),e.TgZ(4,"input",4,5),e.NdJ("keydown",function(d){return l._handleKeydown(d)})("keyup",function(d){return l._handleKeyup(d)})("blur",function(){return l.onBlur()}),e.qZA(),e.YNc(6,i,1,0,"mat-spinner",6),e.YNc(7,r,4,2,"button",7),e.Hsn(8),e.qZA(),e.YNc(9,A,4,2,"div",8),e.ALo(10,"async")),2&n&&(e.xp6(1),e.Q6J("ngClass",e.WLB(11,v,l.matSelect.multiple,l._isToggleAllCheckboxVisible())),e.xp6(2),e.Q6J("ngIf",l._isToggleAllCheckboxVisible()),e.xp6(1),e.Q6J("type",l.type)("formControl",l._formControl)("placeholder",l.placeholderLabel),e.uIk("aria-label",l.ariaLabel),e.xp6(2),e.Q6J("ngIf",l.searching),e.xp6(1),e.Q6J("ngIf",!l.hideClearSearchButton&&l.value&&!l.searching),e.xp6(2),e.Q6J("ngIf",e.lcZ(10,9,l._showNoEntriesFound$)))},dependencies:[J.oG,G.Ou,Z.lW,Y.Hw,k.mk,k.O5,Q.gM,g.Fj,g.JJ,g.oH,k.Ov],styles:[".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;width:100%;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:4px 4px 0 0;-webkit-transform:translate3d(0,0,0)}.mat-select-search-inner.mat-select-search-inner-multiple[_ngcontent-%COMP%]{width:100%}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-inner[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{flex-basis:auto}.mat-select-search-inner[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{-ms-user-select:text}  .mat-select-search-panel{transform:none!important;overflow-x:hidden}.mat-select-search-input[_ngcontent-%COMP%]{padding:16px 44px 16px 16px;box-sizing:border-box;width:100%}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding:16px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}.mat-select-search-inside-mat-option[_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-top:0;padding-bottom:0;height:3em;line-height:3em}.mat-select-search-inside-mat-option[_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{top:3px}  .mat-option[aria-disabled=true].contains-mat-select-search{position:static;padding:0}  .mat-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-option[aria-disabled=true].contains-mat-select-search .mat-option-pseudo-checkbox{display:none}  .mat-option[aria-disabled=true].contains-mat-select-search.mat-select-search-no-entries-found{height:6em}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:16px;padding-bottom:2px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:16px}"],changeDetection:0}),h})(),re=(()=>{class h{}return h.\u0275fac=function(n){return new(n||h)},h.\u0275mod=e.oAB({type:h}),h.\u0275inj=e.cJS({imports:[[k.ez,g.UX,Z.ot,J.p9,Y.Ps,G.Cq,Q.AV]]}),h})()}}]);
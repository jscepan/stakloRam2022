"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[312],{7707:(M,c,e)=>{e.d(c,{R:()=>P});var i=e(8583),u=e(4333),E=e(7942),a=e(7322),d=e(3722),h=e(3679),o=e(4107),p=e(2024),_=e(8966),A=e(1079),t=e(8287),O=e(6591),y=e(4657),B=e(7716);let P=(()=>{class v{}return v.\u0275fac=function(C){return new(C||v)},v.\u0275mod=B.oAB({type:v}),v.\u0275inj=B.cJS({imports:[[i.ez,u.aw,E.p,p.h,h.UX,d.c,a.lN,o.LD,_.Is,A.Bb,t.n,O.I,y.Co]]}),v})()},7312:(M,c,e)=>{e.r(c),e.d(c,{BuyersModule:()=>W});var i=e(8583),u=e(4655),E=e(7095),a=e(1217),d=e(4794),h=e(3851),o=e(287),p=e(5595),_=e(4463),A=e(7379),t=e(7716),O=e(8794),y=e(4333),B=e(5153),P=e(8933),v=e(4605),T=e(42),C=e(4286),D=e(4237);function f(s,m){if(1&s){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",7),t._uU(2),t.ALo(3,"translate"),t.ALo(4,"lowercase"),t.qZA(),t.TgZ(5,"div",8),t._uU(6),t.qZA(),t.TgZ(7,"div",8),t._uU(8),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA(),t.TgZ(11,"div",7),t._uU(12),t.qZA(),t.TgZ(13,"div",7),t._uU(14),t.qZA(),t.TgZ(15,"div",7),t.TgZ(16,"app-button",9),t.NdJ("clickEvent",function(){const g=t.CHM(n).$implicit;return t.oxw().editBuyer(g.oid)}),t.qZA(),t.qZA(),t.TgZ(17,"div",7),t.TgZ(18,"app-button",9),t.NdJ("clickEvent",function(){const g=t.CHM(n).$implicit;return t.oxw().deleteBuyer(g)}),t.qZA(),t.qZA(),t.BQk()}if(2&s){const n=m.$implicit,r=t.oxw();t.xp6(2),t.Oqu(t.lcZ(3,12,t.lcZ(4,14,n.type||""))),t.xp6(4),t.Oqu(n.name),t.xp6(2),t.Oqu(n.address),t.xp6(2),t.Oqu(n.maticalNumber),t.xp6(2),t.Oqu(n.pib),t.xp6(2),t.Oqu(n.email),t.xp6(2),t.Q6J("iconName","edit")("isTransparentMode",!0)("disabled",!r.hasPrivilege("BUYER_CREATE")),t.xp6(2),t.Q6J("iconName","trash-2")("isTransparentMode",!0)("disabled",!r.hasPrivilege("BUYER_DELETE"))}}const L=[{path:"",component:(()=>{class s{constructor(n,r,l,g,Z,K,F){this.buyerCreateEditPopupService=n,this.webService=r,this.globalService=l,this.translateService=g,this.sweetAlertService=Z,this.listEntities=K,this.authStoreService=F,this.subs=new _.L,this.isLoading=this.listEntities.isLoading,this.entities=this.listEntities.entities,this.keyword=""}ngOnInit(){this.subs.sink=this.listEntities.setWebService(this.webService).requestFirstPage()}hasPrivilege(n){return this.authStoreService.isAllowed(n)}inputSearchHandler(n){const r=new o.h;r.criteriaQuick=n,this.listEntities.setFilter(r)}createBuyer(){this.buyerCreateEditPopupService.openDialog().subscribe(n=>{n&&this.listEntities.requestFirstPage()})}editBuyer(n){this.buyerCreateEditPopupService.openDialog(n).subscribe(r=>{r&&this.listEntities.requestFirstPage()})}deleteBuyer(n){this.subs.sink.$deleteBuyer=this.sweetAlertService.getDataBackFromSweetAlert().subscribe(l=>{l&&l.confirmed&&(this.subs.sink=this.webService.deleteEntity([n]).subscribe(()=>{this.globalService.showBasicAlert(d.I.success,this.translateService.instant("buyerDeleted"),this.translateService.instant("buyerHaveBeenSuccessfullyDeleted")),this.listEntities.requestFirstPage()}))});const r={mode:"warning",icon:"alert-triangle",type:{name:h.N.submit,buttons:{submit:this.translateService.instant("delete"),cancel:this.translateService.instant("cancel")}},title:this.translateService.instant("deleteBuyer"),message:this.translateService.instant("areYouSureYouWantToDeleteTheBuyer")};this.sweetAlertService.openMeSweetAlert(r)}bottomReachedHandler(){this.listEntities.requestNextPage()}ngOnDestroy(){this.subs.unsubscribe()}}return s.\u0275fac=function(n){return new(n||s)(t.Y36(a.X),t.Y36(A.e),t.Y36(O.U),t.Y36(y.sK),t.Y36(B.T),t.Y36(p.y),t.Y36(P.g))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-buyers"]],features:[t._Bn([A.e,a.X,p.y])],decls:34,vars:38,consts:[[1,"container"],[1,"search-bar"],[3,"placeholder","keyword","changeEvent"],[1,"create-button",3,"text","disabled","clickEvent"],["scrollToBottom","",1,"grid-container","standard-grid-table",3,"componentLoading","bottomReached"],[1,"grid-item","header"],[4,"ngFor","ngForOf"],[1,"grid-item"],[1,"grid-item","center"],[3,"iconName","isTransparentMode","disabled","clickEvent"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"app-search-input",2),t.NdJ("changeEvent",function(g){return r.inputSearchHandler(g)}),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"app-button",3),t.NdJ("clickEvent",function(){return r.createBuyer()}),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.TgZ(6,"div",4),t.NdJ("bottomReached",function(){return r.bottomReachedHandler()}),t.ALo(7,"async"),t.TgZ(8,"div",5),t._uU(9),t.ALo(10,"translate"),t.qZA(),t.TgZ(11,"div",5),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.TgZ(14,"div",5),t._uU(15),t.ALo(16,"translate"),t.qZA(),t.TgZ(17,"div",5),t._uU(18),t.ALo(19,"translate"),t.qZA(),t.TgZ(20,"div",5),t._uU(21),t.ALo(22,"translate"),t.qZA(),t.TgZ(23,"div",5),t._uU(24),t.ALo(25,"translate"),t.qZA(),t.TgZ(26,"div",5),t._uU(27),t.ALo(28,"translate"),t.qZA(),t.TgZ(29,"div",5),t._uU(30),t.ALo(31,"translate"),t.qZA(),t.YNc(32,f,19,16,"ng-container",6),t.ALo(33,"async"),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("placeholder",t.lcZ(3,14,"searchFor"))("keyword",r.keyword),t.xp6(2),t.Q6J("text",t.lcZ(5,16,"createBuyer"))("disabled",!r.hasPrivilege("BUYER_CREATE")),t.xp6(2),t.Q6J("componentLoading",t.lcZ(7,18,r.isLoading)||!1),t.xp6(3),t.Oqu(t.lcZ(10,20,"type")),t.xp6(3),t.Oqu(t.lcZ(13,22,"name")),t.xp6(3),t.Oqu(t.lcZ(16,24,"address")),t.xp6(3),t.Oqu(t.lcZ(19,26,"maticalNumber")),t.xp6(3),t.Oqu(t.lcZ(22,28,"pib")),t.xp6(3),t.Oqu(t.lcZ(25,30,"email")),t.xp6(3),t.Oqu(t.lcZ(28,32,"edit")),t.xp6(3),t.Oqu(t.lcZ(31,34,"delete")),t.xp6(2),t.Q6J("ngForOf",t.lcZ(33,36,r.entities)))},directives:[v.J,T.r,C.C,D.T,i.sg],pipes:[y.X$,i.Ov,i.i8],styles:[".container[_ngcontent-%COMP%]{height:calc(100%)}.container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto auto auto auto auto;max-height:calc(100% - 100px);overflow-y:auto}.center[_ngcontent-%COMP%]{text-align:center}.justify[_ngcontent-%COMP%]{text-align:justify}.right[_ngcontent-%COMP%]{text-align:end}"]}),s})(),canActivate:[E.Y],data:{permission:"BUYERS_VIEW"}}];let b=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[u.Bz.forChild(L)],u.Bz]}),s})();var U=e(6460),x=e(2024),R=e(7707),S=e(8287),I=e(8109);let W=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[i.ez,b,y.aw,U.n,x.h,R.R,I.V,S.n]]}),s})()},3749:(M,c,e)=>{e.d(c,{w:()=>d});var i=e(4762),u=e(8902),E=e(8228),a=e(8324);class d extends E.g{constructor(){super(...arguments),this.name="",this.address="",this.maticalNumber="",this.pib="",this.contactPerson="",this.phoneNumberFix="",this.phoneNumberMobile="",this.email=""}}(0,i.gn)([(0,u.D)(()=>a.v)],d.prototype,"city",void 0)},7379:(M,c,e)=>{e.d(c,{e:()=>h});var i=e(4292),u=e(136),E=e(3749),a=e(7716),d=e(7515);let h=(()=>{class o extends i.h{constructor(_){super(_,E.w,u.Hz),this.baseWebService=_}}return o.\u0275fac=function(_){return new(_||o)(a.LFG(d.I))},o.\u0275prov=a.Yz7({token:o,factory:o.\u0275fac}),o})()}}]);
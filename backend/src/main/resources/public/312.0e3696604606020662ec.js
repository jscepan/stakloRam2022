"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[312],{7707:(M,u,e)=>{e.d(u,{R:()=>P});var r=e(8583),d=e(4333),g=e(7942),l=e(7322),_=e(3722),h=e(3679),o=e(4107),p=e(2024),v=e(8966),A=e(1079),t=e(8287),O=e(6591),y=e(7269),B=e(7716);let P=(()=>{class m{}return m.\u0275fac=function(T){return new(T||m)},m.\u0275mod=B.oAB({type:m}),m.\u0275inj=B.cJS({imports:[[r.ez,d.aw,g.p,p.h,h.UX,_.c,l.lN,o.LD,v.Is,A.Bb,t.n,O.I,y.Co]]}),m})()},7312:(M,u,e)=>{e.r(u),e.d(u,{BuyersModule:()=>K});var r=e(8583),d=e(4655),g=e(7095),l=e(1217),_=e(4794),h=e(3851),o=e(287),p=e(5595),v=e(4463),A=e(7379),t=e(7716),O=e(8794),y=e(4333),B=e(5153),P=e(8933),m=e(4605),Z=e(42),T=e(4286),D=e(773);function f(s,a){1&s&&(t.TgZ(0,"div",10),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&s&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"noResults")," "))}function L(s,a){1&s&&(t.TgZ(0,"div",11),t._UZ(1,"mat-spinner"),t.qZA())}function b(s,a){if(1&s){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",12),t._uU(2),t.ALo(3,"translate"),t.ALo(4,"lowercase"),t.qZA(),t.TgZ(5,"div",13),t._uU(6),t.qZA(),t.TgZ(7,"div",13),t._uU(8),t.qZA(),t.TgZ(9,"div",12),t._uU(10),t.qZA(),t.TgZ(11,"div",12),t._uU(12),t.qZA(),t.TgZ(13,"div",12),t._uU(14),t.qZA(),t.TgZ(15,"div",12),t.TgZ(16,"app-button",14),t.NdJ("clickEvent",function(){const E=t.CHM(n).$implicit;return t.oxw().editBuyer(E.oid)}),t.qZA(),t.qZA(),t.TgZ(17,"div",12),t.TgZ(18,"app-button",14),t.NdJ("clickEvent",function(){const E=t.CHM(n).$implicit;return t.oxw().deleteBuyer(E)}),t.qZA(),t.qZA(),t.BQk()}if(2&s){const n=a.$implicit,i=t.oxw();t.xp6(2),t.hij(" ",t.lcZ(3,12,t.lcZ(4,14,n.type||""))," "),t.xp6(4),t.Oqu(n.name),t.xp6(2),t.Oqu(n.address),t.xp6(2),t.Oqu(n.maticalNumber),t.xp6(2),t.Oqu(n.pib),t.xp6(2),t.Oqu(n.email),t.xp6(2),t.Q6J("iconName","edit")("isTransparentMode",!0)("disabled",!i.hasPrivilege("BUYER_CREATE")),t.xp6(2),t.Q6J("iconName","trash-2")("isTransparentMode",!0)("disabled",!i.hasPrivilege("BUYER_DELETE"))}}const U=[{path:"",component:(()=>{class s{constructor(n,i,c,E,C,N,F){this.buyerCreateEditPopupService=n,this.webService=i,this.globalService=c,this.translateService=E,this.sweetAlertService=C,this.listEntities=N,this.authStoreService=F,this.subs=new v.L,this.isLoading=this.listEntities.isLoading,this.entities=this.listEntities.entities,this.totalEntitiesLength=this.listEntities.totalEntitiesLength,this.keyword=""}ngOnInit(){this.subs.sink=this.listEntities.setWebService(this.webService).requestFirstPage()}hasPrivilege(n){return this.authStoreService.isAllowed(n)}inputSearchHandler(n){const i=new o.h;i.criteriaQuick=n,this.listEntities.setFilter(i)}createBuyer(){this.buyerCreateEditPopupService.openDialog().subscribe(n=>{n&&this.listEntities.requestFirstPage()})}editBuyer(n){this.buyerCreateEditPopupService.openDialog(n).subscribe(i=>{i&&this.listEntities.requestFirstPage()})}deleteBuyer(n){this.subs.sink.$deleteBuyer=this.sweetAlertService.getDataBackFromSweetAlert().subscribe(c=>{c&&c.confirmed&&(this.subs.sink=this.webService.deleteEntity([n]).subscribe(()=>{this.globalService.showBasicAlert(_.I.success,this.translateService.instant("buyerDeleted"),this.translateService.instant("buyerHaveBeenSuccessfullyDeleted")),this.listEntities.requestFirstPage()}))});const i={mode:"warning",icon:"alert-triangle",type:{name:h.N.submit,buttons:{submit:this.translateService.instant("delete"),cancel:this.translateService.instant("cancel")}},title:this.translateService.instant("deleteBuyer"),message:this.translateService.instant("areYouSureYouWantToDeleteTheBuyer")};this.sweetAlertService.openMeSweetAlert(i)}bottomReachedHandler(){this.listEntities.requestNextPage()}ngOnDestroy(){this.subs.unsubscribe()}}return s.\u0275fac=function(n){return new(n||s)(t.Y36(l.X),t.Y36(A.e),t.Y36(O.U),t.Y36(y.sK),t.Y36(B.T),t.Y36(p.y),t.Y36(P.g))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-buyers"]],features:[t._Bn([A.e,l.X,p.y])],decls:39,vars:44,consts:[[1,"container"],[1,"search-bar"],[3,"placeholder","keyword","changeEvent"],[1,"create-button",3,"iconName","text","disabled","clickEvent"],["scrollToBottom","",1,"buyers",3,"bottomReached"],[1,"grid-container","standard-grid-table"],[1,"grid-item","header","sticky"],["class","no-results",4,"ngIf"],["class","spinner",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"no-results"],[1,"spinner"],[1,"grid-item"],[1,"grid-item","center"],[3,"iconName","isTransparentMode","disabled","clickEvent"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"app-search-input",2),t.NdJ("changeEvent",function(E){return i.inputSearchHandler(E)}),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"app-button",3),t.NdJ("clickEvent",function(){return i.createBuyer()}),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.TgZ(6,"div",4),t.NdJ("bottomReached",function(){return i.bottomReachedHandler()}),t.TgZ(7,"div",5),t.TgZ(8,"div",6),t._uU(9),t.ALo(10,"translate"),t.qZA(),t.TgZ(11,"div",6),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.TgZ(14,"div",6),t._uU(15),t.ALo(16,"translate"),t.qZA(),t.TgZ(17,"div",6),t._uU(18),t.ALo(19,"translate"),t.qZA(),t.TgZ(20,"div",6),t._uU(21),t.ALo(22,"translate"),t.qZA(),t.TgZ(23,"div",6),t._uU(24),t.ALo(25,"translate"),t.qZA(),t.TgZ(26,"div",6),t._uU(27),t.ALo(28,"translate"),t.qZA(),t.TgZ(29,"div",6),t._uU(30),t.ALo(31,"translate"),t.qZA(),t.YNc(32,f,3,3,"div",7),t.ALo(33,"async"),t.ALo(34,"async"),t.YNc(35,L,2,0,"div",8),t.ALo(36,"async"),t.YNc(37,b,19,16,"ng-container",9),t.ALo(38,"async"),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("placeholder",t.lcZ(3,16,"searchFor"))("keyword",i.keyword),t.xp6(2),t.Q6J("iconName","plus")("text",t.lcZ(5,18,"createBuyer"))("disabled",!i.hasPrivilege("BUYER_CREATE")),t.xp6(5),t.Oqu(t.lcZ(10,20,"type")),t.xp6(3),t.Oqu(t.lcZ(13,22,"name")),t.xp6(3),t.Oqu(t.lcZ(16,24,"address")),t.xp6(3),t.hij(" ",t.lcZ(19,26,"maticalNumber")," "),t.xp6(3),t.Oqu(t.lcZ(22,28,"pib")),t.xp6(3),t.Oqu(t.lcZ(25,30,"email")),t.xp6(3),t.Oqu(t.lcZ(28,32,"edit")),t.xp6(3),t.Oqu(t.lcZ(31,34,"delete")),t.xp6(2),t.Q6J("ngIf",0===t.lcZ(33,36,i.totalEntitiesLength)&&!t.lcZ(34,38,i.isLoading)),t.xp6(3),t.Q6J("ngIf",t.lcZ(36,40,i.isLoading)),t.xp6(2),t.Q6J("ngForOf",t.lcZ(38,42,i.entities)))},directives:[m.J,Z.r,T.C,r.O5,r.sg,D.$g],pipes:[y.X$,r.Ov,r.i8],styles:[".container[_ngcontent-%COMP%]{height:calc(100%);min-width:500px}.container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .buyers[_ngcontent-%COMP%]{height:calc(100% - 100px);overflow-y:auto;margin-top:20px}.container[_ngcontent-%COMP%]   .buyers[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto auto auto auto auto}.center[_ngcontent-%COMP%]{text-align:center}.justify[_ngcontent-%COMP%]{text-align:justify}.right[_ngcontent-%COMP%]{text-align:end}"]}),s})(),canActivate:[g.Y],data:{permission:"BUYERS_VIEW"}}];let x=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[d.Bz.forChild(U)],d.Bz]}),s})();var R=e(6460),S=e(2024),I=e(7707),W=e(8287);let K=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[r.ez,x,y.aw,R.n,S.h,I.R,W.n,D.Cq]]}),s})()},3749:(M,u,e)=>{e.d(u,{w:()=>_});var r=e(4762),d=e(8902),g=e(8228),l=e(8324);class _ extends g.g{constructor(){super(...arguments),this.name="",this.address="",this.maticalNumber="",this.pib="",this.contactPerson="",this.phoneNumberFix="",this.phoneNumberMobile="",this.email=""}}(0,r.gn)([(0,d.D)(()=>l.v)],_.prototype,"city",void 0)},7379:(M,u,e)=>{e.d(u,{e:()=>h});var r=e(4292),d=e(136),g=e(3749),l=e(7716),_=e(7515);let h=(()=>{class o extends r.h{constructor(v){super(v,g.w,d.Hz),this.baseWebService=v}}return o.\u0275fac=function(v){return new(v||o)(l.LFG(_.I))},o.\u0275prov=l.Yz7({token:o,factory:o.\u0275fac}),o})()}}]);
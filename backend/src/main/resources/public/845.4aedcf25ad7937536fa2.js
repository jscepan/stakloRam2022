"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[845],{5845:(v,d,e)=>{e.r(d),e.d(d,{PasswordChangeModule:()=>y});var a=e(8583),u=e(9805),m=e(7942),h=e(7322),r=e(680),o=e(3679),g=e(4107),P=e(2024),p=e(4655),f=e(6240),w=e(4794),x=e(5595),C=e(4463),Z=e(7865),t=e(7716),b=e(8794),M=e(1928),A=e(8933),S=e(42);function O(s,l){if(1&s){const n=t.EpF();t.TgZ(0,"form",4),t.TgZ(1,"div",5),t.TgZ(2,"mat-form-field"),t.TgZ(3,"mat-label"),t._uU(4),t.ALo(5,"translate"),t.qZA(),t._UZ(6,"input",6),t.qZA(),t.TgZ(7,"mat-form-field"),t.TgZ(8,"mat-label"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"input",7),t.qZA(),t.TgZ(12,"mat-form-field"),t.TgZ(13,"mat-label"),t._uU(14),t.ALo(15,"translate"),t.qZA(),t._UZ(16,"input",8),t.qZA(),t.TgZ(17,"mat-form-field"),t.TgZ(18,"mat-label"),t._uU(19),t.ALo(20,"translate"),t.qZA(),t._UZ(21,"input",9),t.qZA(),t.qZA(),t.TgZ(22,"div",10),t.TgZ(23,"app-button",11),t.NdJ("clickEvent",function(){return t.CHM(n),t.oxw().cancel()}),t.ALo(24,"translate"),t.qZA(),t.TgZ(25,"app-button",12),t.NdJ("clickEvent",function(){return t.CHM(n),t.oxw().handleSubmitButton()}),t.ALo(26,"translate"),t.qZA(),t.qZA(),t.qZA()}if(2&s){const n=t.oxw();t.Q6J("formGroup",n.formGroup),t.xp6(3),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(5,27,"username")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(10,29,"oldPassword")," "),t.xp6(2),t.Q6J("type","password"),t.xp6(2),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(15,31,"newPassword")," "),t.xp6(2),t.Q6J("type","password"),t.xp6(2),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(20,33,"newPasswordRepeat")," "),t.xp6(2),t.Q6J("type","password"),t.xp6(2),t.Q6J("text",t.lcZ(24,35,"cancel")),t.xp6(2),t.Q6J("text",t.lcZ(26,37,"save"))("disabled",!n.formGroup.dirty||n.formGroup.invalid)}}const E=[{path:"",component:(()=>{class s{constructor(n,i,c,I,L,N){this.router=n,this.globalService=i,this.webService=c,this.translateService=I,this.localStorageService=L,this.authStoreService=N,this.subs=new C.L,this.username=""}ngOnInit(){var n;this.formGroup=new o.cw({username:new o.NI(null===(n=this.authStoreService.user)||void 0===n?void 0:n.username,[o.kI.required]),oldPassword:new o.NI("",[o.kI.required]),newPassword:new o.NI("",[o.kI.required]),newPasswordRepeat:new o.NI("",[o.kI.required])})}cancel(){this.router.navigate(["/"])}handleSubmitButton(){var n,i;(null===(n=this.formGroup.get("newPassword"))||void 0===n?void 0:n.value)===(null===(i=this.formGroup.get("newPasswordRepeat"))||void 0===i?void 0:i.value)?this.webService.changePassword(this.formGroup.value).subscribe(c=>{c&&c.jwt&&(this.localStorageService.set("jwt",`Bearer ${c.jwt}`),this.globalService.showBasicAlert(w.I.success,this.translateService.instant("success"),this.translateService.instant("passwordSuccessfullyChanged")))}):this.globalService.showBasicAlert(w.I.error,this.translateService.instant("error"),this.translateService.instant("newPasswordDontMatch"))}ngOnDestroy(){this.subs.unsubscribe()}}return s.\u0275fac=function(n){return new(n||s)(t.Y36(p.F0),t.Y36(b.U),t.Y36(f.r),t.Y36(u.sK),t.Y36(M.n),t.Y36(A.g))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-password-change"]],features:[t._Bn([f.r,Z.T,x.y])],decls:7,vars:4,consts:[[1,"wrapper"],[1,"container"],[1,"title"],["class","form",3,"formGroup",4,"ngIf"],[1,"form",3,"formGroup"],[1,"row"],["matInput","","formControlName","username","readonly",""],["matInput","","formControlName","oldPassword",3,"type"],["matInput","","formControlName","newPassword",3,"type"],["matInput","","formControlName","newPasswordRepeat",3,"type"],[1,"button-section"],["color","secondary",1,"cancel",3,"text","clickEvent"],[1,"update",3,"text","disabled","clickEvent"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h3"),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.YNc(6,O,27,39,"form",3),t.qZA(),t.qZA()),2&n&&(t.xp6(4),t.hij(" ",t.lcZ(5,2,"passwordChange")," "),t.xp6(2),t.Q6J("ngIf",i.formGroup))},directives:[a.O5,o._Y,o.JL,o.sg,h.KE,h.hX,r.Nt,o.Fj,o.JJ,o.u,S.r],pipes:[u.X$],styles:[".container[_ngcontent-%COMP%]{height:100%;width:100%}.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;border-bottom:2px dotted var(--color-main-light)}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{flex-direction:column;margin-top:20px;display:flex}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .button-section[_ngcontent-%COMP%]{display:flex;width:100%;height:100px;flex-direction:row;align-items:center;justify-content:space-between;border-top:2px dotted var(--color-main-light)}"]}),s})()}];let T=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[p.Bz.forChild(E)],p.Bz]}),s})(),y=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[a.ez,T,u.aw,m.p,P.h,o.UX,r.c,h.lN,g.LD]]}),s})()},287:(v,d,e)=>{e.d(d,{h:()=>a});class a{constructor(){this.criteriaQuick="",this.objectsOIDS=[],this.attributes=[],this.ordering="ASC"}}},5595:(v,d,e)=>{e.d(d,{y:()=>m});var a=e(6215),u=e(287);class m{constructor(){this.entities$=new a.X([]),this.totalEntitiesLength$=new a.X(void 0),this.bottomReached$=new a.X(!1),this.isLoading$=new a.X(!1),this.entities=this.entities$.asObservable(),this.totalEntitiesLength=this.totalEntitiesLength$.asObservable(),this.isLoading=this.isLoading$.asObservable(),this.searchModel=new u.h,this.NUMBER_OF_ITEMS_ON_PAGE=50}get numberOfItemsOnPage(){return this.NUMBER_OF_ITEMS_ON_PAGE}setWebService(r){return this.webService=r,this}setOrdering(r){return this.searchModel.ordering=r,this}setFilter(r){this.searchModel=r,this.requestFirstPage()}requestFirstPage(){this.bottomReached$.next(!1),this.entities$.next([]),this.totalEntitiesLength$.next(0),this.requestNextPage()}requestNextPage(){var r;this.bottomReached$.getValue()||(this.isLoading$.next(!0),null===(r=this.webService)||void 0===r||r.searchEntities(this.searchModel,this.entities$.getValue().length||0,this.NUMBER_OF_ITEMS_ON_PAGE).subscribe(o=>{this.entities$.next(this.entities$.getValue().concat(o.entities));const g=this.entities$.getValue().length||0;this.bottomReached$.next(!(g<o.totalCount)),this.totalEntitiesLength$.next(o.totalCount),this.isLoading$.next(!1)}))}}}}]);
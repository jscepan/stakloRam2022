"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[49],{7049:(v,h,e)=>{e.r(h),e.d(h,{UserProfileModule:()=>w});var o=e(9808),d=e(9285),a=e(5131),s=e(7322),c=e(7531),i=e(3075),f=e(4107),p=e(2024),b=e(8555),P=e(4794),A=e(5595),O=e(4463),M=e(5327),x=e(6254),t=e(5e3),E=e(8794),U=e(7070),C=e(8933),Z=e(508),I=e(42);function N(r,l){if(1&r&&(t.TgZ(0,"mat-option",14),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&r){const n=l.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",t.lcZ(2,2,n)," ")}}function S(r,l){if(1&r){const n=t.EpF();t.TgZ(0,"form",4)(1,"div",5)(2,"mat-form-field")(3,"mat-label"),t._uU(4),t.ALo(5,"translate"),t.qZA(),t._UZ(6,"input",6),t.qZA(),t.TgZ(7,"mat-form-field")(8,"mat-label"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"input",7),t.qZA(),t.TgZ(12,"mat-form-field")(13,"mat-label"),t._uU(14),t.ALo(15,"translate"),t.qZA(),t._UZ(16,"input",8),t.qZA(),t.TgZ(17,"mat-form-field")(18,"mat-label"),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.TgZ(21,"mat-select",9),t.YNc(22,N,3,4,"mat-option",10),t.qZA()()(),t.TgZ(23,"div",11)(24,"app-button",12),t.NdJ("clickEvent",function(){return t.CHM(n),t.oxw().cancel()}),t.ALo(25,"translate"),t.qZA(),t.TgZ(26,"app-button",13),t.NdJ("clickEvent",function(){return t.CHM(n),t.oxw().handleSubmitButton()}),t.ALo(27,"translate"),t.qZA()()()}if(2&r){const n=t.oxw();t.Q6J("formGroup",n.formGroup),t.xp6(3),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(5,25,"username")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(10,27,"fullName")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(15,29,"email")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(20,31,"language")," "),t.xp6(3),t.Q6J("ngForOf",n.languages),t.xp6(2),t.Q6J("text",t.lcZ(25,33,"cancel")),t.xp6(2),t.Q6J("text",t.lcZ(27,35,"save"))("disabled",!n.formGroup.dirty||n.formGroup.invalid)}}const L=[{path:"",component:(()=>{class r{constructor(n,u,m,g,$){this.globalService=n,this.webService=u,this.translateService=m,this.languageService=g,this.authStoreService=$,this.subs=new O.L,this.languages=this.languageService.supportedLanguages}ngOnInit(){var n,u,m,g;this.user=this.authStoreService.user,this.formGroup=new i.cw({username:new i.NI((null===(n=this.user)||void 0===n?void 0:n.username)||"",[i.kI.required]),fullName:new i.NI((null===(u=this.user)||void 0===u?void 0:u.fullName)||"",[i.kI.required]),email:new i.NI((null===(m=this.user)||void 0===m?void 0:m.email)||"",[i.kI.required,i.kI.email]),language:new i.NI((null===(g=this.user)||void 0===g?void 0:g.language)||this.languages[0],[i.kI.required])})}cancel(){}handleSubmitButton(){this.user&&this.webService.updateUserProfile(this.user.oid,this.formGroup.value).subscribe(n=>{n&&(this.authStoreService.user=n,this.languageService.changeLanguage(n.language),this.globalService.showBasicAlert(P.I.success,this.translateService.instant("success"),this.translateService.instant("profileSuccessfullyUpdated")))})}ngOnDestroy(){this.subs.unsubscribe()}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(E.U),t.Y36(x.u),t.Y36(d.sK),t.Y36(U.T),t.Y36(C.g))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-user-profile"]],features:[t._Bn([x.u,M.T,A.y])],decls:7,vars:4,consts:[[1,"wrapper"],[1,"container"],[1,"title"],["class","form",3,"formGroup",4,"ngIf"],[1,"form",3,"formGroup"],[1,"row"],["matInput","","formControlName","username"],["matInput","","formControlName","fullName"],["matInput","","formControlName","email"],["formControlName","language"],[3,"value",4,"ngFor","ngForOf"],[1,"button-section"],["color","secondary",1,"cancel",3,"text","clickEvent"],[1,"update",3,"text","disabled","clickEvent"],[3,"value"]],template:function(n,u){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3"),t._uU(4),t.ALo(5,"translate"),t.qZA()(),t.YNc(6,S,28,37,"form",3),t.qZA()()),2&n&&(t.xp6(4),t.hij(" ",t.lcZ(5,2,"userProfile")," "),t.xp6(2),t.Q6J("ngIf",u.formGroup))},directives:[o.O5,i._Y,i.JL,i.sg,s.KE,s.hX,c.Nt,i.Fj,i.JJ,i.u,f.gD,o.sg,Z.ey,I.r],pipes:[d.X$],styles:[".container[_ngcontent-%COMP%]{height:100%;width:100%}.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;border-bottom:2px dotted var(--color-main-light)}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{flex-direction:column;margin-top:20px;display:flex}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:column}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .button-section[_ngcontent-%COMP%]{display:flex;width:100%;height:100px;flex-direction:row;align-items:center;justify-content:space-between;border-top:2px dotted var(--color-main-light)}"]}),r})()}];let T=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[b.Bz.forChild(L)],b.Bz]}),r})(),w=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[o.ez,T,d.aw,a.p,p.h,i.UX,c.c,s.lN,f.LD]]}),r})()},287:(v,h,e)=>{e.d(h,{h:()=>o});class o{constructor(){this.criteriaQuick="",this.betweenAttributes=[],this.ordering="ASC"}getBetweenAttributes(){return this.betweenAttributes}addBetweenAttribute(a){let s=this.betweenAttributes.findIndex(c=>c.attribute===a.attribute);s<0?this.betweenAttributes.push(a):this.betweenAttributes[s]=a}clearAllBetweenAttributes(){this.betweenAttributes=[]}removeBetweenAttribute(a){let s=this.betweenAttributes.findIndex(c=>c.attribute===a);s>=0&&this.betweenAttributes.splice(s,1)}}},5595:(v,h,e)=>{e.d(h,{y:()=>s});var o=e(591),d=e(537),a=e(287);class s{constructor(){this.entities$=new o.X([]),this.totalEntitiesLength$=new o.X(void 0),this.bottomReached$=new o.X(!1),this.isLoading$=new o.X(!1),this.entities=this.entities$.asObservable(),this.totalEntitiesLength=this.totalEntitiesLength$.asObservable(),this.isLoading=this.isLoading$.asObservable(),this.searchModel=new a.h,this.NUMBER_OF_ITEMS_ON_PAGE=50}get numberOfItemsOnPage(){return this.NUMBER_OF_ITEMS_ON_PAGE}set numberOfItemsOnPage(i){this.NUMBER_OF_ITEMS_ON_PAGE=i,this.requestFirstPage()}resetNumberOfItemsOnPage(){this.NUMBER_OF_ITEMS_ON_PAGE=50,this.requestFirstPage()}setWebService(i){return this.webService=i,this}setOrdering(i){return this.searchModel.ordering=i,this}setFilter(i){this.searchModel=i,this.requestFirstPage()}requestFirstPage(){this.bottomReached$.next(!1),this.entities$.next([]),this.totalEntitiesLength$.next(0),this.requestNextPage()}requestNextPage(){var i;this.bottomReached$.getValue()||(this.isLoading$.next(!0),null===(i=this.webService)||void 0===i||i.searchEntities(this.searchModel,this.entities$.getValue().length||0,this.NUMBER_OF_ITEMS_ON_PAGE).pipe((0,d.x)(()=>{this.isLoading$.next(!1)})).subscribe(f=>{this.entities$.next(this.entities$.getValue().concat(f.entities));const p=this.entities$.getValue().length||0;this.bottomReached$.next(!(p<f.totalCount)),this.totalEntitiesLength$.next(f.totalCount)}))}}}}]);
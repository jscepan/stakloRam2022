"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[18],{6225:(D,d,e)=>{e.d(d,{y:()=>C});var i=e(8583),l=e(4333),u=e(2024),s=e(7707),c=e(3679),O=e(7322),M=e(3722),g=e(4107),A=e(6591),P=e(4657),h=e(7012),t=e(7716);let C=(()=>{class a{}return a.\u0275fac=function(m){return new(m||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[i.ez,l.aw,u.h,s.R,c.UX,M.c,O.lN,g.LD,A.I,P.Co,h.o]]}),a})()},7707:(D,d,e)=>{e.d(d,{R:()=>p});var i=e(8583),l=e(4333),u=e(7942),s=e(7322),c=e(3722),O=e(3679),M=e(4107),g=e(2024),A=e(8966),P=e(1079),h=e(8287),t=e(6591),C=e(4657),a=e(7716);let p=(()=>{class m{}return m.\u0275fac=function(Z){return new(Z||m)},m.\u0275mod=a.oAB({type:m}),m.\u0275inj=a.cJS({imports:[[i.ez,l.aw,u.p,g.h,O.UX,c.c,s.lN,M.LD,A.Is,P.Bb,h.n,t.I,C.Co]]}),m})()},3283:(D,d,e)=>{e.r(d),e.d(d,{WorkOrdersModule:()=>S});var i=e(8583),l=e(4655),u=e(7095),s=e(4794),c=e(3851),O=e(5153),M=e(287),g=e(5595),A=e(4463),P=e(2134),h=e(2050),t=e(7716),C=e(8794),a=e(4333),p=e(4605),m=e(42),W=e(4286),Z=e(4237);function f(r,E){if(1&r){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",8),t._uU(2),t.qZA(),t.TgZ(3,"div",8),t._uU(4),t.qZA(),t.TgZ(5,"div",8),t._uU(6),t.ALo(7,"date"),t.qZA(),t.TgZ(8,"div",9),t._uU(9),t.qZA(),t.TgZ(10,"div",9),t._uU(11),t.qZA(),t.TgZ(12,"div",9),t._uU(13),t.qZA(),t.TgZ(14,"div",8),t.TgZ(15,"app-button",10),t.NdJ("clickEvent",function(){const v=t.CHM(n).$implicit;return t.oxw().viewWorkOrder(v.oid)}),t.qZA(),t.qZA(),t.TgZ(16,"div",8),t.TgZ(17,"app-button",10),t.NdJ("clickEvent",function(){const v=t.CHM(n).$implicit;return t.oxw().editWorkOrder(v.oid)}),t.qZA(),t.qZA(),t.TgZ(18,"div",8),t.TgZ(19,"app-button",10),t.NdJ("clickEvent",function(){const v=t.CHM(n).$implicit;return t.oxw().deleteWorkOrder(v)}),t.qZA(),t.qZA(),t.BQk()}if(2&r){const n=E.$implicit,o=t.oxw();t.xp6(2),t.hij(" ",n.buyer.name," "),t.xp6(2),t.hij(" ",o.getWorkOrderNumber(n)," "),t.xp6(2),t.hij(" ",t.xi3(7,12,n.dateOfCreate,"dd.MM.yyyy")," "),t.xp6(3),t.hij(" ",n.forPerson," "),t.xp6(2),t.hij(" ",n.description," "),t.xp6(2),t.hij(" ",n.note," "),t.xp6(2),t.Q6J("iconName","eye")("isTransparentMode",!0),t.xp6(2),t.Q6J("iconName","edit")("isTransparentMode",!0),t.xp6(2),t.Q6J("iconName","trash-2")("isTransparentMode",!0)}}const L=[{path:"",component:(()=>{class r{constructor(n,o,_,v,T,N){this.globalService=n,this.translateService=o,this.webService=_,this.sweetAlertService=v,this.listEntities=T,this.router=N,this.subs=new A.L,this.isLoading=this.listEntities.isLoading,this.entities=this.listEntities.entities,this.keyword="",this.getWorkOrderNumber=P.Nw}ngOnInit(){this.subs.sink=this.listEntities.setWebService(this.webService).setOrdering("DESC").requestFirstPage()}inputSearchHandler(n){const o=new M.h;o.criteriaQuick=n,this.listEntities.setFilter(o)}createWorkOrder(){this.router.navigate(["work-orders","create"])}viewWorkOrder(n){window.open("#/print/work-order-view/"+n)}editWorkOrder(n){this.router.navigate(["work-orders","edit",n])}deleteWorkOrder(n){this.subs.sink.$deleteWorkOrder=this.sweetAlertService.getDataBackFromSweetAlert().subscribe(_=>{_&&_.confirmed&&(this.subs.sink=this.webService.deleteEntity([n]).subscribe(()=>{this.globalService.showBasicAlert(s.I.success,this.translateService.instant("workOrderDeleted"),this.translateService.instant("workOrderHaveBeenSuccessfullyDeleted")),this.listEntities.requestFirstPage()}))});const o={mode:"warning",icon:"alert-triangle",type:{name:c.N.submit,buttons:{submit:this.translateService.instant("delete"),cancel:this.translateService.instant("cancel")}},title:this.translateService.instant("deleteWorkOrder"),message:this.translateService.instant("areYouSureYouWantToDeleteTheWorkOrder")};this.sweetAlertService.openMeSweetAlert(o)}bottomReachedHandler(){this.listEntities.requestNextPage()}ngOnDestroy(){this.subs.unsubscribe()}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(C.U),t.Y36(a.sK),t.Y36(h.o),t.Y36(O.T),t.Y36(g.y),t.Y36(l.F0))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-work-orders"]],features:[t._Bn([h.o,O.T,g.y])],decls:38,vars:40,consts:[[1,"container"],[1,"search-bar"],[3,"placeholder","keyword","changeEvent"],[3,"text","clickEvent"],["scrollToBottom","",1,"workOrders",3,"componentLoading","bottomReached"],[1,"grid-container","standard-grid-table"],[1,"grid-item","header"],[4,"ngFor","ngForOf"],[1,"grid-item"],[1,"grid-item","align-left"],[3,"iconName","isTransparentMode","clickEvent"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"app-search-input",2),t.NdJ("changeEvent",function(v){return o.inputSearchHandler(v)}),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"app-button",3),t.NdJ("clickEvent",function(){return o.createWorkOrder()}),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.TgZ(6,"div",4),t.NdJ("bottomReached",function(){return o.bottomReachedHandler()}),t.ALo(7,"async"),t.TgZ(8,"div",5),t.TgZ(9,"div",6),t._uU(10),t.ALo(11,"translate"),t.qZA(),t.TgZ(12,"div",6),t._uU(13),t.ALo(14,"translate"),t.qZA(),t.TgZ(15,"div",6),t._uU(16),t.ALo(17,"translate"),t.qZA(),t.TgZ(18,"div",6),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.TgZ(21,"div",6),t._uU(22),t.ALo(23,"translate"),t.qZA(),t.TgZ(24,"div",6),t._uU(25),t.ALo(26,"translate"),t.qZA(),t.TgZ(27,"div",6),t._uU(28),t.ALo(29,"translate"),t.qZA(),t.TgZ(30,"div",6),t._uU(31),t.ALo(32,"translate"),t.qZA(),t.TgZ(33,"div",6),t._uU(34),t.ALo(35,"translate"),t.qZA(),t.YNc(36,f,20,15,"ng-container",7),t.ALo(37,"async"),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("placeholder",t.lcZ(3,14,"searchFor"))("keyword",o.keyword),t.xp6(2),t.Q6J("text",t.lcZ(5,16,"createWorkOrder")),t.xp6(2),t.Q6J("componentLoading",t.lcZ(7,18,o.isLoading)||!1),t.xp6(4),t.hij(" ",t.lcZ(11,20,"buyerName")," "),t.xp6(3),t.hij(" ",t.lcZ(14,22,"number")," "),t.xp6(3),t.hij(" ",t.lcZ(17,24,"date")," "),t.xp6(3),t.hij(" ",t.lcZ(20,26,"forPerson")," "),t.xp6(3),t.hij(" ",t.lcZ(23,28,"description")," "),t.xp6(3),t.hij(" ",t.lcZ(26,30,"note")," "),t.xp6(3),t.hij(" ",t.lcZ(29,32,"view")," "),t.xp6(3),t.hij(" ",t.lcZ(32,34,"edit")," "),t.xp6(3),t.hij(" ",t.lcZ(35,36,"delete")," "),t.xp6(2),t.Q6J("ngForOf",t.lcZ(37,38,o.entities)))},directives:[p.J,m.r,W.C,Z.T,i.sg],pipes:[a.X$,i.Ov,i.uU],styles:["[_nghost-%COMP%]{display:flex;height:calc(100%)}.container[_ngcontent-%COMP%]{height:calc(100%)}.container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]{height:calc(100% - 120px);overflow-y:auto;margin-top:20px}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto auto auto auto auto auto}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.align-left[_ngcontent-%COMP%]{justify-content:flex-start}"]}),r})(),canActivate:[u.Y],data:{permission:"WORK_ORDERS_VIEW"}},{path:"create",loadChildren:()=>Promise.all([e.e(253),e.e(217),e.e(425),e.e(561)]).then(e.bind(e,561)).then(r=>r.WorkOrderCreateEditModule)},{path:"edit/:workOrderOID",loadChildren:()=>Promise.all([e.e(253),e.e(217),e.e(425),e.e(561)]).then(e.bind(e,561)).then(r=>r.WorkOrderCreateEditModule)}];let U=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[l.Bz.forChild(L)],l.Bz]}),r})();var x=e(2024),y=e(2763),B=e(6460),R=e(8109),I=e(8287),K=e(6225);let S=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[i.ez,U,a.aw,x.h,y.i,B.n,R.V,I.n,K.y]]}),r})()},7012:(D,d,e)=>{e.d(d,{o:()=>u});var i=e(8583),l=e(7716);let u=(()=>{class s{}return s.\u0275fac=function(O){return new(O||s)},s.\u0275mod=l.oAB({type:s}),s.\u0275inj=l.cJS({imports:[[i.ez]]}),s})()},3749:(D,d,e)=>{e.d(d,{w:()=>c});var i=e(4762),l=e(8902),u=e(8228),s=e(8324);class c extends u.g{constructor(){super(...arguments),this.name="",this.address="",this.maticalNumber="",this.pib="",this.contactPerson="",this.phoneNumberFix="",this.phoneNumberMobile="",this.email=""}}(0,i.gn)([(0,l.D)(()=>s.v)],c.prototype,"city",void 0)}}]);
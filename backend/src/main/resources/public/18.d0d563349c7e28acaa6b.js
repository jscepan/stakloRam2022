"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[18],{3283:(U,u,e)=>{e.r(u),e.d(u,{WorkOrdersModule:()=>X});var l=e(9808),c=e(4655),m=e(7095),p=e(8939),h=e(4794),v=e(3851),A=e(5153),y=e(287),f=e(5595),M=e(4463),b=e(2134),T=e(2050),t=e(7716),L=e(8794),O=e(4333),S=e(8933),w=e(4605),k=e(7446),g=e(3679),Z=e(7322),C=e(3722),x=e(4107),P=e(1862),N=e(42),R=e(4286),E=e(773),W=e(7238);function _(r,a){1&r&&(t.TgZ(0,"div",18),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&r&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"noResults")," "))}function D(r,a){1&r&&(t.TgZ(0,"div",19),t._UZ(1,"mat-spinner"),t.qZA())}function F(r,a){if(1&r&&(t.ynx(0),t.YNc(1,_,3,3,"div",16),t.ALo(2,"async"),t.ALo(3,"async"),t.YNc(4,D,2,0,"div",17),t.ALo(5,"async"),t.BQk()),2&r){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",0===t.lcZ(2,2,n.totalEntitiesLength)&&!t.lcZ(3,4,n.isLoading)),t.xp6(3),t.Q6J("ngIf",t.lcZ(5,6,n.isLoading))}}function J(r,a){1&r&&(t.TgZ(0,"div",18),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&r&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"noResults")," "))}function I(r,a){1&r&&(t.TgZ(0,"div",19),t._UZ(1,"mat-spinner"),t.qZA())}function j(r,a){if(1&r&&(t.ynx(0),t.YNc(1,J,3,3,"div",16),t.YNc(2,I,2,0,"div",17),t.BQk()),2&r){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",0===n.totalEntitiesLengthUnsettled&&!n.isLoadingUnsettled),t.xp6(1),t.Q6J("ngIf",n.isLoadingUnsettled)}}function B(r,a){if(1&r){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",20),t._uU(2),t.qZA(),t.TgZ(3,"div",20),t._uU(4),t.qZA(),t.TgZ(5,"div",20),t._uU(6),t.ALo(7,"date"),t.qZA(),t.TgZ(8,"div",21),t._uU(9),t.qZA(),t.TgZ(10,"div",21),t._uU(11),t.qZA(),t.TgZ(12,"div",21),t._uU(13),t.qZA(),t.TgZ(14,"div",20),t.TgZ(15,"app-button",22),t.NdJ("clickEvent",function(){const o=t.CHM(n).$implicit;return t.oxw().viewWorkOrder(o.oid)}),t.ALo(16,"translate"),t.qZA(),t.qZA(),t.TgZ(17,"div",20),t.TgZ(18,"app-button",22),t.NdJ("clickEvent",function(){const o=t.CHM(n).$implicit;return t.oxw().editWorkOrder(o.oid)}),t.ALo(19,"translate"),t.qZA(),t.qZA(),t.TgZ(20,"div",20),t.TgZ(21,"app-button",22),t.NdJ("clickEvent",function(){const o=t.CHM(n).$implicit;return t.oxw().deleteWorkOrder(o)}),t.ALo(22,"translate"),t.qZA(),t.qZA(),t.TgZ(23,"div",20),t.TgZ(24,"app-button",22),t.NdJ("clickEvent",function(){const o=t.CHM(n).$implicit;return t.oxw().toggleSettledForWorkOrder(o)}),t.ALo(25,"translate"),t.qZA(),t.qZA(),t.BQk()}if(2&r){const n=a.$implicit,i=t.oxw();t.xp6(2),t.hij(" ",n.buyer.name," "),t.xp6(2),t.hij(" ",i.getWorkOrderNumber(n)," "),t.xp6(2),t.hij(" ",t.xi3(7,22,n.dateOfCreate,"dd.MM.yyyy")," "),t.xp6(3),t.hij(" ",n.forPerson," "),t.xp6(2),t.hij(" ",n.description," "),t.xp6(2),t.hij(" ",n.note," "),t.xp6(2),t.Q6J("iconName","eye")("isTransparentMode",!0)("disabled",!i.hasPrivilege("WORK_ORDER_VIEW"))("matTooltip",t.lcZ(16,25,"view")),t.xp6(3),t.Q6J("iconName","edit")("isTransparentMode",!0)("disabled",!i.hasPrivilege("WORK_ORDER_CREATE"))("matTooltip",t.lcZ(19,27,"update")),t.xp6(3),t.Q6J("iconName","trash-2")("isTransparentMode",!0)("disabled",!i.hasPrivilege("WORK_ORDER_DELETE"))("matTooltip",t.lcZ(22,29,"delete")),t.xp6(3),t.Q6J("iconName","check-square")("isTransparentMode",!0)("disabled",!i.hasPrivilege("INVOICE_CREATE"))("matTooltip",t.lcZ(25,31,i.showOnlyUnsettled?"markWorkOrderItemsAsSettled":"markWorkOrderItemsAsUnsettled"))}}const Y=function(){return{standalone:!0}},Q=[{path:"",component:(()=>{class r{constructor(n,i,s,o,d,G,tt){this.globalService=n,this.translateService=i,this.webService=s,this.sweetAlertService=o,this.listEntities=d,this.router=G,this.authStoreService=tt,this.subs=new M.L,this.isLoading=this.listEntities.isLoading,this.entities=this.listEntities.entities,this.totalEntitiesLength=this.listEntities.totalEntitiesLength,this.keyword="",this.getWorkOrderNumber=b.Nw,this.showOnlyUnsettled=!1,this.isLoadingUnsettled=!0,this.searchFilter=new y.h}ngOnInit(){this.searchFilter.ordering="DESC",this.listEntities.setWebService(this.webService).setOrdering("DESC").requestFirstPage()}loadAllUnsettledWorkOrders(){this.isLoadingUnsettled=!0,this.entitiesUnsettled=[],this.totalEntitiesLengthUnsettled=0,this.subs.sink=this.webService.getAllUnsettledWorkOrderForBuyer("").pipe((0,p.x)(()=>{this.isLoadingUnsettled=!1})).subscribe(n=>{this.entitiesUnsettled=n,this.totalEntitiesLengthUnsettled=n.length})}inputSearchHandler(n){this.searchFilter.criteriaQuick=n,this.listEntities.setFilter(this.searchFilter)}dateChanged(n,i){var s,o;if(null===(s=i.target)||void 0===s?void 0:s.value){const d={attribute:"from"===n?"from_date":"to_date",attributeValue:null===(o=i.target)||void 0===o?void 0:o.value,attributeType:"DATE",type:"from"===n?"GREATER_OR_EQUAL":"SMALLER_OR_EQUAL"};this.searchFilter.addBetweenAttribute(d)}else"from"===n?this.searchFilter.removeBetweenAttribute("from_date"):"to"===n&&this.searchFilter.removeBetweenAttribute("to_date");this.listEntities.setFilter(this.searchFilter)}createWorkOrder(){this.router.navigate(["work-orders","create"])}viewWorkOrder(n){window.open("#/print/work-order-view/"+n)}editWorkOrder(n){this.router.navigate(["work-orders","edit",n])}deleteWorkOrder(n){this.subs.sink.$deleteWorkOrder=this.sweetAlertService.getDataBackFromSweetAlert().subscribe(s=>{s&&s.confirmed&&(this.subs.sink=this.webService.deleteEntity([n]).subscribe(()=>{this.globalService.showBasicAlert(h.I.success,this.translateService.instant("workOrderDeleted"),this.translateService.instant("workOrderHaveBeenSuccessfullyDeleted")),this.listEntities.requestFirstPage()}))});const i={mode:"warning",icon:"alert-triangle",type:{name:v.N.submit,buttons:{submit:this.translateService.instant("delete"),cancel:this.translateService.instant("cancel")}},title:this.translateService.instant("deleteWorkOrder"),message:this.translateService.instant("areYouSureYouWantToDeleteTheWorkOrder")};this.sweetAlertService.openMeSweetAlert(i)}toggleSettledForWorkOrder(n){this.subs.sink.$markWorkOrder=this.sweetAlertService.getDataBackFromSweetAlert().subscribe(s=>{s&&s.confirmed&&(this.subs.sink=this.webService.changeWorkOrderSettledStatus(n.oid,this.showOnlyUnsettled).subscribe(o=>{o&&(this.globalService.showBasicAlert(h.I.success,this.translateService.instant("successfully"),this.translateService.instant("workOrderIsSuccessfullyUpdated")),this.loadAllUnsettledWorkOrders())}))});const i={mode:"warning",icon:"alert-triangle",type:{name:v.N.submit,buttons:{submit:this.translateService.instant("mark"),cancel:this.translateService.instant("cancel")}},title:this.translateService.instant("markWorkOrderItems"),message:this.translateService.instant(this.showOnlyUnsettled?"areYouSureYouWantToMarkAllWorkOrderItemsAsInvoiced":"areYouSureYouWantToMarkAllWorkOrderItemsAsUninvoiced")};this.sweetAlertService.openMeSweetAlert(i)}bottomReachedHandler(){this.listEntities.requestNextPage()}hasPrivilege(n){return this.authStoreService.isAllowed(n)}viewUnsettled(){this.showOnlyUnsettled?this.loadAllUnsettledWorkOrders():this.listEntities.requestFirstPage()}orderBy(n){this.searchFilter.ordering=n,this.listEntities.setFilter(this.searchFilter)}ngOnDestroy(){this.subs.unsubscribe()}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(L.U),t.Y36(O.sK),t.Y36(T.o),t.Y36(A.T),t.Y36(f.y),t.Y36(c.F0),t.Y36(S.g))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-work-orders"]],features:[t._Bn([T.o,A.T,f.y])],decls:67,vars:78,consts:[[1,"container"],[1,"search-bar"],[3,"placeholder","keyword","changeEvent"],[1,"date-filter"],[1,"create-buyer-button",3,"color","ngModel","ngModelOptions","ngModelChange","change"],[1,"min-with"],["type","date","matInput","",3,"change"],[3,"valueChange"],["value","ASC"],["value","DESC"],[3,"iconName","text","disabled","clickEvent"],["scrollToBottom","",1,"workOrders",3,"bottomReached"],[1,"grid-container","standard-grid-table"],[1,"grid-item","header","sticky"],[4,"ngIf"],[4,"ngFor","ngForOf"],["class","no-results",4,"ngIf"],["class","spinner",4,"ngIf"],[1,"no-results"],[1,"spinner"],[1,"grid-item"],[1,"grid-item","align-left"],[3,"iconName","isTransparentMode","disabled","matTooltip","clickEvent"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"app-search-input",2),t.NdJ("changeEvent",function(o){return i.inputSearchHandler(o)}),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"div",3),t.TgZ(5,"mat-checkbox",4),t.NdJ("ngModelChange",function(o){return i.showOnlyUnsettled=o})("change",function(){return i.viewUnsettled()}),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.qZA(),t.TgZ(8,"mat-form-field",5),t.TgZ(9,"mat-label"),t._uU(10),t.ALo(11,"translate"),t.qZA(),t.TgZ(12,"input",6),t.NdJ("change",function(o){return i.dateChanged("from",o)}),t.qZA(),t.qZA(),t.TgZ(13,"mat-form-field",5),t.TgZ(14,"mat-label"),t._uU(15),t.ALo(16,"translate"),t.qZA(),t.TgZ(17,"input",6),t.NdJ("change",function(o){return i.dateChanged("to",o)}),t.qZA(),t.qZA(),t.TgZ(18,"mat-form-field",5),t.TgZ(19,"mat-label"),t._uU(20),t.ALo(21,"translate"),t.qZA(),t.TgZ(22,"mat-select",7),t.NdJ("valueChange",function(o){return i.orderBy(o)}),t.TgZ(23,"mat-option",8),t._uU(24),t.ALo(25,"translate"),t.qZA(),t.TgZ(26,"mat-option",9),t._uU(27),t.ALo(28,"translate"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(29,"app-button",10),t.NdJ("clickEvent",function(){return i.createWorkOrder()}),t.ALo(30,"translate"),t.qZA(),t.qZA(),t.TgZ(31,"div",11),t.NdJ("bottomReached",function(){return i.bottomReachedHandler()}),t.TgZ(32,"div",12),t.TgZ(33,"div",13),t._uU(34),t.ALo(35,"translate"),t.qZA(),t.TgZ(36,"div",13),t._uU(37),t.ALo(38,"translate"),t.qZA(),t.TgZ(39,"div",13),t._uU(40),t.ALo(41,"translate"),t.qZA(),t.TgZ(42,"div",13),t._uU(43),t.ALo(44,"translate"),t.qZA(),t.TgZ(45,"div",13),t._uU(46),t.ALo(47,"translate"),t.qZA(),t.TgZ(48,"div",13),t._uU(49),t.ALo(50,"translate"),t.qZA(),t.TgZ(51,"div",13),t._uU(52),t.ALo(53,"translate"),t.qZA(),t.TgZ(54,"div",13),t._uU(55),t.ALo(56,"translate"),t.qZA(),t.TgZ(57,"div",13),t._uU(58),t.ALo(59,"translate"),t.qZA(),t.TgZ(60,"div",13),t._uU(61),t.ALo(62,"translate"),t.qZA(),t.YNc(63,F,6,8,"ng-container",14),t.YNc(64,j,3,2,"ng-container",14),t.YNc(65,B,26,33,"ng-container",15),t.ALo(66,"async"),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("placeholder",t.lcZ(3,39,"searchFor"))("keyword",i.keyword),t.xp6(3),t.Q6J("color","primary")("ngModel",i.showOnlyUnsettled)("ngModelOptions",t.DdM(77,Y)),t.xp6(1),t.Oqu(t.lcZ(7,41,"showOnlyUnsettled")),t.xp6(3),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(11,43,"fromDate")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(16,45,"toDate")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(21,47,"sortBy")," "),t.xp6(4),t.Oqu(t.lcZ(25,49,"asc")),t.xp6(3),t.Oqu(t.lcZ(28,51,"desc")),t.xp6(2),t.Q6J("iconName","plus")("text",t.lcZ(30,53,"createWorkOrder"))("disabled",!i.hasPrivilege("WORK_ORDER_CREATE")),t.xp6(5),t.hij(" ",t.lcZ(35,55,"buyerName")," "),t.xp6(3),t.hij(" ",t.lcZ(38,57,"number")," "),t.xp6(3),t.hij(" ",t.lcZ(41,59,"date")," "),t.xp6(3),t.hij(" ",t.lcZ(44,61,"forPerson")," "),t.xp6(3),t.hij(" ",t.lcZ(47,63,"description")," "),t.xp6(3),t.hij(" ",t.lcZ(50,65,"note")," "),t.xp6(3),t.hij(" ",t.lcZ(53,67,"view")," "),t.xp6(3),t.hij(" ",t.lcZ(56,69,"edit")," "),t.xp6(3),t.hij(" ",t.lcZ(59,71,"delete")," "),t.xp6(3),t.hij(" ",t.lcZ(62,73,"mark")," "),t.xp6(2),t.Q6J("ngIf",!i.showOnlyUnsettled),t.xp6(1),t.Q6J("ngIf",i.showOnlyUnsettled),t.xp6(1),t.Q6J("ngForOf",i.showOnlyUnsettled?i.entitiesUnsettled:t.lcZ(66,75,i.entities)))},directives:[w.J,k.oG,g.JJ,g.On,Z.KE,Z.hX,C.Nt,x.gD,P.ey,N.r,R.C,l.O5,l.sg,E.Ou,W.gM],pipes:[O.X$,l.Ov,l.uU],styles:["[_nghost-%COMP%]{display:flex;height:calc(100%)}.container[_ngcontent-%COMP%]{height:calc(100%);min-width:500px}.container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]     .mat-form-field-wrapper{padding-bottom:0}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]{height:calc(100% - 120px);overflow-y:auto;margin-top:20px}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto auto auto auto auto auto auto}.container[_ngcontent-%COMP%]   .workOrders[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.align-left[_ngcontent-%COMP%]{justify-content:flex-start}.min-with[_ngcontent-%COMP%]{max-width:130px}"]}),r})(),canActivate:[m.Y],data:{permission:"WORK_ORDERS_VIEW"}},{path:"create",loadChildren:()=>Promise.all([e.e(253),e.e(217),e.e(688),e.e(869)]).then(e.bind(e,869)).then(r=>r.WorkOrderCreateEditModule)},{path:"edit/:workOrderOID",loadChildren:()=>Promise.all([e.e(253),e.e(217),e.e(688),e.e(869)]).then(e.bind(e,869)).then(r=>r.WorkOrderCreateEditModule)}];let q=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[c.Bz.forChild(Q)],c.Bz]}),r})();var K=e(2024),H=e(2763),$=e(6460),V=e(8287),z=e(6225);let X=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[l.ez,q,O.aw,K.h,H.i,$.n,V.n,z.y,E.Cq,Z.lN,k.p9,g.u5,g.UX,W.AV,C.c,x.LD]]}),r})()},3749:(U,u,e)=>{e.d(u,{w:()=>h});var l=e(4762),c=e(8902),m=e(8228),p=e(8324);class h extends m.g{constructor(){super(...arguments),this.name="",this.address="",this.maticalNumber="",this.pib="",this.contactPerson="",this.phoneNumberFix="",this.phoneNumberMobile="",this.email=""}}(0,l.gn)([(0,c.D)(()=>p.v)],h.prototype,"city",void 0)}}]);
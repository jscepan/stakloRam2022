"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[869],{869:(Q,M,c)=>{c.r(M),c.d(M,{WorkOrderCreateEditModule:()=>Je});var g=c(8583),x=c(4655),C=c(7095),s=c(3679),u=c(1217),f=c(4794),_=c(136),b=c(287),k=c(5595),G=c(4463),Z=c(2134),J=c(7379),F=c(2050),R=c(9761),K=c(8002),z=c(4292),$=c(8228);class V extends $.g{constructor(){super(...arguments),this.url="",this.description=""}}var e=c(7716),X=c(7515);let D=(()=>{class o extends z.h{constructor(t){super(t,V,_.IF),this.baseWebService=t}upload(t){return this.baseWebService.postRequest(_.Mr+"/"+this.domainName,t)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(X.I))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac}),o})();var ee=c(8794),A=c(4333),te=c(7347),re=c(8933),w=c(7322),L=c(3722),ne=c(3336),oe=c(42),U=c(4107),H=c(6591),ie=c(1862),B=c(4657),T=c(1079),j=c(7446);const se=["fileCtrl"];function ae(o,l){if(1&o&&(e.TgZ(0,"mat-option",28),e._uU(1),e.qZA()),2&o){const t=e.oxw(2);e.Q6J("value",t.selectedBuyer),e.xp6(1),e.Oqu(t.selectedBuyer.name)}}function ce(o,l){if(1&o&&(e.TgZ(0,"mat-option",28),e._uU(1),e.qZA()),2&o){const t=e.oxw().$implicit;e.Q6J("value",t),e.xp6(1),e.hij(" ",t.name," ")}}function le(o,l){if(1&o&&(e.ynx(0),e.YNc(1,ce,2,2,"mat-option",11),e.BQk()),2&o){const t=l.$implicit,r=e.oxw(2);e.xp6(1),e.Q6J("ngIf",(null==r.selectedBuyer?null:r.selectedBuyer.oid)!==t.oid)}}function ue(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"app-button",29),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw(2).createBuyer()}),e.qZA()}if(2&o){const t=e.oxw(2);e.Q6J("iconName","plus")("disabled",!t.hasPrivilege("BUYER_CREATE"))}}function de(o,l){if(1&o&&(e.TgZ(0,"mat-option",28),e._uU(1),e.qZA()),2&o){const t=l.$implicit;e.Q6J("value",t),e.xp6(1),e.hij(" ",t," ")}}function me(o,l){if(1&o&&(e.TgZ(0,"mat-option",28),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&o){const t=l.$implicit;e.Q6J("value",t.value),e.xp6(1),e.hij(" ",e.lcZ(2,2,t.displayName)," ")}}function _e(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",30),e.TgZ(1,"div",31),e.TgZ(2,"mat-form-field",32),e.TgZ(3,"mat-label"),e._uU(4),e.ALo(5,"translate"),e.qZA(),e.TgZ(6,"input",33,34),e.NdJ("keydown.enter",function(){return e.CHM(t),e.MAs(7).closePanel()})("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"description",a)}),e.qZA(),e.TgZ(8,"mat-autocomplete",null,35),e.YNc(10,de,2,2,"mat-option",36),e.ALo(11,"async"),e.qZA(),e.qZA(),e.TgZ(12,"mat-form-field",37),e.TgZ(13,"mat-label"),e._uU(14),e.ALo(15,"translate"),e.qZA(),e.TgZ(16,"mat-select",38),e.NdJ("focusout",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)})("openedChange",function(n){const a=e.CHM(t).index;return e.oxw(2).openedToggleOnUomSelect(n,a)}),e.YNc(17,me,3,4,"mat-option",36),e.qZA(),e.qZA(),e.TgZ(18,"mat-form-field",37),e.TgZ(19,"mat-label"),e._uU(20),e.ALo(21,"translate"),e.qZA(),e.TgZ(22,"input",39),e.NdJ("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"dimension1",a)})("change",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)})("focusout",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)}),e.qZA(),e.qZA(),e.TgZ(23,"mat-form-field",37),e.TgZ(24,"mat-label"),e._uU(25),e.ALo(26,"translate"),e.qZA(),e.TgZ(27,"input",40),e.NdJ("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"dimension2",a)})("change",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)})("focusout",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)}),e.qZA(),e.qZA(),e.TgZ(28,"mat-form-field",37),e.TgZ(29,"mat-label"),e._uU(30),e.ALo(31,"translate"),e.qZA(),e.TgZ(32,"input",41),e.NdJ("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"quantity",a)})("change",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)})("focusout",function(){const i=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(i)}),e.qZA(),e.qZA(),e.TgZ(33,"mat-form-field",37),e.TgZ(34,"mat-label"),e._uU(35),e.ALo(36,"translate"),e.qZA(),e.TgZ(37,"input",42),e.NdJ("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"sumQuantity",a)})("change",function(){return e.CHM(t),e.oxw(2).calculateSum()}),e.qZA(),e.qZA(),e.TgZ(38,"mat-form-field"),e.TgZ(39,"mat-label"),e._uU(40),e.ALo(41,"translate"),e.qZA(),e.TgZ(42,"input",43),e.NdJ("keypress",function(n){const a=e.CHM(t).index;return e.oxw(2).onKeypress(n,"note",a)}),e.qZA(),e.qZA(),e.TgZ(43,"app-button",44),e.NdJ("clickEvent",function(){const i=e.CHM(t).index;return e.oxw(2).removeItem(i)}),e.qZA(),e.TgZ(44,"mat-checkbox",45),e.NdJ("change",function(n){const a=e.CHM(t).index;return e.oxw(2).calculateWorkOrderSum(a,n.checked)}),e._uU(45),e.ALo(46,"translate"),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=l.index,r=e.MAs(9),n=e.oxw(2);e.xp6(1),e.Q6J("formGroupName",t),e.xp6(2),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(5,44,"description")," "),e.xp6(2),e.Q6J("matAutocomplete",r),e.xp6(4),e.Q6J("ngForOf",e.lcZ(11,46,n.getFilteredOptions(t))),e.xp6(3),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(15,48,"uom")," "),e.xp6(3),e.Q6J("ngForOf",n.uomOptions),e.xp6(2),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(21,50,"widthMM")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(26,52,"heightMM")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(31,54,"quantity")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(36,56,"sum")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(41,58,"note")," "),e.xp6(3),e.Q6J("iconName","minus")("isTransparentMode",!0),e.xp6(1),e.Q6J("color","primary")("checked",!0),e.xp6(1),e.Oqu(e.lcZ(46,60,"consMeas"))}}function pe(o,l){1&o&&(e.TgZ(0,"div",49),e.TgZ(1,"div",50),e._uU(2),e.ALo(3,"translate"),e.qZA(),e.TgZ(4,"div",51),e._uU(5),e.ALo(6,"translate"),e.qZA(),e.qZA()),2&o&&(e.xp6(2),e.Oqu(e.lcZ(3,2,"sumMeter2")),e.xp6(3),e.Oqu(e.lcZ(6,4,"quantity")))}function ge(o,l){if(1&o&&(e.TgZ(0,"div",52),e.TgZ(1,"div",50),e._uU(2),e.ALo(3,"number"),e.qZA(),e.TgZ(4,"div",51),e._uU(5),e.ALo(6,"number"),e.qZA(),e.qZA()),2&o){const t=e.oxw(3);e.xp6(2),e.Oqu(e.Dn7(3,2,t.sumMeter2,"1.2-2","de")),e.xp6(3),e.hij(" ",e.Dn7(6,6,t.sumMeter2Quantity,"1.2-2","de")," ")}}function fe(o,l){1&o&&(e.TgZ(0,"div",49),e.TgZ(1,"div",50),e._uU(2),e.ALo(3,"translate"),e.qZA(),e.TgZ(4,"div",51),e._uU(5),e.ALo(6,"translate"),e.qZA(),e.qZA()),2&o&&(e.xp6(2),e.Oqu(e.lcZ(3,2,"sumMeter")),e.xp6(3),e.Oqu(e.lcZ(6,4,"quantity")))}function ve(o,l){if(1&o&&(e.TgZ(0,"div",52),e.TgZ(1,"div",50),e._uU(2),e.ALo(3,"number"),e.qZA(),e.TgZ(4,"div",51),e._uU(5),e.ALo(6,"number"),e.qZA(),e.qZA()),2&o){const t=e.oxw(3);e.xp6(2),e.Oqu(e.Dn7(3,2,t.sumMeter,"1.2-2","de")),e.xp6(3),e.hij(" ",e.Dn7(6,6,t.sumMeterQuantity,"1.2-2","de")," ")}}function Ce(o,l){1&o&&(e.TgZ(0,"div",49),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&o&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"sumPieces")," "))}function he(o,l){if(1&o&&(e.TgZ(0,"div",52),e._uU(1),e.ALo(2,"number"),e.qZA()),2&o){const t=e.oxw(3);e.xp6(1),e.hij(" ",e.Dn7(2,1,t.sumPieces,"1.2-2","de")," ")}}function Oe(o,l){1&o&&(e.TgZ(0,"div",49),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&o&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"sumHours")," "))}function xe(o,l){if(1&o&&(e.TgZ(0,"div",52),e._uU(1),e.ALo(2,"number"),e.qZA()),2&o){const t=e.oxw(3);e.xp6(1),e.hij(" ",e.Dn7(2,1,t.sumHours,"1.2-2","de")," ")}}function ke(o,l){if(1&o&&(e.TgZ(0,"div",46),e.YNc(1,pe,7,6,"div",47),e.YNc(2,ge,7,10,"div",48),e.YNc(3,fe,7,6,"div",47),e.YNc(4,ve,7,10,"div",48),e.YNc(5,Ce,3,3,"div",47),e.YNc(6,he,3,5,"div",48),e.YNc(7,Oe,3,3,"div",47),e.YNc(8,xe,3,5,"div",48),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",t.sumMeter2>0),e.xp6(1),e.Q6J("ngIf",t.sumMeter2>0),e.xp6(1),e.Q6J("ngIf",t.sumMeter>0),e.xp6(1),e.Q6J("ngIf",t.sumMeter>0),e.xp6(1),e.Q6J("ngIf",t.sumPieces>0),e.xp6(1),e.Q6J("ngIf",t.sumPieces>0),e.xp6(1),e.Q6J("ngIf",t.sumHours>0),e.xp6(1),e.Q6J("ngIf",t.sumHours>0)}}const Ze=function(){return{standalone:!0}},Me=function(o){return{"background-image":o}};function ye(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",53),e.TgZ(1,"div",54),e.TgZ(2,"app-button",55),e.NdJ("clickEvent",function(){const i=e.CHM(t).index;return e.oxw(2).uploadFile(i)}),e.qZA(),e.TgZ(3,"input",56,57),e.NdJ("change",function(n){const a=e.CHM(t).index;return e.oxw(2).onFileSelected(n,a)}),e.qZA(),e.TgZ(5,"mat-form-field"),e.TgZ(6,"mat-label"),e._uU(7),e.ALo(8,"translate"),e.qZA(),e.TgZ(9,"input",58),e.NdJ("ngModelChange",function(n){return e.CHM(t).$implicit.description=n}),e.qZA(),e.qZA(),e.TgZ(10,"app-button",55),e.NdJ("clickEvent",function(){const i=e.CHM(t).index;return e.oxw(2).removeImage(i)}),e.qZA(),e.qZA(),e._UZ(11,"div",59),e.qZA()}if(2&o){const t=l.$implicit;e.xp6(2),e.Q6J("iconName","upload")("isTransparentMode",!0),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(8,12,"description")," "),e.xp6(2),e.Q6J("ngModel",t.description)("ngModelOptions",e.DdM(14,Ze)),e.xp6(1),e.Q6J("iconName","minus")("isTransparentMode",!0),e.xp6(1),e.Q6J("ngStyle",e.VKq(15,Me,"url("+t.fullUrl+")"))}}function be(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"form",5),e.TgZ(1,"div",6),e.TgZ(2,"mat-form-field"),e.TgZ(3,"mat-label"),e._uU(4),e.ALo(5,"translate"),e.qZA(),e.TgZ(6,"input",7),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"number")}),e.qZA(),e.qZA(),e.TgZ(7,"app-button",8),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw().setWorkOrderNumber()}),e.ALo(8,"translate"),e.qZA(),e.qZA(),e.TgZ(9,"div",6),e.TgZ(10,"mat-form-field"),e.TgZ(11,"mat-label"),e._uU(12),e.ALo(13,"translate"),e.qZA(),e.TgZ(14,"mat-select",9),e.NdJ("valueChange",function(){return e.CHM(t),e.oxw().buyerChanged()})("infiniteScroll",function(){return e.CHM(t),e.oxw().bottomReachedHandlerBuyers()})("selectionChange",function(n){return e.CHM(t),e.oxw().selectBuyer(n)}),e.TgZ(15,"mat-option"),e.TgZ(16,"ngx-mat-select-search",10),e.NdJ("ngModelChange",function(n){return e.CHM(t),e.oxw().searchHandler(n)}),e.ALo(17,"translate"),e.ALo(18,"translate"),e.ALo(19,"async"),e.qZA(),e.qZA(),e.YNc(20,ae,2,2,"mat-option",11),e.YNc(21,le,2,1,"ng-container",12),e.ALo(22,"async"),e.qZA(),e.qZA(),e.YNc(23,ue,1,2,"app-button",13),e.qZA(),e.TgZ(24,"div",6),e.TgZ(25,"mat-form-field"),e.TgZ(26,"mat-label"),e._uU(27),e.ALo(28,"translate"),e.qZA(),e.TgZ(29,"input",14),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"forPerson")}),e.qZA(),e.qZA(),e.TgZ(30,"mat-form-field"),e.TgZ(31,"mat-label"),e._uU(32),e.ALo(33,"translate"),e.qZA(),e.TgZ(34,"input",15),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"description")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(35,"div",6),e.TgZ(36,"mat-form-field"),e.TgZ(37,"mat-label"),e._uU(38),e.ALo(39,"translate"),e.qZA(),e.TgZ(40,"input",16),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"dateOfCreate")}),e.qZA(),e.qZA(),e.TgZ(41,"mat-form-field"),e.TgZ(42,"mat-label"),e._uU(43),e.ALo(44,"translate"),e.qZA(),e.TgZ(45,"input",17),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"placeOfIssue")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(46,"div",18),e.YNc(47,_e,47,62,"div",19),e.qZA(),e.TgZ(48,"div",20),e.TgZ(49,"app-button",21),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw().addNewItem()}),e.ALo(50,"translate"),e.qZA(),e.YNc(51,ke,9,8,"div",22),e.qZA(),e.TgZ(52,"div",6),e.TgZ(53,"mat-form-field",23),e.TgZ(54,"mat-label"),e._uU(55),e.ALo(56,"translate"),e.qZA(),e.TgZ(57,"textarea",24),e.NdJ("keypress",function(n){return e.CHM(t),e.oxw().onKeypress(n,"note")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(58,"div",25),e.YNc(59,ye,12,17,"div",26),e.qZA(),e.TgZ(60,"app-button",27),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw().addNewImage()}),e.ALo(61,"translate"),e.qZA(),e.qZA()}if(2&o){const t=e.oxw();e.Q6J("formGroup",t.formGroup),e.xp6(3),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(5,57,"numberOfWorkOrder")," "),e.xp6(3),e.Q6J("isTransparentMode",!0)("text",e.lcZ(8,59,"createNumber")),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(13,61,"buyer")," "),e.xp6(2),e.Q6J("compareWith",t.compareFn)("disabled",t.isEdit),e.xp6(2),e.s9C("placeholderLabel",e.lcZ(17,63,"searchFor")),e.s9C("noEntriesFoundLabel",e.lcZ(18,65,"noResults")),e.Q6J("formControl",t.searchControl)("hideClearSearchButton",!0)("clearSearchInput",!0)("searching",e.lcZ(19,67,t.isLoading)||!1)("disableScrollToActiveOnOptionsChanged",!0),e.xp6(4),e.Q6J("ngIf",t.selectedBuyer),e.xp6(1),e.Q6J("ngForOf",e.lcZ(22,69,t.buyersEntities)),e.xp6(2),e.Q6J("ngIf",!t.isEdit),e.xp6(3),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(28,71,"forPerson")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(33,73,"description")," "),e.xp6(5),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(39,75,"dateOfCreate")," "),e.xp6(4),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(44,77,"placeOfIssue")," "),e.xp6(4),e.Q6J("ngForOf",t.workOrderItemsFormArr.controls),e.xp6(2),e.Q6J("iconName","plus")("text",e.lcZ(50,79,"addNewItem"))("disabled",!t.isBuyerSelected),e.xp6(2),e.Q6J("ngIf",t.sumMeter2>0||t.sumMeter>0||t.sumPieces>0||t.sumHours>0),e.xp6(3),e.ekj("mark-required",!0)("mark-opt-required",!0),e.xp6(1),e.hij(" ",e.lcZ(56,81,"note")," "),e.xp6(4),e.Q6J("ngForOf",t.workOrderImages),e.xp6(1),e.Q6J("text",e.lcZ(61,83,"addImage"))}}function Ae(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"app-button",62),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw(2).handleSubmitButton(!0)}),e.ALo(1,"translate"),e.qZA()}if(2&o){const t=e.oxw(2);e.Q6J("text",e.lcZ(1,2,"saveAndCreateInvoice"))("disabled",!t.formGroup.dirty||t.formGroup.invalid)}}function we(o,l){if(1&o){const t=e.EpF();e.TgZ(0,"div",60),e.TgZ(1,"div",1),e.TgZ(2,"app-button",61),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw().cancel()}),e.ALo(3,"translate"),e.qZA(),e.qZA(),e.TgZ(4,"div",1),e.TgZ(5,"app-button",62),e.NdJ("clickEvent",function(){return e.CHM(t),e.oxw().handleSubmitButton()}),e.ALo(6,"translate"),e.qZA(),e.YNc(7,Ae,2,4,"app-button",63),e.qZA(),e.qZA()}if(2&o){const t=e.oxw();e.xp6(2),e.Q6J("text",e.lcZ(3,4,"cancel")),e.xp6(3),e.Q6J("text",e.lcZ(6,6,"save"))("disabled",!t.formGroup.dirty||t.formGroup.invalid),e.xp6(2),e.Q6J("ngIf",!t.isEdit)}}const Te=[{path:"",component:(()=>{class o{constructor(t,r,n,i,a,d,p,m,v,h,O,y){this.router=t,this.route=r,this.globalService=n,this.listEntities=i,this.buyerCreateEditPopupService=a,this.buyerWebService=d,this.translateService=p,this.settingsStoreService=m,this.webService=v,this.imageWebService=h,this.el=O,this.authStoreService=y,this.subs=new G.L,this.workOrderOID=null,this.isEdit=!1,this.uomOptions=_.pM,this.workOrderItemsOptions=[],this.filteredOptions=[],this.buyersEntities=this.listEntities.entities,this.isLoading=this.listEntities.isLoading,this.searchControl=new s.NI,this.compareFn=Z.nt,this.sumMeter2=0,this.sumMeter2Quantity=0,this.sumMeter=0,this.sumMeterQuantity=0,this.sumPieces=0,this.sumHours=0,this.workOrderImages=[]}getDescription(t){return this.workOrderItemsFormArr.controls[t].get("description")}getUOM(t){return this.workOrderItemsFormArr.controls[t].get("uom")}getDimension1(t){return this.workOrderItemsFormArr.controls[t].get("dimension1")}getDimension2(t){return this.workOrderItemsFormArr.controls[t].get("dimension2")}getQuantity(t){return this.workOrderItemsFormArr.controls[t].get("quantity")}getSumQuantity(t){return this.workOrderItemsFormArr.controls[t].get("sumQuantity")}ngOnInit(){this.workOrderOID=this.route.snapshot.paramMap.get("workOrderOID"),this.subs.sink=this.webService.getAllWorkOrderItemDescriptions().subscribe(t=>{this.workOrderItemsOptions=t}),this.subs.sink=this.listEntities.setWebService(this.buyerWebService).requestFirstPage(),this.subs.sink=this.settingsStoreService.dataLoaded$.subscribe(t=>{t&&(this.settings=this.settingsStoreService.getSettings(),this.isEdit=!!this.workOrderOID,this.isEdit&&this.workOrderOID?this.webService.getEntityByOid(this.workOrderOID).subscribe(r=>{this.workOrder=r,this.initializeEdit()}):this.initializeCreate(),this.isBuyerSelected=this.isEdit||!1)})}hasPrivilege(t){return this.authStoreService.isAllowed(t)}initializeCreate(){var t;this.formGroup=new s.cw({number:new s.NI(0,[s.kI.required]),buyer:new s.NI("",[s.kI.required]),dateOfCreate:new s.NI((new Date).toISOString().substring(0,10),[s.kI.required]),placeOfIssue:new s.NI((null===(t=this.settings)||void 0===t?void 0:t.workOrderPlaceOfIssue)||"",[s.kI.required]),forPerson:new s.NI(""),description:new s.NI(""),note:new s.NI(""),workOrderItems:new s.Oe([])}),this.setWorkOrderNumber()}initializeEdit(){this.selectedBuyer=this.workOrder.buyer,this.formGroup=new s.cw({number:new s.NI(this.workOrder.number,[s.kI.required]),buyer:new s.NI(this.selectedBuyer,[s.kI.required]),dateOfCreate:new s.NI(this.workOrder.dateOfCreate,[s.kI.required]),placeOfIssue:new s.NI(this.workOrder.placeOfIssue,[s.kI.required]),forPerson:new s.NI(this.workOrder.forPerson,[]),description:new s.NI(this.workOrder.description,[]),note:new s.NI(this.workOrder.note,[]),workOrderItems:new s.Oe([])}),this.workOrder.workOrderItems.forEach((t,r)=>this.addNewItem(t)),this.workOrder.images.forEach((t,r)=>this.addNewImage(t))}get workOrderItemsFormArr(){return this.formGroup.get("workOrderItems")}addNewItem(t){this.workOrderItemsFormArr.push(new s.cw({oid:new s.NI((null==t?void 0:t.oid)||""),description:new s.NI((null==t?void 0:t.description)||"",[s.kI.required]),uom:new s.NI((null==t?void 0:t.uom)||this.uomOptions[0].value,[s.kI.required]),dimension1:new s.NI((null==t?void 0:t.dimension1)||0),dimension2:new s.NI((null==t?void 0:t.dimension2)||0),quantity:new s.NI((null==t?void 0:t.quantity)||0),sumQuantity:new s.NI((null==t?void 0:t.sumQuantity)||0,[s.kI.required]),note:new s.NI((null==t?void 0:t.note)||"")})),setTimeout(()=>{var r;const n=null===(r=this.getDescription(this.workOrderItemsFormArr.length-1))||void 0===r?void 0:r.valueChanges.pipe((0,R.O)(""),(0,K.U)(i=>this._filter(i||"")));this.filteredOptions.push(n)}),this.calculateSum()}removeItem(t){this.workOrderItemsFormArr.removeAt(t),this.calculateSum(),this.formGroup.markAsDirty()}calculateWorkOrderSum(t,r=!0){var n,i,a,d,p,m,v,h,O,y,E,P,I,N,q,W,S;switch(null===(n=this.getUOM(t))||void 0===n?void 0:n.value){case"M2":const Y=(r?(0,Z.ZB)(1*(null===(i=this.getDimension1(t))||void 0===i?void 0:i.value)/10,null===(a=this.settings)||void 0===a?void 0:a.constructionMeasureCM):1*(null===(d=this.getDimension1(t))||void 0===d?void 0:d.value)/10)*(r?(0,Z.ZB)(1*(null===(p=this.getDimension2(t))||void 0===p?void 0:p.value)/10,null===(m=this.settings)||void 0===m?void 0:m.constructionMeasureCM):1*(null===(v=this.getDimension2(t))||void 0===v?void 0:v.value)/10)/1e4;null===(h=this.getSumQuantity(t))||void 0===h||h.setValue((null===(O=this.getDescription(t))||void 0===O?void 0:O.value.toLowerCase().includes("termoizolaciono"))&&Y<((null===(y=this.settings)||void 0===y?void 0:y.termoizolacGlassMinArea)||.2)?(0,Z.wz)(((null===(E=this.settings)||void 0===E?void 0:E.termoizolacGlassMinArea)||.2)*(1*(null===(P=this.getQuantity(t))||void 0===P?void 0:P.value)),3):(0,Z.wz)(Y*(null===(I=this.getQuantity(t))||void 0===I?void 0:I.value)*1,3));break;case"M":const Fe=(1*(null===(N=this.getDimension1(t))||void 0===N?void 0:N.value)/10*2/100+1*(null===(q=this.getDimension2(t))||void 0===q?void 0:q.value)/10*2/100)*(1*(null===(W=this.getQuantity(t))||void 0===W?void 0:W.value));null===(S=this.getSumQuantity(t))||void 0===S||S.setValue((0,Z.wz)(Fe,3))}this.calculateSum()}calculateSum(){this.sumMeter2=0,this.sumMeter2Quantity=0,this.sumMeter=0,this.sumMeterQuantity=0,this.sumPieces=0,this.sumHours=0,this.workOrderItemsFormArr.controls.forEach((t,r)=>{var n,i,a,d,p,m,v;switch(null===(n=this.getUOM(r))||void 0===n?void 0:n.value){case"M2":this.sumMeter2+=1*(null===(i=this.getSumQuantity(r))||void 0===i?void 0:i.value),this.sumMeter2Quantity+=1*(null===(a=this.getQuantity(r))||void 0===a?void 0:a.value);break;case"M":this.sumMeter+=1*(null===(d=this.getSumQuantity(r))||void 0===d?void 0:d.value),this.sumMeterQuantity+=1*(null===(p=this.getQuantity(r))||void 0===p?void 0:p.value);break;case"PCS":this.sumPieces+=1*(null===(m=this.getSumQuantity(r))||void 0===m?void 0:m.value);break;case"HOUR":this.sumHours+=1*(null===(v=this.getSumQuantity(r))||void 0===v?void 0:v.value)}})}uomChanged(t,r){var n,i,a,d,p,m,v,h,O;"PCS"===t||"HOUR"===t?(null===(n=this.getDimension1(r))||void 0===n||n.setValue(0),null===(i=this.getDimension1(r))||void 0===i||i.disable(),null===(a=this.getDimension2(r))||void 0===a||a.setValue(0),null===(d=this.getDimension2(r))||void 0===d||d.disable(),null===(p=this.getQuantity(r))||void 0===p||p.setValue(0),null===(m=this.getQuantity(r))||void 0===m||m.disable(),setTimeout(()=>{this.setFocusOn("sumQuantity",r,!0)})):(null===(v=this.getDimension1(r))||void 0===v||v.enable(),null===(h=this.getDimension2(r))||void 0===h||h.enable(),null===(O=this.getQuantity(r))||void 0===O||O.enable(),setTimeout(()=>{this.setFocusOn("dimension1",r,!0)})),this.getSumQuantity(r),this.calculateSum()}setWorkOrderNumber(){var t;this.webService.getNextWorkOrderNumber(null===(t=this.formGroup.get("dateOfCreate"))||void 0===t?void 0:t.value).subscribe(r=>{var n;null===(n=this.formGroup.get("number"))||void 0===n||n.setValue(r)})}buyerChanged(){setTimeout(()=>{var t;this.isBuyerSelected=null===(t=this.formGroup.get("buyer"))||void 0===t?void 0:t.value,0===this.workOrderItemsFormArr.controls.length&&this.addNewItem(),this.setFocusOn("forPerson")})}bottomReachedHandlerBuyers(){this.listEntities.requestNextPage()}selectBuyer(t){t&&t.value&&(this.selectedBuyer=t.value)}searchHandler(t){let r=new b.h;r.criteriaQuick=t,this.listEntities.setFilter(r)}createBuyer(){this.buyerCreateEditPopupService.openDialog().subscribe(t=>{t&&this.listEntities.requestFirstPage()})}cancel(){this.router.navigate(["/"])}handleSubmitButton(t=!1){const r=new FormData;let n=!1;const i=this.formGroup.value;i.images=[],this.workOrderImages.forEach(a=>{a.file?(r.append("files",a.file),n=!0,i.images.push({oid:"",url:"",description:a.description||""})):a.oid&&i.images.push({oid:a.oid,url:a.url,description:a.description})}),n?this.subs.sink=this.imageWebService.upload(r).subscribe(a=>{a.forEach((d,p)=>{for(let m=0;m<i.images.length;m++)if(""===i.images[m].url){i.images[m].url=d;break}}),this.submit(t,i)}):this.submit(t,i)}submit(t,r){this.isEdit&&this.workOrderOID?this.webService.updateEntity(this.workOrderOID,r).subscribe(n=>{n&&this.globalService.showBasicAlert(f.I.success,this.translateService.instant("successfully"),this.translateService.instant("workOrderIsSuccessfullyUpdated"))}):this.createWorkOrderRequest(t,r)}createWorkOrderRequest(t,r){this.subs.sink=this.webService.createEntity(r).subscribe(n=>{n&&(this.globalService.showBasicAlert(f.I.success,this.translateService.instant("successfully"),this.translateService.instant("newWorkOrderIsSuccessfullyCreated")),window.open("#/print/work-order-view/"+n.oid),t?this.router.navigate(["invoices","create"],{queryParams:{workOrderOID:n.oid}}):location.reload())})}openedToggleOnUomSelect(t,r){var n,i;!t&&(null===(n=this.getUOM(r))||void 0===n?void 0:n.value)&&this.uomChanged(null===(i=this.getUOM(r))||void 0===i?void 0:i.value,r)}onKeypress(t,r,n=-1){var i;if("Enter"===t.key)switch(t.preventDefault(),r){case"number":this.setFocusOn("buyer");break;case"forPerson":this.setFocusOn("description");break;case"description":n<0?this.setFocusOn("dateOfCreate",0,!0):this.setFocusOn("uom",n);break;case"dateOfCreate":this.setFocusOn("placeOfIssue",0,!0);break;case"placeOfIssue":this.setFocusOn("description",n+2,!0);break;case"dimension1":this.setFocusOn("dimension2",n,!0);break;case"dimension2":this.setFocusOn("quantity",n,!0);break;case"quantity":this.setFocusOn("sumQuantity",n,!0);break;case"sumQuantity":this.setFocusOn("note",n,!0);break;case"note":n>=0&&!(null===(i=this.workOrderItemsFormArr.controls[n+1])||void 0===i?void 0:i.value)&&this.addNewItem(this.workOrderItemsFormArr.controls[n].value),setTimeout(()=>{this.setFocusOn("description",n+2,!0)})}}setFocusOn(t,r=0,n=!1){const i=this.el.nativeElement.querySelectorAll('[formcontrolname="'+t+'"]')[r<0?0:r];null==i||i.focus(),n&&i.select()}_filter(t){const r=t.toLowerCase();return this.workOrderItemsOptions.filter(n=>n.toLowerCase().includes(r))}getFilteredOptions(t){return this.filteredOptions[t]}onFileSelected(t,r){const n=t.target.files[0];if(n){this.workOrderImages[r].file=n;const i=URL.createObjectURL(n);this.workOrderImages[r].oid="",this.workOrderImages[r].url=i,this.workOrderImages[r].fullUrl=i}this.formGroup.markAsDirty()}addNewImage(t){this.workOrderImages.push({oid:(null==t?void 0:t.oid)||"",url:(null==t?void 0:t.url)||"",fullUrl:(null==t?void 0:t.url)?(0,Z.Er)(t.url):"",description:(null==t?void 0:t.description)||"",file:void 0})}removeImage(t){this.workOrderImages.splice(t,1),this.formGroup.markAsDirty()}uploadFile(t){var r;null===(r=this.fileCtrls.get(t))||void 0===r||r.nativeElement.click()}ngOnDestroy(){this.subs.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(x.F0),e.Y36(x.gz),e.Y36(ee.U),e.Y36(k.y),e.Y36(u.X),e.Y36(J.e),e.Y36(A.sK),e.Y36(te.G),e.Y36(F.o),e.Y36(D),e.Y36(e.SBq),e.Y36(re.g))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-work-order-create-edit"]],viewQuery:function(t,r){if(1&t&&e.Gf(se,5),2&t){let n;e.iGM(n=e.CRH())&&(r.fileCtrls=n)}},features:[e._Bn([F.o,u.X,J.e,k.y,D])],decls:8,vars:5,consts:[[1,"wrapper"],[1,"container"],[1,"title"],["class","form",3,"formGroup",4,"ngIf"],["class","button-section",4,"ngIf"],[1,"form",3,"formGroup"],[1,"row"],["type","text","appDecimal","","matInput","","formControlName","number",3,"keypress"],[1,"bottom-padding",3,"isTransparentMode","text","clickEvent"],["formControlName","buyer","msInfiniteScroll","",3,"compareWith","disabled","valueChange","infiniteScroll","selectionChange"],[3,"formControl","placeholderLabel","noEntriesFoundLabel","hideClearSearchButton","clearSearchInput","searching","disableScrollToActiveOnOptionsChanged","ngModelChange"],[3,"value",4,"ngIf"],[4,"ngFor","ngForOf"],["class","create-buyer-button","class","bottom-padding",3,"iconName","disabled","clickEvent",4,"ngIf"],["type","text","matInput","","formControlName","forPerson",3,"keypress"],["type","text","matInput","","formControlName","description",3,"keypress"],["type","date","matInput","","formControlName","dateOfCreate",3,"keypress"],["type","text","matInput","","formControlName","placeOfIssue",3,"keypress"],["formArrayName","workOrderItems",1,"work-order-items"],["class","work-order-item",4,"ngFor","ngForOf"],[1,"row","full-width","bottom-margin"],[1,"big-button",3,"iconName","text","disabled","clickEvent"],["class","sum-info",4,"ngIf"],[1,"text-area"],["matInput","","formControlName","note","rows","3",3,"keypress"],[1,"images"],["class","image",4,"ngFor","ngForOf"],[1,"add-image-button",3,"text","clickEvent"],[3,"value"],[1,"bottom-padding",3,"iconName","disabled","clickEvent"],[1,"work-order-item"],[1,"form-group",3,"formGroupName"],[1,"full-width"],["type","text","matInput","","formControlName","description",3,"matAutocomplete","keydown.enter","keypress"],["trigger","matAutocompleteTrigger"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[1,"number-field"],["formControlName","uom",3,"focusout","openedChange"],["type","text","appDecimal","","matInput","","formControlName","dimension1",3,"keypress","change","focusout"],["type","text","appDecimal","","matInput","","formControlName","dimension2",3,"keypress","change","focusout"],["type","text","appDecimal","","matInput","","formControlName","quantity",3,"keypress","change","focusout"],["type","text","appDecimal","","matInput","","formControlName","sumQuantity",3,"keypress","change"],["type","text","matInput","","formControlName","note",3,"keypress"],[1,"additional-button",3,"iconName","isTransparentMode","clickEvent"],[1,"cons-measure-checkbox",3,"color","checked","change"],[1,"sum-info"],["class","key",4,"ngIf"],["class","value",4,"ngIf"],[1,"key"],[1,"value1"],[1,"value2"],[1,"value"],[1,"image"],[1,"button-container"],[3,"iconName","isTransparentMode","clickEvent"],["type","file","hidden","",3,"change"],["fileCtrl",""],["type","text","matInput","",3,"ngModel","ngModelOptions","ngModelChange"],[1,"image-preview",3,"ngStyle"],[1,"button-section"],["color","secondary",1,"cancel",3,"text","clickEvent"],[1,"update",3,"text","disabled","clickEvent"],["class","update",3,"text","disabled","clickEvent",4,"ngIf"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h3"),e._uU(4),e.ALo(5,"translate"),e.qZA(),e.qZA(),e.YNc(6,be,62,85,"form",3),e.YNc(7,we,8,8,"div",4),e.qZA(),e.qZA()),2&t&&(e.xp6(4),e.hij(" ",e.lcZ(5,3,r.isEdit?"editWorkOrder":"createWorkOrder")," "),e.xp6(2),e.Q6J("ngIf",r.formGroup),e.xp6(1),e.Q6J("ngIf",r.formGroup))},directives:[g.O5,s._Y,s.JL,s.sg,w.KE,w.hX,L.Nt,s.Fj,ne.U,s.JJ,s.u,oe.r,U.gD,H.s,ie.ey,B.nu,s.oH,g.sg,s.CE,s.x0,T.ZL,T.XC,j.oG,s.On,g.PC],pipes:[A.X$,g.Ov,g.JJ],styles:[".wrapper[_ngcontent-%COMP%]{height:calc(100%)}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:100%;height:calc(100% - 50px);overflow-y:auto}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;border-bottom:2px dotted var(--color-main-light)}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{flex-direction:column;margin-top:20px;display:flex;width:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .bottom-padding[_ngcontent-%COMP%]{display:flex;align-items:center;padding-bottom:1.34375em;margin-left:20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row.full-width[_ngcontent-%COMP%]{justify-content:space-between}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .sum-info[_ngcontent-%COMP%]{display:flex;border:2px solid var(--color-main-dark)}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .sum-info[_ngcontent-%COMP%]   .key[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:130px;align-items:center;justify-content:space-evenly;border-right:1px dotted var(--color-main-dark);font-weight:600}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .sum-info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:100px;padding-right:10px;align-items:flex-end;justify-content:space-evenly;border-right:2px solid var(--color-main-dark)}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .text-area[_ngcontent-%COMP%]{min-width:400px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .row.bottom-margin[_ngcontent-%COMP%]{margin-bottom:20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .work-order-items[_ngcontent-%COMP%]   .work-order-item[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{display:flex}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .work-order-items[_ngcontent-%COMP%]   .work-order-item[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%]{flex-grow:1}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .work-order-items[_ngcontent-%COMP%]   .work-order-item[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .number-field[_ngcontent-%COMP%]{flex-shrink:1;max-width:130px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .work-order-items[_ngcontent-%COMP%]   .work-order-item[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .additional-button[_ngcontent-%COMP%]{margin:10px 5px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .add-image-button[_ngcontent-%COMP%]{margin-bottom:20px}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .button-section[_ngcontent-%COMP%]{display:flex;width:100%;height:60px;flex-direction:row;align-items:center;justify-content:space-between}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .button-section[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{height:100%}.wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .button-section[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%]{margin-right:20px}.cons-measure-checkbox[_ngcontent-%COMP%]{margin-top:15px}.images[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.images[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{display:flex;flex-direction:column;border:1px solid var(--color-main-light);margin:10px}.images[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]{display:flex;flex-grow:1;justify-content:space-evenly;border-bottom:1px dotted var(--color-main-light)}.images[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   .button-container[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%]{margin-top:10px}.images[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   .image-preview[_ngcontent-%COMP%]{height:400px;width:400px;background-position:center;background-size:contain;background-repeat:no-repeat}.display-none[_ngcontent-%COMP%]{display:none}"]}),o})(),canActivate:[C.Y],data:{permission:"WORK_ORDER_CREATE"}}];let Ee=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[x.Bz.forChild(Te)],x.Bz]}),o})();var Pe=c(2024),Ie=c(7707),Ne=c(6688),qe=c(7942),We=c(5245),Se=c(9139),Qe=c(7012);let Je=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[g.ez,Ee,A.aw,Pe.h,Ie.R,s.UX,s.u5,L.c,w.lN,U.LD,Se._,Ne.Hi,qe.p,We.Ps,B.Co,H.I,j.p9,Qe.o,T.Bb]]}),o})()},3336:(Q,M,c)=>{c.d(M,{U:()=>x});var g=c(7716);let x=(()=>{class C{constructor(u){this.el=u}keyup(){this.validateNumber(this.el.nativeElement.value)}validateNumber(u){u=u.replace(/[^\d,.-]/g,"");let f=-1;for(let _=0;_<u.length;_++)if("."===u.charAt(_)||","===u.charAt(_)){f=_;break}u=(u=u.replaceAll(".","")).replaceAll(",",""),0===f?u="0."+u:f>0&&(u=u.substring(0,f)+"."+(u.length>f?u.substring(f):"")),this.el.nativeElement.value=u}}return C.\u0275fac=function(u){return new(u||C)(g.Y36(g.SBq))},C.\u0275dir=g.lG2({type:C,selectors:[["","appDecimal",""]],hostBindings:function(u,f){1&u&&g.NdJ("keyup",function(){return f.keyup()})}}),C})()},7379:(Q,M,c)=>{c.d(M,{e:()=>f});var g=c(4292),x=c(136),C=c(3749),s=c(7716),u=c(7515);let f=(()=>{class _ extends g.h{constructor(k){super(k,C.w,x.Hz),this.baseWebService=k}}return _.\u0275fac=function(k){return new(k||_)(s.LFG(u.I))},_.\u0275prov=s.Yz7({token:_,factory:_.\u0275fac}),_})()}}]);
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[327],{9327:(x,h,r)=>{r.r(h),r.d(h,{DebtViewModule:()=>j});var l=r(9808),b=r(9285),_=r(2024),f=r(8966),w=r(3497),A=r(6460),c=r(8287),v=r(8555),a=r(3075),C=r(4065),M=r(4463),T=r(2134),P=r(29),D=r(1558),t=r(5e3),Z=r(7322),V=r(7531),L=r(42);function U(o,d){if(1&o){const e=t.EpF();t.TgZ(0,"form",7)(1,"mat-form-field")(2,"mat-label"),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"input",8),t.NdJ("change",function(){return t.CHM(e),t.oxw().dateChange()}),t.qZA()(),t.TgZ(6,"mat-form-field")(7,"mat-label"),t._uU(8),t.ALo(9,"translate"),t.qZA(),t._UZ(10,"input",9),t.qZA(),t.TgZ(11,"app-button",10),t.NdJ("clickEvent",function(){return t.CHM(e),t.oxw().currentYear()}),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"app-button",10),t.NdJ("clickEvent",function(){return t.CHM(e),t.oxw().createIncome()}),t.ALo(14,"translate"),t.qZA(),t.TgZ(15,"app-button",11),t.NdJ("clickEvent",function(){return t.CHM(e),t.oxw().viewDebtor()}),t.ALo(16,"translate"),t.qZA()()}if(2&o){const e=t.oxw();t.Q6J("formGroup",e.formGroup),t.xp6(2),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(4,15,"fromDate")," "),t.xp6(4),t.ekj("mark-required",!0)("mark-opt-required",!0),t.xp6(1),t.hij(" ",t.lcZ(9,17,"toDate")," "),t.xp6(3),t.Q6J("text",t.lcZ(12,19,"currentYear")),t.xp6(2),t.Q6J("text",t.lcZ(14,21,"createIncome")),t.xp6(2),t.Q6J("text",t.lcZ(16,23,"view"))("disabled",!(e.formGroup.dirty&&e.formGroup.valid))}}function E(o,d){if(1&o&&(t.ynx(0),t.TgZ(1,"div",4),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"div",4),t._uU(5),t.qZA(),t.TgZ(6,"div",3),t._uU(7),t.ALo(8,"number"),t.qZA(),t.TgZ(9,"div",3),t._uU(10),t.ALo(11,"number"),t.qZA(),t.TgZ(12,"div",3),t._uU(13),t.ALo(14,"number"),t.qZA(),t.BQk()),2&o){const e=d.$implicit;t.xp6(2),t.Oqu(t.xi3(3,5,e.date,"dd.MM.yyyy")),t.xp6(3),t.Oqu(e.description),t.xp6(2),t.hij(" ",t.Dn7(8,8,e.owed,"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(11,12,e.debt,"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(14,16,e.state,"1.2-2","de")," ")}}function I(o,d){if(1&o&&(t.TgZ(0,"div",12)(1,"div",13),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"div",13),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"div",13),t._uU(8),t.ALo(9,"translate"),t.qZA(),t.TgZ(10,"div",13),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"div",13),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.TgZ(16,"div",4),t._uU(17,"-"),t.qZA(),t.TgZ(18,"div",4),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.TgZ(21,"div",3),t._uU(22),t.ALo(23,"number"),t.qZA(),t.TgZ(24,"div",3),t._uU(25),t.ALo(26,"number"),t.qZA(),t.TgZ(27,"div",3),t._uU(28),t.ALo(29,"number"),t.qZA(),t.YNc(30,E,15,20,"ng-container",14),t.TgZ(31,"div",15),t._uU(32),t.ALo(33,"translate"),t.qZA(),t.TgZ(34,"div",16),t._uU(35),t.ALo(36,"number"),t.qZA(),t.TgZ(37,"div",16),t._uU(38),t.ALo(39,"number"),t.qZA(),t.TgZ(40,"div",16),t._uU(41),t.ALo(42,"number"),t.qZA()()),2&o){const e=t.oxw();t.xp6(2),t.Oqu(t.lcZ(3,14,"date")),t.xp6(3),t.Oqu(t.lcZ(6,16,"description")),t.xp6(3),t.Oqu(t.lcZ(9,18,"owed")),t.xp6(3),t.Oqu(t.lcZ(12,20,"debt")),t.xp6(3),t.Oqu(t.lcZ(15,22,"state")),t.xp6(5),t.Oqu(t.lcZ(20,24,"startAmount")),t.xp6(3),t.hij(" ",t.Dn7(23,26,e.debtView.startAmount>=0?e.debtView.startAmount:0,"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(26,30,e.debtView.startAmount<0?e.debtView.startAmount:0,"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(29,34,e.debtView.startAmount,"1.2-2","de")," "),t.xp6(2),t.Q6J("ngForOf",e.debtView.transactions),t.xp6(2),t.hij(" ",t.lcZ(33,38,"turnover"),": "),t.xp6(3),t.hij(" ",t.Dn7(36,40,e.debtView.debtSum+(e.debtView.startAmount>0?e.debtView.startAmount:0),"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(39,44,e.debtView.owedSum+(e.debtView.startAmount<0?e.debtView.startAmount:0),"1.2-2","de")," "),t.xp6(3),t.hij(" ",t.Dn7(42,48,e.debtView.debtSum+e.debtView.owedSum+e.debtView.startAmount,"1.2-2","de")," ")}}const q=[{path:"",component:(()=>{class o{constructor(e,i,s,u){this.webService=e,this.route=i,this.incomeCreateEditPopupService=s,this.translateService=u,this.subs=new M.L,this.buyerOID=null,this.isLoading=!0,this.formGroup=new a.cw({fromDate:new a.NI("",[a.kI.required]),toDate:new a.NI("",[a.kI.required])})}ngOnInit(){this.buyerOID=this.route.snapshot.paramMap.get("buyerOID"),this.refreshData()}refreshData(){this.buyerOID&&(this.subs.sink=this.webService.getDebtor(this.buyerOID).subscribe(e=>{this.entity=e,this.isLoading=!1,this.convertDebtorToTransactions()}))}currentYear(){var e,i;null===(e=this.formGroup.get("fromDate"))||void 0===e||e.setValue((new Date).getFullYear()+"-01-01"),null===(i=this.formGroup.get("toDate"))||void 0===i||i.setValue((new Date).toISOString().substring(0,10)),this.formGroup.markAsDirty()}dateChange(){var e,i,s,u;const m=null===(e=this.formGroup.get("fromDate"))||void 0===e?void 0:e.value,p=null===(i=this.formGroup.get("toDate"))||void 0===i?void 0:i.value;(m&&!p||m&&p&&new Date(p)<new Date(m))&&(null===(s=this.formGroup.get("toDate"))||void 0===s||s.setValue(null===(u=this.formGroup.get("fromDate"))||void 0===u?void 0:u.value))}viewDebtor(){var e,i;this.convertDebtorToTransactions(null===(e=this.formGroup.get("fromDate"))||void 0===e?void 0:e.value,null===(i=this.formGroup.get("toDate"))||void 0===i?void 0:i.value)}convertDebtorToTransactions(e,i){var s,u,m,p,y,O;this.debtView={startAmount:0,owedSum:0,debtSum:0,transactions:[]};const g=!!e&&!!i;null===(u=null===(s=this.entity)||void 0===s?void 0:s.invoices)||void 0===u||u.forEach(n=>{!g||g&&e&&i&&e<=n.dateOfCreate&&n.dateOfCreate<=i?(this.debtView.transactions.push({date:n.dateOfCreate,description:this.translateService.instant((0,T.YQ)(n.type))+": "+n.number,owed:n.grossAmount,debt:0,state:0}),this.debtView.debtSum+=n.grossAmount):e&&e>n.dateOfCreate&&(this.debtView.startAmount+=n.grossAmount)}),null===(p=null===(m=this.entity)||void 0===m?void 0:m.incomes)||void 0===p||p.forEach(n=>{!g||g&&e&&i&&e<=n.date&&n.date<=i?(this.debtView.transactions.push({date:n.date,description:this.translateService.instant("income")+(n.comment?", "+n.comment:"")+(n.bankStatementNumber?", Izvod: "+n.bankStatementNumber:""),debt:n.amount,owed:0,state:0}),this.debtView.owedSum-=n.amount):e&&e>n.date&&(this.debtView.startAmount-=n.amount)}),null===(O=null===(y=this.entity)||void 0===y?void 0:y.outcomes)||void 0===O||O.forEach(n=>{!g||g&&e&&i&&e<=n.date&&n.date<=i?(this.debtView.transactions.push({date:n.date,description:this.translateService.instant("outcome")+", "+n.comment,owed:n.amount,debt:0,state:0}),this.debtView.debtSum+=n.amount):e&&e>n.date&&(this.debtView.startAmount+=n.amount)}),this.debtView.transactions=this.debtView.transactions.sort((n,N)=>Number(new Date(n.date))-Number(new Date(N.date)));for(let n=0;n<this.debtView.transactions.length;n++)this.debtView.transactions[n].state=0===n?this.debtView.transactions[n].owed-this.debtView.transactions[n].debt+this.debtView.startAmount:this.debtView.transactions[n-1].state+this.debtView.transactions[n].owed-this.debtView.transactions[n].debt}createIncome(){this.subs.sink=this.incomeCreateEditPopupService.openDialog("",this.buyerOID||void 0).subscribe(e=>{e&&this.refreshData()})}ngOnDestroy(){this.subs.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(D.X),t.Y36(v.gz),t.Y36(C.x),t.Y36(b.sK))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-debt-view"]],features:[t._Bn([P.N,D.X,C.x])],decls:20,vars:14,consts:[[1,"container"],[1,"sticky-header"],[1,"title","grid-container","standard-grid-table"],[1,"grid-item","align-right"],[1,"grid-item"],["class","form",3,"formGroup",4,"ngIf"],["class","grid-container standard-grid-table",4,"ngIf"],[1,"form",3,"formGroup"],["type","date","matInput","","formControlName","fromDate",3,"change"],["type","date","matInput","","formControlName","toDate"],[1,"view-button","no-print",3,"text","clickEvent"],[1,"view-button","no-print",3,"text","disabled","clickEvent"],[1,"grid-container","standard-grid-table"],[1,"grid-item","header","sticky"],[4,"ngFor","ngForOf"],[1,"grid-item","colspan2","top-border","bold"],[1,"grid-item","align-right","top-border","bold"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.TgZ(6,"div",4),t._uU(7),t.qZA(),t.TgZ(8,"div",3),t._uU(9),t.ALo(10,"translate"),t.qZA(),t.TgZ(11,"div",4),t._uU(12),t.qZA(),t.TgZ(13,"div",3),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.TgZ(16,"div",4),t._uU(17),t.qZA()(),t.YNc(18,U,17,25,"form",5),t.qZA(),t.YNc(19,I,43,52,"div",6),t.qZA()),2&e&&(t.xp6(4),t.hij("",t.lcZ(5,8,"company"),":"),t.xp6(3),t.Oqu(null==i.entity||null==i.entity.buyer?null:i.entity.buyer.name),t.xp6(2),t.hij("",t.lcZ(10,10,"address"),":"),t.xp6(3),t.Oqu(null==i.entity||null==i.entity.buyer?null:i.entity.buyer.address),t.xp6(2),t.hij("",t.lcZ(15,12,"pib"),":"),t.xp6(3),t.Oqu(null==i.entity||null==i.entity.buyer?null:i.entity.buyer.pib),t.xp6(1),t.Q6J("ngIf",i.formGroup),t.xp6(1),t.Q6J("ngIf",i.debtView))},directives:[l.O5,a._Y,a.JL,a.sg,Z.KE,Z.hX,V.Nt,a.Fj,a.JJ,a.u,L.r,l.sg],pipes:[b.X$,l.JJ,l.uU],styles:[".container[_ngcontent-%COMP%]{overflow-y:hidden}.container[_ngcontent-%COMP%]   .sticky-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.1em;font-weight:600}.container[_ngcontent-%COMP%]   .sticky-header[_ngcontent-%COMP%]   .title.grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto}.container[_ngcontent-%COMP%]   .sticky-header[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto auto auto;overflow-y:auto}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.colspan2[_ngcontent-%COMP%]{grid-column:1/span 2}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.colspan3[_ngcontent-%COMP%]{grid-column:1/span 3}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.top-border[_ngcontent-%COMP%]{border-top:1px solid var(--color-black)}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.bold[_ngcontent-%COMP%]{font-weight:600}.container[_ngcontent-%COMP%]   .grid-container[_ngcontent-%COMP%]   .grid-item.sticky[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1}.view-button[_ngcontent-%COMP%]{margin-left:20px}@media print{.no-print[_ngcontent-%COMP%]{display:none!important}.sticky-header[_ngcontent-%COMP%]{top:unset!important;position:unset!important;background:unset!important}}"]}),o})(),data:{permission:"DEBTOR_VIEW"}}];let S=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[v.Bz.forChild(q)],v.Bz]}),o})(),j=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[l.ez,S,b.aw,_.h,f.Is,w.N,A.n,c.n,a.UX,V.c,Z.lN]]}),o})()},29:(x,h,r)=>{r.d(h,{N:()=>A});var l=r(4292),b=r(136),_=r(9360),f=r(5e3),w=r(3164);let A=(()=>{class c extends l.h{constructor(a){super(a,_.K,b.HT),this.baseWebService=a}}return c.\u0275fac=function(a){return new(a||c)(f.LFG(w.I))},c.\u0275prov=f.Yz7({token:c,factory:c.\u0275fac}),c})()}}]);
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{3497:(I,M,e)=>{e.d(M,{N:()=>h});var n=e(8583),a=e(4333),l=e(7942),u=e(7322),o=e(3722),d=e(3679),r=e(4107),s=e(2024),c=e(7716);let h=(()=>{class i{}return i.\u0275fac=function(v){return new(v||i)},i.\u0275mod=c.oAB({type:i}),i.\u0275inj=c.cJS({imports:[[n.ez,a.aw,l.p,s.h,d.UX,o.c,u.lN,r.LD]]}),i})()},6240:(I,M,e)=>{e.d(M,{r:()=>d});var n=e(136);class a{constructor(){this.jwt=""}}var l=e(3709),u=e(7716),o=e(7515);let d=(()=>{class r{constructor(c){this.baseWebService=c}login(c){return this.baseWebService.postRequest(`${n.Mr}/auth/login`,c,a)}getCurrentUser(){return this.baseWebService.getRequest(`${n.Mr}/users/profile`,l.T)}changePassword(c){return this.baseWebService.postRequest(`${n.Mr}/auth/password-change`,c)}}return r.\u0275fac=function(c){return new(c||r)(u.LFG(o.I))},r.\u0275prov=u.Yz7({token:r,factory:r.\u0275fac}),r})()},1663:(I,M,e)=>{e.d(M,{l:()=>y});var n=e(8583),a=e(2181),l=e(7238),u=e(4655),o=e(4333),d=e(7942),r=e(8966),s=e(7716);let c=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez,a.Tx,d.p,r.Is,o.aw]]}),t})();var h=e(7446);let i=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez,d.p]]}),t})(),f=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez]]}),t})(),v=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez,h.p9,i,f]]}),t})(),y=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez,u.Bz,d.p,c,a.Tx,o.aw,v,l.AV]]}),t})()},7342:(I,M,e)=>{e.d(M,{b:()=>v});var n=e(4292),a=e(136),l=e(4762),u=e(8902),o=e(8228),d=e(3749);class r extends o.g{constructor(){super(...arguments),this.description="",this.uom="",this.dimension1=0,this.dimension2=0,this.dimension3=0,this.quantity=0,this.sumQuantity=0,this.note="",this.settled=!1}}class s extends o.g{constructor(){super(...arguments),this.description="",this.uom="",this.quantity=0,this.pricePerUnit=0,this.netPrice=0,this.vatRate=0,this.vatAmount=0,this.grossPrice=0,this.workOrderItems=[]}}(0,l.gn)([(0,u.D)(()=>r)],s.prototype,"workOrderItems",void 0);class c extends o.g{constructor(){super(...arguments),this.name="",this.description=""}}class h extends o.g{constructor(){super(...arguments),this.type="",this.number="",this.dateOfCreate=new Date,this.dateOfTurnover=new Date,this.dateOfMaturity=new Date,this.placeOfIssue="",this.methodOfPayment="",this.comment="",this.netAmount=0,this.vatRate=0,this.vatAmount=0,this.grossAmount=0,this.numberOfCashBill="",this.currency="",this.country="",this.advanceInvoiceOid="",this.advancePayAmount=0,this.preInvoiceOid="",this.buyer=new d.w,this.invoiceItems=[],this.notes=[]}}(0,l.gn)([(0,u.D)(()=>d.w)],h.prototype,"buyer",void 0),(0,l.gn)([(0,u.D)(()=>s)],h.prototype,"invoiceItems",void 0),(0,l.gn)([(0,u.D)(()=>c)],h.prototype,"notes",void 0);var i=e(7716),f=e(7515);let v=(()=>{class y extends n.h{constructor(m){super(m,h,a.NI),this.baseWebService=m}getNextInvoiceNumber(m,g=new Date){return g=new Date(g),this.baseWebService.getRequest(`${a.Mr+"/"+this.domainName}/number?invoiceType=${m}&year=${g.getFullYear()}`)}getAllInvoiceItemDescriptions(){return this.baseWebService.getRequest(a.Mr+"/"+this.domainName+"/invoiceItemDescriptions")}}return y.\u0275fac=function(m){return new(m||y)(i.LFG(f.I))},y.\u0275prov=i.Yz7({token:y,factory:y.\u0275fac}),y})()},7865:(I,M,e)=>{e.d(M,{T:()=>r});var n=e(4292),a=e(136),l=e(8228);class u extends l.g{constructor(){super(...arguments),this.name=""}}var o=e(7716),d=e(7515);let r=(()=>{class s extends n.h{constructor(h){super(h,u,a.Uf),this.baseWebService=h}}return s.\u0275fac=function(h){return new(h||s)(o.LFG(d.I))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac}),s})()},1558:(I,M,e)=>{e.d(M,{X:()=>u});var n=e(136),a=e(7716),l=e(7515);let u=(()=>{class o{constructor(r){this.baseWebService=r}getAllDebtors(){return this.baseWebService.getRequest(n.Mr+"/views/debtors")}getDebtor(r){return this.baseWebService.getRequest(`${n.Mr+"/views/debtors"}/${encodeURI(r)}`)}}return o.\u0275fac=function(r){return new(r||o)(a.LFG(l.I))},o.\u0275prov=a.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},2050:(I,M,e)=>{e.d(M,{o:()=>h});var n=e(4292),a=e(136),l=e(4762),u=e(8902),o=e(8228),d=e(3749);class r extends o.g{constructor(){super(...arguments),this.number="",this.dateOfCreate=new Date,this.placeOfIssue="",this.forPerson="",this.description="",this.note="",this.buyer=new d.w,this.workOrderItems=[],this.images=[]}}(0,l.gn)([(0,u.D)(()=>d.w)],r.prototype,"buyer",void 0);var s=e(7716),c=e(7515);let h=(()=>{class i extends n.h{constructor(v){super(v,r,a.PX),this.baseWebService=v}getNextWorkOrderNumber(v=new Date){return v=new Date(v),this.baseWebService.getRequest(`${a.Mr+"/"+this.domainName}/number?year=${v.getFullYear()}`)}getAllWorkOrderItemDescriptions(){return this.baseWebService.getRequest(a.Mr+"/"+this.domainName+"/workOrderItemDescriptions")}getAllUnsettledWorkOrderForBuyer(v){return this.baseWebService.getRequest(`${a.Mr+"/"+this.domainName}/unsettled?buyerOID=${v}`)}}return i.\u0275fac=function(v){return new(v||i)(s.LFG(c.I))},i.\u0275prov=s.Yz7({token:i,factory:i.\u0275fac}),i})()}}]);
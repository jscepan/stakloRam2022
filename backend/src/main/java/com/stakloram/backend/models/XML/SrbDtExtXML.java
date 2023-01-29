package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class SrbDtExtXML {

    @XmlElement(name = "InvoicedPrepaymentAmmount", namespace = "http://www.w3.org/2001/XMLSchema")
    private InvoicedPrepaymentAmmountXML InvoicedPrepaymentAmmount;
    @XmlElement(name = "ReducedTotals", namespace = "http://www.w3.org/2001/XMLSchema")
    private ReducedTotalsXML reducedTotalsXML;

    public SrbDtExtXML(InvoicedPrepaymentAmmountXML InvoicedPrepaymentAmmount, ReducedTotalsXML reducedTotalsXML) {
        this.InvoicedPrepaymentAmmount = InvoicedPrepaymentAmmount;
        this.reducedTotalsXML = reducedTotalsXML;
    }

    public InvoicedPrepaymentAmmountXML getInvoicedPrepaymentAmmount() {
        return InvoicedPrepaymentAmmount;
    }

    public void setInvoicedPrepaymentAmmount(InvoicedPrepaymentAmmountXML InvoicedPrepaymentAmmount) {
        this.InvoicedPrepaymentAmmount = InvoicedPrepaymentAmmount;
    }

    public ReducedTotalsXML getReducedTotalsXML() {
        return reducedTotalsXML;
    }

    public void setReducedTotalsXML(ReducedTotalsXML reducedTotalsXML) {
        this.reducedTotalsXML = reducedTotalsXML;
    }

}

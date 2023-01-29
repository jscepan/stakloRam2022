package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoicedPrepaymentAmmountXML {

    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String advanceInvoiceNumber;
    @XmlElement(name = "TaxTotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxTotalXML taxTotal;

    public InvoicedPrepaymentAmmountXML(String advanceInvoiceNumber, TaxTotalXML taxTotal) {
        this.advanceInvoiceNumber = advanceInvoiceNumber;
        this.taxTotal = taxTotal;
    }

    public String getAdvanceInvoiceNumber() {
        return advanceInvoiceNumber;
    }

    public void setAdvanceInvoiceNumber(String advanceInvoiceNumber) {
        this.advanceInvoiceNumber = advanceInvoiceNumber;
    }

    public TaxTotalXML getTaxTotal() {
        return taxTotal;
    }

    public void setTaxTotal(TaxTotalXML taxTotal) {
        this.taxTotal = taxTotal;
    }
}

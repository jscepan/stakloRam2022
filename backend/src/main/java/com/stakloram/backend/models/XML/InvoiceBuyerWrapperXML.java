package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceBuyerWrapperXML {

    @XmlElement(name = "Party", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoicePartyXML invoiceBuyer;

    public InvoiceBuyerWrapperXML() {
    }

    public InvoiceBuyerWrapperXML(InvoicePartyXML invoiceBuyer) {
        this.invoiceBuyer = invoiceBuyer;
    }

    public InvoicePartyXML getInvoiceBuyer() {
        return invoiceBuyer;
    }

    public void setInvoiceBuyer(InvoicePartyXML invoiceBuyer) {
        this.invoiceBuyer = invoiceBuyer;
    }
}

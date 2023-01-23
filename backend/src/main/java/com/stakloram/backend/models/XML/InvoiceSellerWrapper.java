package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceSellerWrapper {

    @XmlElement(name = "Party")
    private InvoiceSeller invoiceSeller;

    public InvoiceSellerWrapper() {
    }

    public InvoiceSellerWrapper(InvoiceSeller invoiceSeller) {
        this.invoiceSeller = invoiceSeller;
    }

    public InvoiceSeller getInvoiceSeller() {
        return invoiceSeller;
    }

    public void setInvoiceSeller(InvoiceSeller invoiceSeller) {
        this.invoiceSeller = invoiceSeller;
    }

}

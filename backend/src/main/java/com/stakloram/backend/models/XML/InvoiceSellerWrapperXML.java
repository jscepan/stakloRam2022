package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceSellerWrapperXML {

    @XmlElement(name = "Party")
    private InvoicePartyXML invoiceSeller;

    public InvoiceSellerWrapperXML() {
    }

    public InvoiceSellerWrapperXML(InvoicePartyXML invoiceSeller) {
        this.invoiceSeller = invoiceSeller;
    }

    public InvoicePartyXML getInvoiceSeller() {
        return invoiceSeller;
    }

    public void setInvoiceSeller(InvoicePartyXML invoiceSeller) {
        this.invoiceSeller = invoiceSeller;
    }

}

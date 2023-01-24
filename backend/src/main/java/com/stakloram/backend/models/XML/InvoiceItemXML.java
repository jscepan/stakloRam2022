package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceItemXML {

    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private int id;
    @XmlElement(name = "InvoicedQuantity", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private InvoicedQuantityXML invoicedQuantityXML;
    @XmlElement(name = "LineExtensionAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML lineExtensionAmount;
    @XmlElement(name = "Item", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoiceItemDetailsXML invoiceItemDetailsXML;
    @XmlElement(name = "Price", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PriceXML priceXML;

    public InvoiceItemXML(int id, InvoicedQuantityXML invoicedQuantityXML, CurrencyAmountXML lineExtensionAmount, InvoiceItemDetailsXML invoiceItemDetailsXML, PriceXML priceXML) {
        this.id = id;
        this.invoicedQuantityXML = invoicedQuantityXML;
        this.lineExtensionAmount = lineExtensionAmount;
        this.invoiceItemDetailsXML = invoiceItemDetailsXML;
        this.priceXML = priceXML;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public InvoicedQuantityXML getInvoicedQuantityXML() {
        return invoicedQuantityXML;
    }

    public void setInvoicedQuantityXML(InvoicedQuantityXML invoicedQuantityXML) {
        this.invoicedQuantityXML = invoicedQuantityXML;
    }

    public CurrencyAmountXML getLineExtensionAmount() {
        return lineExtensionAmount;
    }

    public void setLineExtensionAmount(CurrencyAmountXML lineExtensionAmount) {
        this.lineExtensionAmount = lineExtensionAmount;
    }

    public InvoiceItemDetailsXML getInvoiceItemDetailsXML() {
        return invoiceItemDetailsXML;
    }

    public void setInvoiceItemDetailsXML(InvoiceItemDetailsXML invoiceItemDetailsXML) {
        this.invoiceItemDetailsXML = invoiceItemDetailsXML;
    }

    public PriceXML getPriceXML() {
        return priceXML;
    }

    public void setPriceXML(PriceXML priceXML) {
        this.priceXML = priceXML;
    }
}

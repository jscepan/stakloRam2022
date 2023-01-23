package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Invoice")
//@XmlType(namespace = "http://www.example.org/type")
@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceXML {

    @XmlElement(name = "CustomizationID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String customizationID;
    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String number;
    @XmlElement(name = "IssueDate", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String dateOfCreate;
    @XmlElement(name = "DueDate", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String dateOfMaturity;
    @XmlElement(name = "InvoiceTypeCode", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String invoiceTypeCode;
    @XmlElement(name = "DocumentCurrencyCode", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String documentCurrencyCode;
    @XmlElement(name = "InvoicePeriod", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoicePeriodXML invoicePeriod;
    @XmlElement(name = "AccountingSupplierParty", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoiceSellerWrapperXML invoiceSellerWrapper;
    @XmlElement(name = "AccountingCustomerParty", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoiceBuyerWrapperXML invoiceBuyerWrapperXML;

    public InvoiceXML() {
    }

    public String getCustomizationID() {
        return customizationID;
    }

    public void setCustomizationID(String customizationID) {
        this.customizationID = customizationID;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDateOfCreate() {
        return dateOfCreate;
    }

    public void setDateOfCreate(String dateOfCreate) {
        this.dateOfCreate = dateOfCreate;
    }

    public String getDateOfMaturity() {
        return dateOfMaturity;
    }

    public void setDateOfMaturity(String dateOfMaturity) {
        this.dateOfMaturity = dateOfMaturity;
    }

    public String getInvoiceTypeCode() {
        return invoiceTypeCode;
    }

    public void setInvoiceTypeCode(String invoiceTypeCode) {
        this.invoiceTypeCode = invoiceTypeCode;
    }

    public String getDocumentCurrencyCode() {
        return documentCurrencyCode;
    }

    public void setDocumentCurrencyCode(String documentCurrencyCode) {
        this.documentCurrencyCode = documentCurrencyCode;
    }

    public InvoicePeriodXML getInvoicePeriod() {
        return invoicePeriod;
    }

    public void setInvoicePeriod(InvoicePeriodXML invoicePeriod) {
        this.invoicePeriod = invoicePeriod;
    }

    public InvoiceSellerWrapperXML getInvoiceSellerWrapper() {
        return invoiceSellerWrapper;
    }

    public void setInvoiceSellerWrapper(InvoiceSellerWrapperXML invoiceSellerWrapper) {
        this.invoiceSellerWrapper = invoiceSellerWrapper;
    }

    public InvoiceBuyerWrapperXML getInvoiceBuyerWrapperXML() {
        return invoiceBuyerWrapperXML;
    }

    public void setInvoiceBuyerWrapperXML(InvoiceBuyerWrapperXML invoiceBuyerWrapperXML) {
        this.invoiceBuyerWrapperXML = invoiceBuyerWrapperXML;
    }
}

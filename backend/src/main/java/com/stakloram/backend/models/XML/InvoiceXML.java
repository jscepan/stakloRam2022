package com.stakloram.backend.models.XML;

import java.time.LocalDate;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Invoice")
@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceXML {

    @XmlElement(name = "CustomizationID")
    private String customizationID;
    @XmlElement(name = "ID")
    private String number;
    @XmlElement(name = "IssueDate")
    private String dateOfCreate;
    @XmlElement(name = "DueDate")
    private String dateOfMaturity;
    @XmlElement(name = "InvoiceTypeCode")
    private String invoiceTypeCode;
    @XmlElement(name = "DocumentCurrencyCode")
    private String documentCurrencyCode;
    @XmlElement(name = "InvoicePeriod")
    private InvoicePeriod invoicePeriod;
    @XmlElement(name = "AccountingSupplierParty")
    private InvoiceSellerWrapper invoiceSellerWrapper;

//    private String placeOfIssue;
//    private String methodOfPayment;
//    private String comment;
//    private double netAmount;
//    private double vatRate;
//    private double vatAmount;
//    private double grossAmount;
//    private String numberOfCashBill;
//    private String currency;
//    private String country;
//    private String advanceInvoiceOid;
//    private double advancePayAmount;
//    private String preInvoiceOid;
//    private Buyer buyer;
//    private List<InvoiceItem> invoiceItems = new ArrayList<>();
//    private List<Note> notes = new ArrayList<>();
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

    public InvoicePeriod getInvoicePeriod() {
        return invoicePeriod;
    }

    public void setInvoicePeriod(InvoicePeriod invoicePeriod) {
        this.invoicePeriod = invoicePeriod;
    }

    public InvoiceSellerWrapper getInvoiceSellerWrapper() {
        return invoiceSellerWrapper;
    }

    public void setInvoiceSellerWrapper(InvoiceSellerWrapper invoiceSellerWrapper) {
        this.invoiceSellerWrapper = invoiceSellerWrapper;
    }

}

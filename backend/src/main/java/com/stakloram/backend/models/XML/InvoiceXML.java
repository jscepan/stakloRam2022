package com.stakloram.backend.models.XML;

import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Invoice")
@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceXML {

    @XmlElement(name = "UBLExtensions", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2")
    private List<UBLExtensionXML> ublExtensions;
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
    @XmlElement(name = "Note", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String note;
    @XmlElement(name = "DocumentCurrencyCode", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String documentCurrencyCode;
    @XmlElement(name = "InvoicePeriod", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoicePeriodXML invoicePeriod;
    @XmlElement(name = "ContractDocumentReferenceXML", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private ContractDocumentReferenceXML contractDocumentReferenceXML;
    @XmlElement(name = "AccountingSupplierParty", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoiceSellerWrapperXML invoiceSellerWrapper;
    @XmlElement(name = "AccountingCustomerParty", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private InvoiceBuyerWrapperXML invoiceBuyerWrapperXML;
    @XmlElement(name = "Delivery", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private DeliveryXML deliveryXML;
    @XmlElement(name = "PaymentMeans", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PaymentMeansXML paymentMeansXML;
    @XmlElement(name = "TaxTotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxTotalXML taxTotalXML;
    @XmlElement(name = "LegalMonetaryTotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private LegalMonetaryTotalXML legalMonetaryTotal;
    @XmlElement(name = "InvoiceLine", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private List<InvoiceItemXML> invoiceItemsXML;

    public InvoiceXML() {
    }

    public List<UBLExtensionXML> getUblExtensions() {
        return ublExtensions;
    }

    public void setUblExtensions(List<UBLExtensionXML> ublExtensions) {
        this.ublExtensions = ublExtensions;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getDocumentCurrencyCode() {
        return documentCurrencyCode;
    }

    public void setDocumentCurrencyCode(String documentCurrencyCode) {
        this.documentCurrencyCode = documentCurrencyCode;
    }

    public ContractDocumentReferenceXML getContractDocumentReferenceXML() {
        return contractDocumentReferenceXML;
    }

    public void setContractDocumentReferenceXML(ContractDocumentReferenceXML contractDocumentReferenceXML) {
        this.contractDocumentReferenceXML = contractDocumentReferenceXML;
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

    public DeliveryXML getDeliveryXML() {
        return deliveryXML;
    }

    public void setDeliveryXML(DeliveryXML deliveryXML) {
        this.deliveryXML = deliveryXML;
    }

    public PaymentMeansXML getPaymentMeansXML() {
        return paymentMeansXML;
    }

    public void setPaymentMeansXML(PaymentMeansXML paymentMeansXML) {
        this.paymentMeansXML = paymentMeansXML;
    }

    public TaxTotalXML getTaxTotalXML() {
        return taxTotalXML;
    }

    public void setTaxTotalXML(TaxTotalXML taxTotalXML) {
        this.taxTotalXML = taxTotalXML;
    }

    public LegalMonetaryTotalXML getLegalMonetaryTotal() {
        return legalMonetaryTotal;
    }

    public void setLegalMonetaryTotal(LegalMonetaryTotalXML legalMonetaryTotal) {
        this.legalMonetaryTotal = legalMonetaryTotal;
    }

    public List<InvoiceItemXML> getInvoiceItemsXML() {
        return invoiceItemsXML;
    }

    public void setInvoiceItemsXML(List<InvoiceItemXML> invoiceItemsXML) {
        this.invoiceItemsXML = invoiceItemsXML;
    }
}

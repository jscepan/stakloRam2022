package com.stakloram.backend.models;

// These are settings for FRONTEND application
import java.util.Map;

public class Settings {

    private String companyEmail;
    private String companyWebsite;

    private String invoiceMethodOfPayment;
    private String invoicePlaceOfIssue;
    private String invoiceCurrency;
    private String invoiceCountry;
    private double invoiceVatRate;
    private String invoiceCompanyName;
    private String invoiceCompanyStreet;
    private String invoiceZipCodeCity;
    private String invoiceContactsPhoneFax;
    private String invoiceCompanyDescription;
    private String invoiceBankAccounts;
    private String invoiceComplaints;
    private String invoiceForeignNote;
    private Map<String, String> invoiceForeignNotes;

    private String qrCodeIdentCode;
    private String qrCodeVersion;
    private String qrCodeSignSet;
    private String qrCodeAccountNumber;
    private String qrCodeCompanyName;
    private String qrCodeCurrency;
    private String qrCodePayingCodePerson;
    private String qrCodePayingCodeCompany;
    private String qrCodePayingPurpose;

    private double termoizolacGlassMinArea;
    private int constructionMeasureCM;
    private String workOrderPlaceOfIssue;
    private String workOrderCompanyDescription;
    private String workOrderHeadingLine1;
    private String workOrderHeadingLine2;
    private String workOrderHeadingLine3;

    public Settings() {
    }

    public String getInvoiceCountry() {
        return invoiceCountry;
    }

    public void setInvoiceCountry(String invoiceCountry) {
        this.invoiceCountry = invoiceCountry;
    }

    public String getInvoicePlaceOfIssue() {
        return invoicePlaceOfIssue;
    }

    public void setInvoicePlaceOfIssue(String invoicePlaceOfIssue) {
        this.invoicePlaceOfIssue = invoicePlaceOfIssue;
    }

    public String getWorkOrderPlaceOfIssue() {
        return workOrderPlaceOfIssue;
    }

    public void setWorkOrderPlaceOfIssue(String workOrderPlaceOfIssue) {
        this.workOrderPlaceOfIssue = workOrderPlaceOfIssue;
    }

    public String getInvoiceCurrency() {
        return invoiceCurrency;
    }

    public void setInvoiceCurrency(String invoiceCurrency) {
        this.invoiceCurrency = invoiceCurrency;
    }

    public double getInvoiceVatRate() {
        return invoiceVatRate;
    }

    public void setInvoiceVatRate(double invoiceVatRate) {
        this.invoiceVatRate = invoiceVatRate;
    }

    public String getQrCodeIdentCode() {
        return qrCodeIdentCode;
    }

    public void setQrCodeIdentCode(String qrCodeIdentCode) {
        this.qrCodeIdentCode = qrCodeIdentCode;
    }

    public String getQrCodeVersion() {
        return qrCodeVersion;
    }

    public void setQrCodeVersion(String qrCodeVersion) {
        this.qrCodeVersion = qrCodeVersion;
    }

    public String getQrCodeSignSet() {
        return qrCodeSignSet;
    }

    public void setQrCodeSignSet(String qrCodeSignSet) {
        this.qrCodeSignSet = qrCodeSignSet;
    }

    public String getQrCodeAccountNumber() {
        return qrCodeAccountNumber;
    }

    public void setQrCodeAccountNumber(String qrCodeAccountNumber) {
        this.qrCodeAccountNumber = qrCodeAccountNumber;
    }

    public String getQrCodeCompanyName() {
        return qrCodeCompanyName;
    }

    public void setQrCodeCompanyName(String qrCodeCompanyName) {
        this.qrCodeCompanyName = qrCodeCompanyName;
    }

    public String getQrCodeCurrency() {
        return qrCodeCurrency;
    }

    public void setQrCodeCurrency(String qrCodeCurrency) {
        this.qrCodeCurrency = qrCodeCurrency;
    }

    public String getQrCodePayingCodePerson() {
        return qrCodePayingCodePerson;
    }

    public void setQrCodePayingCodePerson(String qrCodePayingCodePerson) {
        this.qrCodePayingCodePerson = qrCodePayingCodePerson;
    }

    public String getQrCodePayingCodeCompany() {
        return qrCodePayingCodeCompany;
    }

    public void setQrCodePayingCodeCompany(String qrCodePayingCodeCompany) {
        this.qrCodePayingCodeCompany = qrCodePayingCodeCompany;
    }

    public String getQrCodePayingPurpose() {
        return qrCodePayingPurpose;
    }

    public void setQrCodePayingPurpose(String qrCodePayingPurpose) {
        this.qrCodePayingPurpose = qrCodePayingPurpose;
    }

    public double getTermoizolacGlassMinArea() {
        return termoizolacGlassMinArea;
    }

    public void setTermoizolacGlassMinArea(double termoizolacGlassMinArea) {
        this.termoizolacGlassMinArea = termoizolacGlassMinArea;
    }

    public int getConstructionMeasureCM() {
        return constructionMeasureCM;
    }

    public void setConstructionMeasureCM(int constructionMeasureCM) {
        this.constructionMeasureCM = constructionMeasureCM;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getWorkOrderCompanyDescription() {
        return workOrderCompanyDescription;
    }

    public void setWorkOrderCompanyDescription(String workOrderCompanyDescription) {
        this.workOrderCompanyDescription = workOrderCompanyDescription;
    }

    public String getWorkOrderHeadingLine1() {
        return workOrderHeadingLine1;
    }

    public void setWorkOrderHeadingLine1(String workOrderHeadingLine1) {
        this.workOrderHeadingLine1 = workOrderHeadingLine1;
    }

    public String getWorkOrderHeadingLine2() {
        return workOrderHeadingLine2;
    }

    public void setWorkOrderHeadingLine2(String workOrderHeadingLine2) {
        this.workOrderHeadingLine2 = workOrderHeadingLine2;
    }

    public String getWorkOrderHeadingLine3() {
        return workOrderHeadingLine3;
    }

    public void setWorkOrderHeadingLine3(String workOrderHeadingLine3) {
        this.workOrderHeadingLine3 = workOrderHeadingLine3;
    }

    public String getInvoiceMethodOfPayment() {
        return invoiceMethodOfPayment;
    }

    public void setInvoiceMethodOfPayment(String invoiceMethodOfPayment) {
        this.invoiceMethodOfPayment = invoiceMethodOfPayment;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    public String getInvoiceCompanyName() {
        return invoiceCompanyName;
    }

    public void setInvoiceCompanyName(String invoiceCompanyName) {
        this.invoiceCompanyName = invoiceCompanyName;
    }

    public String getInvoiceCompanyStreet() {
        return invoiceCompanyStreet;
    }

    public void setInvoiceCompanyStreet(String invoiceCompanyStreet) {
        this.invoiceCompanyStreet = invoiceCompanyStreet;
    }

    public String getInvoiceZipCodeCity() {
        return invoiceZipCodeCity;
    }

    public void setInvoiceZipCodeCity(String invoiceZipCodeCity) {
        this.invoiceZipCodeCity = invoiceZipCodeCity;
    }

    public String getInvoiceContactsPhoneFax() {
        return invoiceContactsPhoneFax;
    }

    public void setInvoiceContactsPhoneFax(String invoiceContactsPhoneFax) {
        this.invoiceContactsPhoneFax = invoiceContactsPhoneFax;
    }

    public String getInvoiceCompanyDescription() {
        return invoiceCompanyDescription;
    }

    public void setInvoiceCompanyDescription(String invoiceCompanyDescription) {
        this.invoiceCompanyDescription = invoiceCompanyDescription;
    }

    public String getInvoiceBankAccounts() {
        return invoiceBankAccounts;
    }

    public void setInvoiceBankAccounts(String invoiceBankAccounts) {
        this.invoiceBankAccounts = invoiceBankAccounts;
    }

    public String getInvoiceComplaints() {
        return invoiceComplaints;
    }

    public void setInvoiceComplaints(String invoiceComplaints) {
        this.invoiceComplaints = invoiceComplaints;
    }

    public String getInvoiceForeignNote() {
        return invoiceForeignNote;
    }

    public void setInvoiceForeignNote(String invoiceForeignNote) {
        this.invoiceForeignNote = invoiceForeignNote;
    }

    public Map<String, String> getInvoiceForeignNotes() {
        return invoiceForeignNotes;
    }

    public void setInvoiceForeignNotes(Map<String, String> invoiceForeignNotes) {
        this.invoiceForeignNotes = invoiceForeignNotes;
    }
}

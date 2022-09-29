package com.stakloram.backend.models;

import java.util.Arrays;
import java.util.List;

// These are settings for FRONTEND application
public class Settings {

    private String companyEmail = "staklorambp@gmail.com";
    private String companyWebsite = "www.stakloram.com";

    private String invoiceMethodOfPayment = "Virman";
    private String invoiceMethodOfPaymentForCashBill = "Keš";
    private String invoiceTaxFreeText = "OSLOBOĐENO PLAĆANJA PDV-a PO ČLANU 10, STAV 2, TAČKA 3, ZAKONA O PDV-u";
    private String invoicePlaceOfIssue = "Bačka Palanka";
    private String invoiceCurrency = "rsd";
    private String invoiceCountry = "Srbija";
    private double invoiceVatRate = 20.0;
    private String invoiceCompanyName = "STAKLO RAM PLUS s.z.t.r.";
    private String invoiceCompanyStreet = "Žarka Zrenjanina 70";
    private String invoiceZipCodeCity = "21400 Bačka Palanka";
    private String invoiceContactsPhoneFax = "tel-fax: +381 21 60 44 182";
    private String invoiceCompanyDescription = "Šifra del.: 2312; MB: 62199130; PIB: 105509737;";
    private String invoiceBankAccounts = "Tekući račun: 310-16916-02 NLB, 330-11001154-04 Credit Agricole";
    private String invoiceComplaints = "Reklamacije se uvažavaju u roku od 8 dana od dana prijema robe. Za eventualne sporove nadležan je privredni Sud u Novom Sadu.";
    private String invoiceForeignNote = "Oslobođeno poreza na dodatu vrednost na osnovu člana 24, stav 1, tačka 2 Zakona o PDV-u (službeni glasnik RS broj 84/2004 i 86/2004). Uz fakturu se prilaže i otpremnica broj ___. Paritet: DAP Ilok Izvoznik proizvoda obuhvaćenih ovom ispravom izjavljuje da su, osim ako je to drugačije izričito navedeno, ovi proizvodi srpskog referencijalnog porekla. Izjavu dao: Milan Paravina Bačka Palanka, ";
    private List<KeyValue> invoiceForeignNotes = Arrays.asList(new KeyValue("DEVIZNI RAČUN:", "00-710-0000329.2"), new KeyValue("IBAN:", "RS35310007100000329270"), new KeyValue("SWIFT:", "CONARS22"), new KeyValue("Broj koleta:", "1"), new KeyValue("Bruto kg:", "1"), new KeyValue("Neto kg:", "1"));

    private boolean qrCodeShowOnInvoice = true;
    private String qrCodeIdentCode = "PR";
    private String qrCodeVersion = "01";
    private String qrCodeSignSet = "1";
    private String qrCodeAccountNumber = "310000000001691602";
    private String qrCodeCompanyName = "STAKLO RAM PLUS s.z.t.r.";
    private String qrCodeCurrency = "RSD";
    private String qrCodePayingCodePerson = "289";
    private String qrCodePayingCodeCompany = "121";
    private String qrCodePayingPurpose = "Plaćanje po fakturi";

    private double termoizolacGlassMinArea = 0.2;
    private int constructionMeasureCM = 3;
    private String workOrderPlaceOfIssue = "Bačka Palanka";
    private String workOrderCompanyDescription = "21400 Bačka Palanka. Žarka Zrenjanina 70; Tel.: 021/60 44 182; PIB: 105509737; T.R.: 310-16916-02 NLB Banka";
    private String workOrderHeadingLine1 = "Proizvodnja termoizolacionog stakla";
    private String workOrderHeadingLine2 = "Oblikovanje i obrada ravnog stakla";
    private String workOrderHeadingLine3 = "Proizvodnja lajsni za ramove i uramljivanje slika";

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

    public boolean isQrCodeShowOnInvoice() {
        return qrCodeShowOnInvoice;
    }

    public void setQrCodeShowOnInvoice(boolean qrCodeShowOnInvoice) {
        this.qrCodeShowOnInvoice = qrCodeShowOnInvoice;
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

    public String getInvoiceMethodOfPaymentForCashBill() {
        return invoiceMethodOfPaymentForCashBill;
    }

    public void setInvoiceMethodOfPaymentForCashBill(String invoiceMethodOfPaymentForCashBill) {
        this.invoiceMethodOfPaymentForCashBill = invoiceMethodOfPaymentForCashBill;
    }

    public String getInvoiceTaxFreeText() {
        return invoiceTaxFreeText;
    }

    public void setInvoiceTaxFreeText(String invoiceTaxFreeText) {
        this.invoiceTaxFreeText = invoiceTaxFreeText;
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

    public List<KeyValue> getInvoiceForeignNotes() {
        return invoiceForeignNotes;
    }

    public void setInvoiceForeignNotes(List<KeyValue> invoiceForeignNotes) {
        this.invoiceForeignNotes = invoiceForeignNotes;
    }
}

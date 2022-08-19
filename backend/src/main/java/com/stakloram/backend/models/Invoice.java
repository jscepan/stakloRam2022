package com.stakloram.backend.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Invoice extends BaseModel {

    private InvoiceType type;
    private String number;
    private String numberSign;
    private LocalDate dateOfCreate;
    private LocalDate dateOfTurnover;
    private LocalDate dateOfMaturity;
    private String placeOfIssue;
    private String methodOfPayment;
    private String comment;
    private double netAmount;
    private double vatRate;
    private double vatAmount;
    private double grossAmount;
    private String numberOfCashBill;
    private String currency;
    private String country;
    private String advanceInvoiceOid;
    private double advancePayAmount;
    private String preInvoiceOid;
    private Buyer buyer;
    private List<InvoiceItem> invoiceItems = new ArrayList<>();
    private List<Note> notes = new ArrayList<>();

    public Invoice() {
    }

    public Invoice(String oid) {
        super(oid);
    }

    public Invoice(Long id) {
        super(id);
    }

    public Invoice(InvoiceType type, String number, String numberSign, LocalDate dateOfCreate, LocalDate dateOfTurnover, LocalDate dateOfMaturity, String placeOfIssue, String methodOfPayment, String comment, double netAmount, double vatRate, double vatAmount, double grossAmount, String numberOfCashBill, String currency, String country, String advanceInvoiceOid, double advancePayAmount, String preInvoiceOid, Buyer buyer) {
        this.type = type;
        this.number = number;
        this.numberSign = numberSign;
        this.dateOfCreate = dateOfCreate;
        this.dateOfTurnover = dateOfTurnover;
        this.dateOfMaturity = dateOfMaturity;
        this.placeOfIssue = placeOfIssue;
        this.methodOfPayment = methodOfPayment;
        this.comment = comment;
        this.netAmount = netAmount;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossAmount = grossAmount;
        this.numberOfCashBill = numberOfCashBill;
        this.currency = currency;
        this.country = country;
        this.advanceInvoiceOid = advanceInvoiceOid;
        this.advancePayAmount = advancePayAmount;
        this.preInvoiceOid = preInvoiceOid;
        this.buyer = buyer;
    }

    public Invoice(InvoiceType type, String number, String numberSign, LocalDate dateOfCreate, LocalDate dateOfTurnover, LocalDate dateOfMaturity, String placeOfIssue, String methodOfPayment, String comment, double netAmount, double vatRate, double vatAmount, double grossAmount, String numberOfCashBill, String currency, String country, String advanceInvoiceOid, double advancePayAmount, String preInvoiceOid, Buyer buyer, String oid) {
        super(oid);
        this.type = type;
        this.number = number;
        this.numberSign = numberSign;
        this.dateOfCreate = dateOfCreate;
        this.dateOfTurnover = dateOfTurnover;
        this.dateOfMaturity = dateOfMaturity;
        this.placeOfIssue = placeOfIssue;
        this.methodOfPayment = methodOfPayment;
        this.comment = comment;
        this.netAmount = netAmount;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossAmount = grossAmount;
        this.numberOfCashBill = numberOfCashBill;
        this.currency = currency;
        this.country = country;
        this.advanceInvoiceOid = advanceInvoiceOid;
        this.advancePayAmount = advancePayAmount;
        this.preInvoiceOid = preInvoiceOid;
        this.buyer = buyer;
    }

    public Invoice(InvoiceType type, String number, String numberSign, LocalDate dateOfCreate, LocalDate dateOfTurnover, LocalDate dateOfMaturity, String placeOfIssue, String methodOfPayment, String comment, double netAmount, double vatRate, double vatAmount, double grossAmount, String numberOfCashBill, String currency, String country, String advanceInvoiceOid, double advancePayAmount, String preInvoiceOid, Buyer buyer, Long id) {
        super(id);
        this.type = type;
        this.number = number;
        this.numberSign = numberSign;
        this.dateOfCreate = dateOfCreate;
        this.dateOfTurnover = dateOfTurnover;
        this.dateOfMaturity = dateOfMaturity;
        this.placeOfIssue = placeOfIssue;
        this.methodOfPayment = methodOfPayment;
        this.comment = comment;
        this.netAmount = netAmount;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossAmount = grossAmount;
        this.numberOfCashBill = numberOfCashBill;
        this.currency = currency;
        this.country = country;
        this.advanceInvoiceOid = advanceInvoiceOid;
        this.advancePayAmount = advancePayAmount;
        this.preInvoiceOid = preInvoiceOid;
        this.buyer = buyer;
    }

    public InvoiceType getType() {
        return type;
    }

    public void setType(InvoiceType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumberSign() {
        return numberSign;
    }

    public void setNumberSign(String numberSign) {
        this.numberSign = numberSign;
    }

    public LocalDate getDateOfCreate() {
        return dateOfCreate;
    }

    public void setDateOfCreate(LocalDate dateOfCreate) {
        this.dateOfCreate = dateOfCreate;
    }

    public LocalDate getDateOfTurnover() {
        return dateOfTurnover;
    }

    public void setDateOfTurnover(LocalDate dateOfTurnover) {
        this.dateOfTurnover = dateOfTurnover;
    }

    public LocalDate getDateOfMaturity() {
        return dateOfMaturity;
    }

    public void setDateOfMaturity(LocalDate dateOfMaturity) {
        this.dateOfMaturity = dateOfMaturity;
    }

    public String getPlaceOfIssue() {
        return placeOfIssue;
    }

    public void setPlaceOfIssue(String placeOfIssue) {
        this.placeOfIssue = placeOfIssue;
    }

    public String getMethodOfPayment() {
        return methodOfPayment;
    }

    public void setMethodOfPayment(String methodOfPayment) {
        this.methodOfPayment = methodOfPayment;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(double netAmount) {
        this.netAmount = netAmount;
    }

    public double getVatRate() {
        return vatRate;
    }

    public void setVatRate(double vatRate) {
        this.vatRate = vatRate;
    }

    public double getVatAmount() {
        return vatAmount;
    }

    public void setVatAmount(double vatAmount) {
        this.vatAmount = vatAmount;
    }

    public double getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(double grossAmount) {
        this.grossAmount = grossAmount;
    }

    public String getNumberOfCashBill() {
        return numberOfCashBill;
    }

    public void setNumberOfCashBill(String numberOfCashBill) {
        this.numberOfCashBill = numberOfCashBill;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAdvanceInvoiceOid() {
        return advanceInvoiceOid;
    }

    public void setAdvanceInvoiceOid(String advanceInvoiceOid) {
        this.advanceInvoiceOid = advanceInvoiceOid;
    }

    public String getPreInvoiceOid() {
        return preInvoiceOid;
    }

    public void setPreInvoiceOid(String preInvoiceOid) {
        this.preInvoiceOid = preInvoiceOid;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public List<InvoiceItem> getInvoiceItems() {
        return invoiceItems;
    }

    public void setInvoiceItems(List<InvoiceItem> invoiceItems) {
        this.invoiceItems = invoiceItems;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public double getAdvancePayAmount() {
        return advancePayAmount;
    }

    public void setAdvancePayAmount(double advancePayAmount) {
        this.advancePayAmount = advancePayAmount;
    }

    @Override
    public String toString() {
        return "Invoice{" + "type=" + type + ", number=" + number + ", numberSign=" + numberSign + ", dateOfCreate=" + dateOfCreate + ", dateOfTurnover=" + dateOfTurnover + ", dateOfMaturity=" + dateOfMaturity + ", placeOfIssue=" + placeOfIssue + ", methodOfPayment=" + methodOfPayment + ", comment=" + comment + ", netAmount=" + netAmount + ", vatRate=" + vatRate + ", vatAmount=" + vatAmount + ", grossAmount=" + grossAmount + ", numberOfCashBill=" + numberOfCashBill + ", currency=" + currency + ", country=" + country + ", advanceInvoiceOid=" + advanceInvoiceOid + ", advancePayAmount=" + advancePayAmount + ", preInvoiceOid=" + preInvoiceOid + ", buyer=" + buyer + ", invoiceItems=" + invoiceItems + ", notes=" + notes + '}';
    }

    public enum InvoiceType {
        DOMESTIC, FOREIGN, CASH, PRE_INVOICE, ADVANCE_INVOICE
    }
}

package com.stakloram.backend.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Invoice extends BaseModel {

    private InvoiceType type;
    private String number;
    private LocalDate dateOfCreate;
    private LocalDate dateOfTurnover;
    private LocalDate dateOfMaturity;
    private String placeOfIssue;
    private double netAmount;
    private double vatAmount;
    private double grossAmount;
    private String numberOfCashBill;
    private String currency;
    private String country;
    private String comment;
    private boolean disabled;
    private String advanceInvoiceOid;
    private String preInvoiceOid;
    private Buyer buyer;
    private List<InvoiceItem> invoiceItems = new ArrayList<>();

    public Invoice(String oid) {
        super(oid);
    }

    public Invoice(Long id) {
        super(id);
    }

    public Invoice(InvoiceType type, String number, LocalDate dateOfCreate, LocalDate dateOfTurnover, LocalDate dateOfMaturity, String placeOfIssue, double netAmount, double vatAmount, double grossAmount, String numberOfCashBill, String currency, String country, String comment, boolean disabled, String advanceInvoiceOid, String preInvoiceOid, Buyer buyer, String oid) {
        super(oid);
        this.type = type;
        this.number = number;
        this.dateOfCreate = dateOfCreate;
        this.dateOfTurnover = dateOfTurnover;
        this.dateOfMaturity = dateOfMaturity;
        this.placeOfIssue = placeOfIssue;
        this.netAmount = netAmount;
        this.vatAmount = vatAmount;
        this.grossAmount = grossAmount;
        this.numberOfCashBill = numberOfCashBill;
        this.currency = currency;
        this.country = country;
        this.comment = comment;
        this.disabled = disabled;
        this.advanceInvoiceOid = advanceInvoiceOid;
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

    public double getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(double netAmount) {
        this.netAmount = netAmount;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getAdvanceInvoiceOid() {
        return advanceInvoiceOid;
    }

    public void setAdvanceInvoiceOid(String advanceInvoiceOid) {
        this.advanceInvoiceOid = advanceInvoiceOid;
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

    public String getPreInvoiceOid() {
        return preInvoiceOid;
    }

    public void setPreInvoiceOid(String preInvoiceOid) {
        this.preInvoiceOid = preInvoiceOid;
    }

    public enum InvoiceType {
        DOMESTIC, FOREIGN, CASH, PRE_INVOICE, ADVANCE_INVOICE
    }
}

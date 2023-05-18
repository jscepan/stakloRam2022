package com.stakloram.backend.models;

import java.time.LocalDateTime;

public class RegistratedInvoice extends BaseModel {

    private int InvoiceId;
    private int PurchaseInvoiceId;
    private int SalesInvoiceId;
    private LocalDateTime date;
    private Invoice invoice;

    public RegistratedInvoice() {
    }

    public RegistratedInvoice(int InvoiceId, int PurchaseInvoiceId, int SalesInvoiceId, LocalDateTime date, Invoice invoice) {
        this.InvoiceId = InvoiceId;
        this.PurchaseInvoiceId = PurchaseInvoiceId;
        this.SalesInvoiceId = SalesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public RegistratedInvoice(int InvoiceId, int PurchaseInvoiceId, int SalesInvoiceId, LocalDateTime date, Invoice invoice, String oid) {
        super(oid);
        this.InvoiceId = InvoiceId;
        this.PurchaseInvoiceId = PurchaseInvoiceId;
        this.SalesInvoiceId = SalesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public RegistratedInvoice(int InvoiceId, int PurchaseInvoiceId, int SalesInvoiceId, LocalDateTime date, Invoice invoice, Long id) {
        super(id);
        this.InvoiceId = InvoiceId;
        this.PurchaseInvoiceId = PurchaseInvoiceId;
        this.SalesInvoiceId = SalesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public int getInvoiceId() {
        return InvoiceId;
    }

    public void setInvoiceId(int InvoiceId) {
        this.InvoiceId = InvoiceId;
    }

    public int getPurchaseInvoiceId() {
        return PurchaseInvoiceId;
    }

    public void setPurchaseInvoiceId(int PurchaseInvoiceId) {
        this.PurchaseInvoiceId = PurchaseInvoiceId;
    }

    public int getSalesInvoiceId() {
        return SalesInvoiceId;
    }

    public void setSalesInvoiceId(int SalesInvoiceId) {
        this.SalesInvoiceId = SalesInvoiceId;
    }

    public RegistratedInvoice(String oid) {
        super(oid);
    }

    public RegistratedInvoice(Long id) {
        super(id);
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    @Override
    public String toString() {
        return "RegistratedInvoice{" + "InvoiceId=" + InvoiceId + ", PurchaseInvoiceId=" + PurchaseInvoiceId + ", SalesInvoiceId=" + SalesInvoiceId + ", date=" + date + ", invoice=" + invoice + '}';
    }
}

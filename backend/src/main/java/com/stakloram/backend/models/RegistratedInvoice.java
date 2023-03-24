package com.stakloram.backend.models;

import java.time.LocalDateTime;

public class RegistratedInvoice extends BaseModel {

    private int invoiceId;
    private int purchaseInvoiceId;
    private int salesInvoiceId;
    private LocalDateTime date;
    private Invoice invoice;

    public RegistratedInvoice() {
    }

    public RegistratedInvoice(String oid) {
        super(oid);
    }

    public RegistratedInvoice(Long id) {
        super(id);
    }

    public RegistratedInvoice(int invoiceId, int purchaseInvoiceId, int salesInvoiceId, LocalDateTime date, Invoice invoice) {
        this.invoiceId = invoiceId;
        this.purchaseInvoiceId = purchaseInvoiceId;
        this.salesInvoiceId = salesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public RegistratedInvoice(int invoiceId, int purchaseInvoiceId, int salesInvoiceId, LocalDateTime date, Invoice invoice, String oid) {
        super(oid);
        this.invoiceId = invoiceId;
        this.purchaseInvoiceId = purchaseInvoiceId;
        this.salesInvoiceId = salesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public RegistratedInvoice(int invoiceId, int purchaseInvoiceId, int salesInvoiceId, LocalDateTime date, Invoice invoice, Long id) {
        super(id);
        this.invoiceId = invoiceId;
        this.purchaseInvoiceId = purchaseInvoiceId;
        this.salesInvoiceId = salesInvoiceId;
        this.date = date;
        this.invoice = invoice;
    }

    public int getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(int invoiceId) {
        this.invoiceId = invoiceId;
    }

    public int getPurchaseInvoiceId() {
        return purchaseInvoiceId;
    }

    public void setPurchaseInvoiceId(int purchaseInvoiceId) {
        this.purchaseInvoiceId = purchaseInvoiceId;
    }

    public int getSalesInvoiceId() {
        return salesInvoiceId;
    }

    public void setSalesInvoiceId(int salesInvoiceId) {
        this.salesInvoiceId = salesInvoiceId;
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
        return "RegistratedInvoice{" + "invoiceId=" + invoiceId + ", purchaseInvoiceId=" + purchaseInvoiceId + ", salesInvoiceId=" + salesInvoiceId + ", date=" + date + ", invoice=" + invoice + '}';
    }
}

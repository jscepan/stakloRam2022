package com.stakloram.backend.models.XML;

public class ImportSalesUblResponse {

    private int InvoiceId;
    private int PurchaseInvoiceId;
    private int SalesInvoiceId;

    public ImportSalesUblResponse() {
    }

    public ImportSalesUblResponse(int InvoiceId, int PurchaseInvoiceId, int SalesInvoiceId) {
        this.InvoiceId = InvoiceId;
        this.PurchaseInvoiceId = PurchaseInvoiceId;
        this.SalesInvoiceId = SalesInvoiceId;
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

    @Override
    public String toString() {
        return "ImportSalesUblResponse{" + "InvoiceId=" + InvoiceId + ", PurchaseInvoiceId=" + PurchaseInvoiceId + ", SalesInvoiceId=" + SalesInvoiceId + '}';
    }
}

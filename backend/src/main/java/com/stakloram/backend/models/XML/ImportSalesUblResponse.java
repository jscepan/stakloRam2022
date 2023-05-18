package com.stakloram.backend.models.XML;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ImportSalesUblResponse {

    @JsonProperty("InvoiceId")
    private int InvoiceId;
    @JsonProperty("PurchaseInvoiceId")
    private int PurchaseInvoiceId;
    @JsonProperty("SalesInvoiceId")
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

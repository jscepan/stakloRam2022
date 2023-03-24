package com.stakloram.backend.models.XML;

public class ImportSalesUblResponse {

    private int invoiceId;
    private int purchaseInvoiceId;
    private int salesInvoiceId;

    public ImportSalesUblResponse() {
    }

    public ImportSalesUblResponse(int invoiceId, int purchaseInvoiceId, int salesInvoiceId) {
        this.invoiceId = invoiceId;
        this.purchaseInvoiceId = purchaseInvoiceId;
        this.salesInvoiceId = salesInvoiceId;
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

    @Override
    public String toString() {
        return "ImportSalesUblResponse{" + "invoiceId=" + invoiceId + ", purchaseInvoiceId=" + purchaseInvoiceId + ", salesInvoiceId=" + salesInvoiceId + '}';
    }
}

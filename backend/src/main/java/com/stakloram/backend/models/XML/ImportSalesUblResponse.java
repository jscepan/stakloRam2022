package com.stakloram.backend.models.XML;

public class ImportSalesUblResponse {

    private String invoiceId;
    private String purchaseInvoiceId;
    private String salesInvoiceId;

    public ImportSalesUblResponse() {
    }

    public ImportSalesUblResponse(String invoiceId, String purchaseInvoiceId, String salesInvoiceId) {
        this.invoiceId = invoiceId;
        this.purchaseInvoiceId = purchaseInvoiceId;
        this.salesInvoiceId = salesInvoiceId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getPurchaseInvoiceId() {
        return purchaseInvoiceId;
    }

    public void setPurchaseInvoiceId(String purchaseInvoiceId) {
        this.purchaseInvoiceId = purchaseInvoiceId;
    }

    public String getSalesInvoiceId() {
        return salesInvoiceId;
    }

    public void setSalesInvoiceId(String salesInvoiceId) {
        this.salesInvoiceId = salesInvoiceId;
    }

    @Override
    public String toString() {
        return "ImportSalesUblResponse{" + "invoiceId=" + invoiceId + ", purchaseInvoiceId=" + purchaseInvoiceId + ", salesInvoiceId=" + salesInvoiceId + '}';
    }
}

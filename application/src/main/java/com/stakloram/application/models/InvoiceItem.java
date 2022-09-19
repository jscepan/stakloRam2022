package com.stakloram.application.models;

import java.util.ArrayList;
import java.util.List;

public class InvoiceItem extends BaseModel {

    private String description;
    private String uom;
    private double quantity;
    private double pricePerUnit;
    private double netPrice;
    private double vatRate;
    private double vatAmount;
    private double grossPrice;
    private List<WorkOrderItem> workOrderItems = new ArrayList<>();

    public InvoiceItem() {
    }

    public InvoiceItem(String oid) {
        super(oid);
    }

    public InvoiceItem(Long id) {
        super(id);
    }

    public InvoiceItem(String description, String uom, double quantity, double pricePerUnit, double netPrice, double vatRate, double vatAmount, double grossPrice) {
        this.description = description;
        this.uom = uom;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.netPrice = netPrice;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossPrice = grossPrice;
    }

    public InvoiceItem(String description, String uom, double quantity, double pricePerUnit, double netPrice, double vatRate, double vatAmount, double grossPrice, String oid) {
        super(oid);
        this.description = description;
        this.uom = uom;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.netPrice = netPrice;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossPrice = grossPrice;
    }

    public InvoiceItem(String description, String uom, double quantity, double pricePerUnit, double netPrice, double vatRate, double vatAmount, double grossPrice, Long id) {
        super(id);
        this.description = description;
        this.uom = uom;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.netPrice = netPrice;
        this.vatRate = vatRate;
        this.vatAmount = vatAmount;
        this.grossPrice = grossPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public double getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(double netPrice) {
        this.netPrice = netPrice;
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

    public double getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(double grossPrice) {
        this.grossPrice = grossPrice;
    }

    public List<WorkOrderItem> getWorkOrderItems() {
        return workOrderItems;
    }

    public void setWorkOrderItems(List<WorkOrderItem> workOrderItems) {
        this.workOrderItems = workOrderItems;
    }

    @Override
    public String toString() {
        return "InvoiceItem{" + "description=" + description + ", uom=" + uom + ", quantity=" + quantity + ", pricePerUnit=" + pricePerUnit + ", netPrice=" + netPrice + ", vatRate=" + vatRate + ", vatAmount=" + vatAmount + ", grossPrice=" + grossPrice + ", workOrderItems=" + workOrderItems + '}';
    }
}

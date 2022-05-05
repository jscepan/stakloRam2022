package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.List;

public class InvoiceItem extends BaseModel {

    private String description;
    private double netPrice;
    private double vatRate;
    private double vatAmount;
    private double grossPrice;
    private List<Service> tasks = new ArrayList<>();

    public InvoiceItem(String oid) {
        super(oid);
    }

    public InvoiceItem(Long id) {
        super(id);
    }

    public InvoiceItem(String description, double netPrice, double vatRate, double vatAmount, double grossPrice, String oid) {
        super(oid);
        this.description = description;
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

    public List<Service> getTasks() {
        return tasks;
    }

    public void setTasks(List<Service> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "InvoiceItem{" + "description=" + description + ", netPrice=" + netPrice + ", vatRate=" + vatRate + ", vatAmount=" + vatAmount + ", grossPrice=" + grossPrice + '}';
    }
}

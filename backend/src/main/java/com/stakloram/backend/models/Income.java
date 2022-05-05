package com.stakloram.backend.models;

import java.time.LocalDate;

public class Income extends BaseModel {

    private LocalDate date;
    private String bankStatementNumber;
    private double amount;
    private String comment;
    private Buyer buyer;

    public Income(String oid) {
        super(oid);
    }

    public Income(Long id) {
        super(id);
    }

    public Income(LocalDate date, String bankStatementNumber, double amount, String comment, Buyer buyer, String oid) {
        super(oid);
        this.date = date;
        this.bankStatementNumber = bankStatementNumber;
        this.amount = amount;
        this.comment = comment;
        this.buyer = buyer;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBankStatementNumber() {
        return bankStatementNumber;
    }

    public void setBankStatementNumber(String bankStatementNumber) {
        this.bankStatementNumber = bankStatementNumber;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    @Override
    public String toString() {
        return "Income{" + "date=" + date + ", bankStatementNumber=" + bankStatementNumber + ", amount=" + amount + ", comment=" + comment + ", buyer=" + buyer + '}';
    }
}

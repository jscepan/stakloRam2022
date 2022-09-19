package com.stakloram.application.models;

import java.time.LocalDate;

public class Outcome extends BaseModel {

    private LocalDate date;
    private double amount;
    private String comment;
    private Buyer buyer;

    public Outcome() {
    }

    public Outcome(String oid) {
        super(oid);
    }

    public Outcome(Long id) {
        super(id);
    }

    public Outcome(LocalDate date, double amount, String comment, Buyer buyer, String oid) {
        super(oid);
        this.date = date;
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
        return "Outcome{" + "date=" + date + ", amount=" + amount + ", comment=" + comment + ", buyer=" + buyer + '}';
    }
}

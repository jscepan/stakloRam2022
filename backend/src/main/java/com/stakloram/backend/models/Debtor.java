package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.List;

public class Debtor {

    private Buyer buyer;
    private double positiveSum;
    private double negativeSum;
    private double debtSum;
    private List<Invoice> invoices = new ArrayList<>();
    private List<Income> incomes = new ArrayList<>();
    private List<Outcome> outcomes = new ArrayList<>();

    public Debtor() {
    }

    public Debtor(Buyer buyer) {
        this.buyer = buyer;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public double getPositiveSum() {
        return positiveSum;
    }

    public void setPositiveSum(double positiveSum) {
        this.positiveSum = positiveSum;
    }

    public double getNegativeSum() {
        return negativeSum;
    }

    public void setNegativeSum(double negativeSum) {
        this.negativeSum = negativeSum;
    }

    public double getDebtSum() {
        return debtSum;
    }

    public void setDebtSum(double debtSum) {
        this.debtSum = debtSum;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }

    public List<Income> getIncomes() {
        return incomes;
    }

    public void setIncomes(List<Income> incomes) {
        this.incomes = incomes;
    }

    public List<Outcome> getOutcomes() {
        return outcomes;
    }

    public void setOutcomes(List<Outcome> outcomes) {
        this.outcomes = outcomes;
    }
}

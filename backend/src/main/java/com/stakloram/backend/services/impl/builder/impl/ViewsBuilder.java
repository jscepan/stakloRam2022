package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.IncomeStore;
import com.stakloram.backend.database.objects.InvoiceStore;
import com.stakloram.backend.database.objects.OutcomeStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Debtor;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.Outcome;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ViewsBuilder {

    private final BuyerStore BUYER_STORE;
    private final InvoiceStore INVOICE_STORE;
    private final IncomeStore INCOME_STORE;
    private final OutcomeStore OUTCOME_STORE;

    public ViewsBuilder(Locator locator) {
        BUYER_STORE = new BuyerStore(locator);
        INVOICE_STORE = new InvoiceStore(locator);
        INCOME_STORE = new IncomeStore(locator);
        OUTCOME_STORE = new OutcomeStore(locator);
    }

    public List<Debtor> getAllDebtors() throws SException {
        List<Debtor> debtors = new ArrayList<>();
        try {
            ResultSet rs = BUYER_STORE.getAllObjectsFromDatabase(null);
            while (rs.next()) {
                debtors.add(new Debtor(BUYER_STORE.getObjectFromResultSet(rs)));
            }
            for (Debtor d : debtors) {
                List<Invoice> invoices = new ArrayList<>();
                ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + d.getBuyer().getId());
                while (inv_rs.next()) {
                    Invoice invoice = INVOICE_STORE.getObjectFromResultSet(inv_rs);
                    invoices.add(invoice);
                    d.setPositiveSum(d.getPositiveSum() + invoice.getGrossAmount());
                }
                d.setInvoices(invoices);

                List<Income> incomes = new ArrayList<>();
                ResultSet inc_rs = INCOME_STORE.getAllObjectsFromDatabase(" income_buyer_buyer_id=" + d.getBuyer().getId());
                while (inc_rs.next()) {
                    Income income = INCOME_STORE.getObjectFromResultSet(inc_rs);
                    incomes.add(income);
                    d.setNegativeSum(d.getNegativeSum() + income.getAmount());
                }
                d.setIncomes(incomes);

                List<Outcome> outcomes = new ArrayList<>();
                ResultSet out_rs = OUTCOME_STORE.getAllObjectsFromDatabase(" outcome_buyer_buyer_id=" + d.getBuyer().getId());
                while (out_rs.next()) {
                    Outcome outcome = OUTCOME_STORE.getObjectFromResultSet(out_rs);
                    outcomes.add(outcome);
                    d.setPositiveSum(d.getPositiveSum() + outcome.getAmount());
                }
                d.setOutcomes(outcomes);

                d.setDebtSum(d.getPositiveSum() - d.getNegativeSum());
            }
            debtors.sort((Comparator.comparing(Debtor::getDebtSum).reversed()));
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
//        debtors.sort(debt);
        return debtors;
    }

    public Debtor getDebtor(String buyerOID) throws SException {
        Debtor debtor = null;
        try {
            ResultSet rs = BUYER_STORE.getAllObjectsFromDatabase(null, "buyer_id=" + BaseModel.getIdFromOid(buyerOID));
            while (rs.next()) {
                debtor = new Debtor(BUYER_STORE.getObjectFromResultSet(rs));
            }
            List<Invoice> invoices = new ArrayList<>();
            ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + debtor.getBuyer().getId());
            while (inv_rs.next()) {
                Invoice invoice = INVOICE_STORE.getObjectFromResultSet(inv_rs);
                invoices.add(invoice);
                debtor.setPositiveSum(debtor.getPositiveSum() + invoice.getGrossAmount());
            }
            debtor.setInvoices(invoices);

            List<Income> incomes = new ArrayList<>();
            ResultSet inc_rs = INCOME_STORE.getAllObjectsFromDatabase(" income_buyer_buyer_id=" + debtor.getBuyer().getId());
            while (inc_rs.next()) {
                Income income = INCOME_STORE.getObjectFromResultSet(inc_rs);
                incomes.add(income);
                debtor.setNegativeSum(debtor.getNegativeSum() + income.getAmount());
            }
            debtor.setIncomes(incomes);

            List<Outcome> outcomes = new ArrayList<>();
            ResultSet out_rs = OUTCOME_STORE.getAllObjectsFromDatabase(" outcome_buyer_buyer_id=" + debtor.getBuyer().getId());
            while (out_rs.next()) {
                Outcome outcome = OUTCOME_STORE.getObjectFromResultSet(out_rs);
                outcomes.add(outcome);
                debtor.setPositiveSum(debtor.getPositiveSum() + outcome.getAmount());
            }
            debtor.setOutcomes(outcomes);

            debtor.setDebtSum(debtor.getPositiveSum() - debtor.getNegativeSum());
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
//        debtors.sort(debt);
        return debtor;
    }
}

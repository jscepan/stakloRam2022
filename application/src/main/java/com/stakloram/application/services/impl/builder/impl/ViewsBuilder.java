package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.objects.BuyerStore;
import com.stakloram.application.database.objects.IncomeStore;
import com.stakloram.application.database.objects.InvoiceStore;
import com.stakloram.application.database.objects.OutcomeStore;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Debtor;
import com.stakloram.application.models.Income;
import com.stakloram.application.models.Invoice;
import com.stakloram.application.models.Invoice.InvoiceType;
import com.stakloram.application.models.Locator;
import com.stakloram.application.models.Outcome;
import com.stakloram.application.models.UserMessage;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ViewsBuilder {

    Logger logger = LoggerFactory.getLogger(ViewsBuilder.class);

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
                ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + d.getBuyer().getId()
                        + " AND (invoice_type='" + InvoiceType.DOMESTIC + "'"
                        + " OR invoice_type='" + InvoiceType.CASH + "'"
                        + " OR invoice_type='" + InvoiceType.FOREIGN + "'"
                        + ")"
                );
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
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
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
            ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + debtor.getBuyer().getId()
                    + " AND (invoice_type='" + InvoiceType.DOMESTIC + "'"
                    + " OR invoice_type='" + InvoiceType.CASH + "'"
                    + " OR invoice_type='" + InvoiceType.FOREIGN + "'"
                    + ")"
            );
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
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return debtor;
    }
}
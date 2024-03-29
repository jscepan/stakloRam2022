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
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.models.Outcome;
import com.stakloram.backend.models.UserMessage;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ViewsBuilder {

    Logger logger = LoggerFactory.getLogger(ViewsBuilder.class);

    private final BuyerStore BUYER_STORE = new BuyerStore();
    private final InvoiceStore INVOICE_STORE = new InvoiceStore();
    private final IncomeStore INCOME_STORE = new IncomeStore();
    private final OutcomeStore OUTCOME_STORE = new OutcomeStore();

    public ViewsBuilder() {
    }

    public List<Debtor> getAllDebtors(Connection conn) throws SException {
        List<Debtor> debtors = new ArrayList<>();
        try {
            ResultSet rs = BUYER_STORE.getAllObjectsFromDatabase(null, conn);
            while (rs.next()) {
                debtors.add(new Debtor(BUYER_STORE.getObjectFromResultSet(rs)));
            }
            for (Debtor d : debtors) {
                List<Invoice> invoices = new ArrayList<>();
                ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + d.getBuyer().getId()
                        + " AND (invoice_type='" + InvoiceType.DOMESTIC + "'"
                        + " OR invoice_type='" + InvoiceType.CASH + "'"
                        + " OR invoice_type='" + InvoiceType.FOREIGN + "'"
                        + ")", conn
                );
                while (inv_rs.next()) {
                    Invoice invoice = INVOICE_STORE.getObjectFromResultSet(inv_rs);
                    invoices.add(invoice);
                    d.setPositiveSum(d.getPositiveSum() + invoice.getGrossAmount());
                }
                d.setInvoices(invoices);

                List<Income> incomes = new ArrayList<>();
                ResultSet inc_rs = INCOME_STORE.getAllObjectsFromDatabase(" income_buyer_buyer_id=" + d.getBuyer().getId(), conn);
                while (inc_rs.next()) {
                    Income income = INCOME_STORE.getObjectFromResultSet(inc_rs);
                    incomes.add(income);
                    d.setNegativeSum(d.getNegativeSum() + income.getAmount());
                }
                d.setIncomes(incomes);

                List<Outcome> outcomes = new ArrayList<>();
                ResultSet out_rs = OUTCOME_STORE.getAllObjectsFromDatabase(" outcome_buyer_buyer_id=" + d.getBuyer().getId(), conn);
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

    public Debtor getDebtor(String buyerOID, Connection conn) throws SException {
        Debtor debtor = null;
        try {
            ResultSet rs = BUYER_STORE.getAllObjectsFromDatabase(null, "buyer_id=" + BaseModel.getIdFromOid(buyerOID), conn);
            while (rs.next()) {
                debtor = new Debtor(BUYER_STORE.getObjectFromResultSet(rs));
            }
            List<Invoice> invoices = new ArrayList<>();
            ResultSet inv_rs = INVOICE_STORE.getAllObjectsFromDatabase(" invoice_buyer_buyer_id=" + debtor.getBuyer().getId()
                    + " AND (invoice_type='" + InvoiceType.DOMESTIC + "'"
                    + " OR invoice_type='" + InvoiceType.CASH + "'"
                    + " OR invoice_type='" + InvoiceType.FOREIGN + "'"
                    + ")", conn
            );
            while (inv_rs.next()) {
                Invoice invoice = INVOICE_STORE.getObjectFromResultSet(inv_rs);
                invoices.add(invoice);
                debtor.setPositiveSum(debtor.getPositiveSum() + invoice.getGrossAmount());
            }
            debtor.setInvoices(invoices);

            List<Income> incomes = new ArrayList<>();
            ResultSet inc_rs = INCOME_STORE.getAllObjectsFromDatabase(" income_buyer_buyer_id=" + debtor.getBuyer().getId(), conn);
            while (inc_rs.next()) {
                Income income = INCOME_STORE.getObjectFromResultSet(inc_rs);
                incomes.add(income);
                debtor.setNegativeSum(debtor.getNegativeSum() + income.getAmount());
            }
            debtor.setIncomes(incomes);

            List<Outcome> outcomes = new ArrayList<>();
            ResultSet out_rs = OUTCOME_STORE.getAllObjectsFromDatabase(" outcome_buyer_buyer_id=" + debtor.getBuyer().getId(), conn);
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

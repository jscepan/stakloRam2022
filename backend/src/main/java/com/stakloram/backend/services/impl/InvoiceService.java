package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.IncomeBuilder;
import com.stakloram.backend.services.impl.builder.impl.InvoiceBuilder;
import com.stakloram.backend.util.DataChecker;
import java.time.LocalDateTime;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService extends ServiceModel {

    private final IncomeBuilder incomeBuilder = new IncomeBuilder(this.locator);

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new InvoiceBuilder(this.locator);
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        return ((InvoiceBuilder) this.baseBuilder).getNextInvoiceNumber(invoiceType, year);
    }

    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        return ((InvoiceBuilder) this.baseBuilder).getAllInvoiceItemDescriptions();
    }

    @Override
    public BaseModel createNewObject(BaseModel object) throws SException {
        if (((Invoice) object).getType() == InvoiceType.CASH) {
            this.checkRequestDataForCreate(object);
            this.startTransaction();
            Invoice invoice = (Invoice) this.baseBuilder.createNewObject(object);
            if (invoice != null) {
                Income income = this.incomeBuilder.createNewObject(new Income(invoice.getDateOfCreate(), invoice.getGrossAmount(), "Gotovinski račun " + invoice.getNumber(), "", invoice.getBuyer(), ""));
                if (income != null) {
                    try {
                        ObjectMapper objectMapper = JsonMapper.builder()
                                .addModule(new JavaTimeModule())
                                .build();
                        super.history.createNewObject(new History(History.Action.CREATE, object.getClass().getSimpleName().toLowerCase(), null, objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), null));
                    } catch (JsonProcessingException ex) {
                        super.logger.error(ex.toString());
                    }
                    this.endTransaction();
                    return invoice;
                }
            }
            this.rollback();
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } else {
            return super.createNewObject(object);
        }

    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Invoice invoice = (Invoice) baseModel;
        if (DataChecker.isNull(invoice.getType()) || invoice.getType().name().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage(""));
        }
        if (DataChecker.isNull(invoice.getCurrency()) || invoice.getCurrency().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("currency"));
        }
        if (DataChecker.isNull(invoice.getNumber()) || invoice.getNumber().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("number"));
        }
        if (!super.isObjectWithOid(invoice.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        if (DataChecker.isNull(invoice.getDateOfCreate())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("dateOfCreate"));
        }
        if (DataChecker.isNull(invoice.getDateOfTurnover())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("dateOfTurnover"));
        }
        if (DataChecker.isNull(invoice.getDateOfMaturity())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("dateOfMaturity"));
        }
        if (DataChecker.isNull(invoice.getCountry()) || invoice.getCountry().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("country"));
        }
        if (DataChecker.isNull(invoice.getPlaceOfIssue()) || invoice.getPlaceOfIssue().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("placeOfIssue"));
        }
        if (DataChecker.isNull(invoice.getMethodOfPayment()) || invoice.getMethodOfPayment().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("methodOfPayment"));
        }

        if (invoice.getType() == InvoiceType.CASH) {
            if (DataChecker.isNull(invoice.getNumberOfCashBill()) || invoice.getNumberOfCashBill().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("numberOfCashBill"));
            }
        }

        // If invoice is made from advance invoice check amounts...
        if (invoice.getAdvanceInvoiceOid() != null && invoice.getAdvancePayAmount() > 0 && (invoice.getGrossAmount() < invoice.getAdvancePayAmount())) {
            throw new SException(UserMessage.getLocalizedMessage("wrongAmountOfAdvancePayAmount") + " - " + UserMessage.getLocalizedMessage("amount"));
        }
    }
}

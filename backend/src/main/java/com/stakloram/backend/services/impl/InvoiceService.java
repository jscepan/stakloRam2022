package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stakloram.backend.database.ConnectionToDatabase;
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
import com.stakloram.backend.services.impl.builder.impl.WorkOrderBuilder;
import com.stakloram.backend.util.DataChecker;
import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService extends ServiceModel {

    private final IncomeBuilder incomeBuilder = new IncomeBuilder();
    private final WorkOrderBuilder workOrderBuilder = new WorkOrderBuilder();

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new InvoiceBuilder();
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((InvoiceBuilder) this.baseBuilder).getNextInvoiceNumber(invoiceType, year, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }

    }

    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((InvoiceBuilder) this.baseBuilder).getAllInvoiceItemDescriptions(conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public boolean changeBuyer(String invoiceOID, String buyerOID) throws SException {
        if (DataChecker.isNull(buyerOID) || buyerOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        if (DataChecker.isNull(invoiceOID) || invoiceOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("invoice"));
        }
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.startTransaction(conn);
            boolean isChanged = true;
            BaseModel previousObjectInvoice = this.baseBuilder.getObjectByOid(invoiceOID, conn);
            if (!((InvoiceBuilder) this.baseBuilder).changeBuyer(invoiceOID, buyerOID, conn)) {
                isChanged = false;
            }
            BaseModel objectInvoice = this.baseBuilder.getObjectByOid(invoiceOID, conn);
            // write change to history
            try {
                ObjectMapper objectMapper = JsonMapper.builder()
                        .addModule(new JavaTimeModule())
                        .build();
                this.history.createNewObject(new History(History.Action.UPDATE, objectInvoice.getClass().getSimpleName().toLowerCase(), objectMapper.writeValueAsString(previousObjectInvoice), objectMapper.writeValueAsString(objectInvoice), LocalDateTime.now(), new User(this.getCurrentUserOID()), objectInvoice.getOid()), conn);
            } catch (JsonProcessingException ex) {
                logger.error(ex.toString());
            }

            // do changes to work order
            Set<String> workOrderOIDSForChange = ((InvoiceBuilder) this.baseBuilder).getAllWorkOrdersForInvoice((Invoice) objectInvoice, conn);
            for (String oid : workOrderOIDSForChange) {
                BaseModel previousObjectWorkOrder = this.workOrderBuilder.getObjectByOid(oid, conn);
                if (!this.workOrderBuilder.changeBuyer(oid, buyerOID, conn)) {
                    isChanged = false;
                }
                BaseModel objectWorkOrder = this.workOrderBuilder.getObjectByOid(oid, conn);
                // write changes of work order to history
                try {
                    ObjectMapper objectMapper = JsonMapper.builder()
                            .addModule(new JavaTimeModule())
                            .build();
                    this.history.createNewObject(new History(History.Action.UPDATE, objectWorkOrder.getClass().getSimpleName().toLowerCase(), previousObjectWorkOrder != null ? objectMapper.writeValueAsString(previousObjectWorkOrder) : "", objectMapper.writeValueAsString(objectWorkOrder), LocalDateTime.now(), new User(this.getCurrentUserOID()), objectWorkOrder.getOid()), conn);
                } catch (JsonProcessingException ex) {
                    logger.error(ex.toString());
                }
            }
            if (isChanged) {
                this.endTransaction(conn);
            } else {
                this.rollback(conn);
            }
            return isChanged;
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public BaseModel createNewObject(BaseModel object) throws SException {
        if (((Invoice) object).getType() == InvoiceType.CASH) {
            try ( Connection conn = ConnectionToDatabase.connect()) {
                this.checkRequestDataForCreate(object);
                this.startTransaction(conn);
                Invoice invoice = (Invoice) this.baseBuilder.createNewObject(object, conn);
                if (invoice != null) {
                    Income income = this.incomeBuilder.createNewObject(new Income(invoice.getDateOfCreate(), invoice.getGrossAmount(), "Gotovinski račun " + invoice.getNumber(), "", invoice.getBuyer(), ""), conn);
                    if (income != null) {
                        try {
                            ObjectMapper objectMapper = JsonMapper.builder()
                                    .addModule(new JavaTimeModule())
                                    .build();
                            super.history.createNewObject(new History(History.Action.CREATE, object.getClass().getSimpleName().toLowerCase(), null, objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.getCurrentUserOID()), null), conn);
                        } catch (JsonProcessingException ex) {
                            super.logger.error(ex.toString());
                        }
                        this.endTransaction(conn);
                        return invoice;
                    }
                }
                this.rollback(conn);
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            } catch (SQLException ex) {
                logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
            }
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

    public String getXMLForInvoice(String invoiceOID) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((InvoiceBuilder) this.baseBuilder).getXMLForInvoice(invoiceOID, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public boolean registrationOfInvoice(String invoiceOID) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return ((InvoiceBuilder) this.baseBuilder).registrationOfInvoiceUPLOAD(invoiceOID, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public File downloadFile(String invoiceOID) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            Invoice invoice = ((InvoiceBuilder) this.baseBuilder).getObjectByOid(invoiceOID, conn);
            return ((InvoiceBuilder) this.baseBuilder).getPDFForRegistratedInvoice(invoice, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }
}

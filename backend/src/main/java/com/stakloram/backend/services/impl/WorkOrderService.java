package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Image;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.InvoiceBuilder;
import com.stakloram.backend.services.impl.builder.impl.WorkOrderBuilder;
import com.stakloram.backend.util.DataChecker;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class WorkOrderService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new WorkOrderBuilder(this.locator);
    }

    public Set<String> getAllWorkOrderItemDescriptions() throws SException {
        return ((WorkOrderBuilder) this.baseBuilder).getAllWorkOrderItemDescriptions();
    }

    public List<WorkOrder> getAllUnsettledWorkOrder(String buyerOID) throws SException {
        return ((WorkOrderBuilder) this.baseBuilder).getAllUnsettledWorkOrder(buyerOID);
    }

    public boolean toggleSettledForWorkOrder(String workOrderOID, boolean settled) throws SException {
        this.startTransaction();
        boolean isSettled = ((WorkOrderBuilder) this.baseBuilder).toggleSettledForWorkOrder(workOrderOID, settled);
        if (isSettled) {
            this.endTransaction();
        } else {
            this.rollback();
        }
        return isSettled;
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        WorkOrder wo = (WorkOrder) baseModel;
        if (!super.isObjectWithOid(wo.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        for (WorkOrderItem woi : wo.getWorkOrderItems()) {
            if (DataChecker.isNull(woi.getDescription()) || woi.getDescription().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("description"));
            }
            super.checkIsAmountPositive(woi.getSumQuantity(), UserMessage.getLocalizedMessage("amount"));
        }
        for (Image image : wo.getImages()) {
            if (DataChecker.isNull(image) || image.getUrl().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("imageIsntSelected"));
            }
        }
    }

    public long getNextWorkOrderNumber(int year) throws SException {
        return ((WorkOrderBuilder) this.baseBuilder).getNextWorkOrderNumber(year);
    }

    public boolean changeBuyer(String workOrderOID, String buyerOID) throws SException {
        if (DataChecker.isNull(buyerOID) || buyerOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
        if (DataChecker.isNull(workOrderOID) || workOrderOID.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("workOrder"));
        }
        this.startTransaction();
        boolean isChanged = true;
        // TODO
        BaseModel previousObjectWorkOrder = this.baseBuilder.getObjectByOid(workOrderOID);
        if (!((WorkOrderBuilder) this.baseBuilder).changeBuyer(workOrderOID, buyerOID)) {
            isChanged = false;
        }
        BaseModel objectWorkOrder = this.baseBuilder.getObjectByOid(workOrderOID);
        // write change to history
        try {
            ObjectMapper objectMapper = JsonMapper.builder()
                    .addModule(new JavaTimeModule())
                    .build();
            this.history.createNewObject(new History(History.Action.UPDATE, objectWorkOrder.getClass().getSimpleName().toLowerCase(), objectMapper.writeValueAsString(previousObjectWorkOrder), objectMapper.writeValueAsString(objectWorkOrder), LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), objectWorkOrder.getOid()));
        } catch (JsonProcessingException ex) {
            logger.error(ex.toString());
        }

        if (isChanged) {
            this.endTransaction();
        } else {
            this.rollback();
        }
        return isChanged;
    }
}

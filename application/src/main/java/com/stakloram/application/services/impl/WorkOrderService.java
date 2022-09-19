package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Image;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.models.WorkOrder;
import com.stakloram.application.models.WorkOrderItem;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.WorkOrderBuilder;
import com.stakloram.application.util.DataChecker;
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
}

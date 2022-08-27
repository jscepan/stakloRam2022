package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.WorkOrderBuilder;
import com.stakloram.backend.util.DataChecker;
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
        if (super.isObjectWithOid(wo.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData"));
        }
        for (WorkOrderItem woi : wo.getWorkOrderItems()) {
            if (DataChecker.isNull(woi.getDescription()) || woi.getDescription().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData"));
            }
            super.checkIsAmountPositive(woi.getSumQuantity());
        }
    }

    public long getNextWorkOrderNumber(int year) throws SException {
        return ((WorkOrderBuilder) this.baseBuilder).getNextWorkOrderNumber(year);
    }
}

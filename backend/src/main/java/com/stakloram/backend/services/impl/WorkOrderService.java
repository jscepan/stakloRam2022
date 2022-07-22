package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.WorkOrderBuilder;
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

    @Override
    public void checkRequestDataForCreate(BaseModel object) throws SException {
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel object) throws SException {
    }

    public long getNextWorkOrderNumber(int year) throws SException {
        return ((WorkOrderBuilder) this.baseBuilder).getNextWorkOrderNumber(year);
    }
}

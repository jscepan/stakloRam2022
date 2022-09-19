package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Income;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.IncomeBuilder;
import org.springframework.stereotype.Service;

@Service
public class IncomeService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new IncomeBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Income object = (Income) baseModel;
        super.checkIsAmountPositive(object.getAmount(),UserMessage.getLocalizedMessage("fulfillAllRequiredData"));
        if (!super.isObjectWithOid(object.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData")+" - "+UserMessage.getLocalizedMessage("buyer"));
        }
    }
}

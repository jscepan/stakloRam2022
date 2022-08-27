package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.IncomeBuilder;
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
        super.checkIsAmountPositive(object.getAmount());
        if (!super.isObjectWithOid(object.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData"));
        }
    }
}

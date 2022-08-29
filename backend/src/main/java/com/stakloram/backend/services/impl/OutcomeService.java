package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Outcome;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.OutcomeBuilder;
import org.springframework.stereotype.Service;

@Service
public class OutcomeService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new OutcomeBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Outcome object = (Outcome) baseModel;
        super.checkIsAmountPositive(object.getAmount(), UserMessage.getLocalizedMessage("amount"));
        if (!super.isObjectWithOid(object.getBuyer())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyer"));
        }
    }
}

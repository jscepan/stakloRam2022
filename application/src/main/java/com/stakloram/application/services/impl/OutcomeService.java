package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Outcome;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.OutcomeBuilder;
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

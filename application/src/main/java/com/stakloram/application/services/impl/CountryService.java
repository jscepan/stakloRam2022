package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Country;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.CountryBuilder;
import com.stakloram.application.util.DataChecker;
import org.springframework.stereotype.Service;

@Service
public class CountryService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new CountryBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Country object = (Country) baseModel;
        if (DataChecker.isNull(object.getDescription()) || object.getDescription().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData")+" - "+UserMessage.getLocalizedMessage("description"));
        }
    }
}

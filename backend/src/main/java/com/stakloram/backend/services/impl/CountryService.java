package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Country;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.CountryBuilder;
import com.stakloram.backend.util.DataChecker;
import org.springframework.stereotype.Service;

@Service
public class CountryService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new CountryBuilder();
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Country object = (Country) baseModel;
        if (DataChecker.isNull(object.getDescription()) || object.getDescription().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("description"));
        }
        if (DataChecker.isNull(object.getIdentificationCode()) || object.getIdentificationCode().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("identificationCode"));
        }
    }
}

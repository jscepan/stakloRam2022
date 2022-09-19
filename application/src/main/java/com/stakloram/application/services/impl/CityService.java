package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.City;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.CityBuilder;
import com.stakloram.application.util.DataChecker;
import org.springframework.stereotype.Service;

@Service
public class CityService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new CityBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        City object = (City) baseModel;
        if (!super.isObjectWithOid(object.getCountry())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("country"));
        }
        if (DataChecker.isNull(object.getName()) || object.getName().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("cityName"));
        }
        if (DataChecker.isNull(object.getZipCode()) || object.getZipCode().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("zipCode"));
        }
    }
}

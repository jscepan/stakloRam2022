package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.CityBuilder;
import com.stakloram.backend.util.DataChecker;
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
        if (!super.isObjectWithOid(object.getCountry()) || DataChecker.isNull(object.getName()) || object.getName().trim().isEmpty() || DataChecker.isNull(object.getZipCode()) || object.getZipCode().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData"));
        }
    }
}

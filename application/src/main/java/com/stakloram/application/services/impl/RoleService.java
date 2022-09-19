package com.stakloram.application.services.impl;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.RoleBuilder;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new RoleBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
    }
}

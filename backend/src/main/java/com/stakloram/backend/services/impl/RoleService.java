package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.RoleBuilder;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new RoleBuilder();
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
    }
}

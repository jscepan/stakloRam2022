package com.stakloram.backend.services.impl;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.BuyerBuilder;
import com.stakloram.backend.util.DataChecker;
import org.springframework.stereotype.Service;

@Service
public class BuyerService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new BuyerBuilder(this.locator);
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        Buyer buyer = (Buyer) baseModel;
        if (DataChecker.isNull(buyer.getName()) || buyer.getName().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyerName"));
        }
        if (DataChecker.isNull(buyer.getAddress()) || buyer.getAddress().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyerAddress"));
        }
        if (!super.isObjectWithOid(buyer.getCity())) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyerCity"));
        }
        if (buyer.getType() == Buyer.BuyerType.COMPANY) {
            if (DataChecker.isNull(buyer.getMaticalNumber()) || buyer.getMaticalNumber().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyerMaticalNumber"));
            }
            if (DataChecker.isNull(buyer.getPib()) || buyer.getPib().trim().isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + UserMessage.getLocalizedMessage("buyerPIB"));
            }
        }
    }
}

package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.SQLException;
import java.util.Arrays;

public class BuyerBuilder extends BaseBuilder {

    private final CityStore CITY_STORE = new CityStore();

    @Override
    public void setObjectStore() {
        this.objectStore = new BuyerStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
    }

    @Override
    public Buyer getObjectByOid(String oid) throws SException {
        try {
            Buyer buyer = (Buyer) super.getObjectByOid(oid);
            buyer.setCity((City) CITY_STORE.getObjectByOid(buyer.getCity().getOid()));
            return buyer;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public Buyer getObjectByOidWithCityAndCountry(String oid) throws SException {
        // TODO
        return this.getObjectByOid(oid);
    }
}

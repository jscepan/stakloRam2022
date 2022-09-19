package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.objects.BuyerStore;
import com.stakloram.application.database.objects.CityStore;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Buyer;
import com.stakloram.application.models.City;
import com.stakloram.application.models.Locator;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.impl.builder.BaseBuilder;
import java.sql.SQLException;
import java.util.Arrays;

public class BuyerBuilder extends BaseBuilder {

    private final CityStore CITY_STORE = new CityStore(this.getLocator());

    public BuyerBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new BuyerStore(this.getLocator());
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

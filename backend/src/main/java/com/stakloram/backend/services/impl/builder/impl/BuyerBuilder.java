package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
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
    public BaseModel getObjectByOid(String oid) throws SException {
        try {
            Buyer buyer = (Buyer) super.getObjectByOid(oid);
            buyer.setCity((City) CITY_STORE.getObjectByOid(buyer.getCity().getOid()));
            return buyer;
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx");
        }
    }
}

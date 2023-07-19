package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.CountryStore;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Country;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CityBuilder extends BaseBuilder {

    private final CountryStore COUNTRY_STORE = new CountryStore();

    @Override
    public void setObjectStore() {
        this.objectStore = new CityStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("city_name", "city_zip_code");
    }

    @Override
    public BaseModel createNewObject(BaseModel object, Connection conn) throws SException {
        City city;
        try {
            city = (City) super.createNewObject(object, conn);
            city.setCountry((Country) COUNTRY_STORE.getObjectByOid(city.getCountry().getOid()));
            return city;
        } catch (SException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object, Connection conn) throws SException {
        try {
            City city = (City) super.modifyObject(oid, object, conn);
            city.setCountry((Country) COUNTRY_STORE.getObjectByOid(city.getCountry().getOid()));
            return city;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public BaseModel getObjectByOid(String oid) throws SException {
        try {
            City city = (City) super.getObjectByOid(oid);
            city.setCountry((Country) COUNTRY_STORE.getObjectByOid(city.getCountry().getOid()));
            return city;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(COUNTRY_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                City city = (City) this.getObjectStore().getObjectFromResultSet(rs);
                city.setCountry(COUNTRY_STORE.getObjectFromResultSet(rs));
                objects.add(city);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}

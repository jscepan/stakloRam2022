package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.ServiceStore;
import com.stakloram.backend.database.objects.UserStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.Service;
import com.stakloram.backend.models.User;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ServiceBuilder extends BaseBuilder {

    private final UserStore USER_STORE = new UserStore(this.getLocator());
    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());

    public ServiceBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        super.objectStore = new ServiceStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("service_number", "service_title");
        this.databaseColumnsForAttributes.put("status", "status");
        this.databaseColumnsForAdvanceFilter.put("user", "service_user_user_id");
        this.databaseColumnsForAdvanceFilter.put("buyer", "service_buyer_buyer_id");
        this.databaseColumnsForAdvanceFilter.put("invoiceItemOid", "service_invoice_item_invoice_item_id");
    }

    @Override
    public BaseModel getObjectByOid(String oid) throws SException {
        try {
            Service service = (Service) super.getObjectByOid(oid);
            service.setBuyer((Buyer) BUYER_STORE.getObjectByOid(service.getBuyer().getOid()));
            service.setCurrentUser((User) USER_STORE.getObjectByOid(service.getCurrentUser().getOid()));
            service.setDescedants(this.getDescedants(service));
            return service;
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getJoinObjectStoresForSqlFrom(Arrays.asList(USER_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                Service service = (Service) this.getObjectStore().getObjectFromResultSet(rs);
                service.setCurrentUser(USER_STORE.getObjectFromResultSet(rs));
                objects.add(service);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    private List<Service> getDescedants(Service service) throws SException {
        List<Service> descedants = new ArrayList<>();
        try {
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase("service_parent_oid='" + service.getOid() + "'");
            while (rs.next()) {
                Service s = (Service) this.getObjectStore().getObjectFromResultSet(rs);
                s.setCurrentUser((User) USER_STORE.getObjectByOid(s.getCurrentUser().getOid()));
                descedants.add(s);
            }
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
        return descedants;
    }
}

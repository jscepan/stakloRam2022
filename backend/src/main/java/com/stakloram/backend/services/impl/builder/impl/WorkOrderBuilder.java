package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.WorkOrderStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.SQLException;

public class WorkOrderBuilder extends BaseBuilder {

    public WorkOrderBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new WorkOrderStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
//        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
//        this.databaseColumnsForAttributes.put("type", "type");
//        this.databaseColumnsForAdvanceFilter.put("buyer", "invoice_buyer_buyer_id");
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public long getNextWorkOrderNumber(int year) throws SException {
        try {
            return ((WorkOrderStore) this.getObjectStore()).getLastWorkOrderNumber(year) + 1;
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }
}

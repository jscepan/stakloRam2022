package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.ResponseWithCount;
import com.stakloram.application.database.objects.BuyerStore;
import com.stakloram.application.database.objects.IncomeStore;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Income;
import com.stakloram.application.models.Locator;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.impl.builder.BaseBuilder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class IncomeBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());

    public IncomeBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new IncomeStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
    }

    @Override
    public Income getObjectByOid(String oid) throws SException {
        try {
            String fromSt = this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE));
            String whereSt = this.getObjectStore().getTableName() + "." + this.getObjectStore().getPrimaryKey() + "=" + BaseModel.getIdFromOid(oid);
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(fromSt, whereSt);
            Income income;
            if (rs.next()) {
                income = (Income) this.objectStore.getObjectFromResultSet(rs);
                income.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                return income;
            }
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public Income createNewObject(BaseModel object) throws SException {
        return (Income) super.createNewObject(object);
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                Income income = (Income) this.getObjectStore().getObjectFromResultSet(rs);
                income.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                objects.add(income);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}
package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.IncomeStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class IncomeBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore();

    @Override
    public void setObjectStore() {
        this.objectStore = new IncomeStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
        this.databaseColumnsForAttributes.put("from_date", "date");
        this.databaseColumnsForAttributes.put("to_date", "date");
    }

    @Override
    public Income getObjectByOid(String oid, Connection conn) throws SException {
        try {
            String fromSt = this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE));
            String whereSt = this.getObjectStore().getTableName() + "." + this.getObjectStore().getPrimaryKey() + "=" + BaseModel.getIdFromOid(oid);
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(fromSt, whereSt, conn);
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
    public Income createNewObject(BaseModel object, Connection conn) throws SException {
        return (Income) super.createNewObject(object, conn);
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top, conn);
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

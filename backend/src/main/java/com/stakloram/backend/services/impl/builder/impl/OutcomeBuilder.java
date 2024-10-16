package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.OutcomeStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Outcome;
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

public class OutcomeBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore();

    @Override
    public void setObjectStore() {
        this.objectStore = new OutcomeStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
    }

    @Override
    public Outcome getObjectByOid(String oid, Connection conn) throws SException {
        try {
            String fromSt = this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE));
            String whereSt = this.getObjectStore().getTableName() + "." + this.getObjectStore().getPrimaryKey() + "=" + BaseModel.getIdFromOid(oid);
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(fromSt, whereSt, conn);
            Outcome outcome;
            if (rs.next()) {
                outcome = (Outcome) this.objectStore.getObjectFromResultSet(rs);
                outcome.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                return outcome;
            }
            throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public Outcome createNewObject(BaseModel object, Connection conn) throws SException {
        return (Outcome) super.createNewObject(object, conn);
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top, conn);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                Outcome outcome = (Outcome) this.getObjectStore().getObjectFromResultSet(rs);
                outcome.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                objects.add(outcome);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}

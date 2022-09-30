package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.HistoryStore;
import com.stakloram.backend.database.objects.UserStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class HistoryBuilder extends BaseBuilder {

    private final UserStore USER_STORE = new UserStore(this.getLocator());

    public HistoryBuilder(Locator locator) {
        super(locator);
        this.objectStore = new HistoryStore(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new HistoryStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("history_previous_value","history_new_value");
        this.databaseColumnsForAttributes.put("object_type", "object_type");
        this.databaseColumnsForAttributes.put("from_date", "time");
        this.databaseColumnsForAttributes.put("to_date", "time");
    }

    public void createNewObject(History object) throws SException {
        try {
            this.objectStore.createNewObjectToDatabase(object);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public BaseModel getObjectByOid(String oid) throws SException {
        History history;
        try {
            String fromSt = this.getSqlFromAppendObjectStores(Arrays.asList(USER_STORE));
            String whereSt = this.getObjectStore().getTableName() + "." + this.getObjectStore().getPrimaryKey() + "=" + BaseModel.getIdFromOid(oid);
            ResultSet resultSet = this.getObjectStore().getAllObjectsFromDatabase(fromSt, whereSt);
            if (resultSet.next()) {
                history = (History) this.getObjectStore().getObjectFromResultSet(resultSet);
                history.setUser(USER_STORE.getObjectFromResultSet(resultSet));
                return history;
            } else {
                throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(USER_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                History history = (History) this.getObjectStore().getObjectFromResultSet(rs);
                history.setUser(USER_STORE.getObjectFromResultSet(rs));
                objects.add(history);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjectByOid(String oid) throws SException {
        throw new SException(UserMessage.getLocalizedMessage("historyObjectCantBeDeleted"));
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object) throws SException {
        throw new SException(UserMessage.getLocalizedMessage("historyObjectCantBeModified"));
    }
}

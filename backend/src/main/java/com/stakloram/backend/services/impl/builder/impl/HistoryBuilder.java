package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.HistoryStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.SQLException;
import java.util.Arrays;

public class HistoryBuilder extends BaseBuilder {

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
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
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
    public boolean deleteObjectByOid(String oid) throws SException {
        throw new SException(UserMessage.getLocalizedMessage("historyObjectCantBeDeleted"));
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object) throws SException {
        throw new SException(UserMessage.getLocalizedMessage("historyObjectCantBeModified"));
    }
}

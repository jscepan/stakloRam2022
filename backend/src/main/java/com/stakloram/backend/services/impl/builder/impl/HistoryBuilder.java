package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.HistoryStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HistoryBuilder {

    public Logger logger = LoggerFactory.getLogger(BaseBuilder.class);

    private final Locator locator;
    protected HistoryStore objectStore;

    public HistoryBuilder(Locator locator) {
        this.locator = locator;
        this.objectStore = new HistoryStore(locator);
    }

    public HistoryStore getObjectStore() {
        return objectStore;
    }

    public Locator getLocator() {
        return locator;
    }

    public void createNewObject(History object) throws SException {
        try {
            this.objectStore.createNewObjectToDatabase(object);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}

package com.stakloram.application.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stakloram.application.database.ConnectionToDatabase;
import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Locator;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.History;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.models.User;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.impl.builder.BaseBuilder;
import com.stakloram.application.services.impl.builder.impl.HistoryBuilder;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import static java.util.Objects.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ServiceModel implements IService {

    public Logger logger = LoggerFactory.getLogger(ServiceModel.class);

    public static final int SKIP = 50;
    public static final int TOP = 50;

    protected final Locator locator = new Locator(new ConnectionToDatabase().connect());

    public final HistoryBuilder history = new HistoryBuilder(locator);

    protected BaseBuilder baseBuilder;

    public ServiceModel() {
        this.setBaseBuilder();
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel baseModel) throws SException {
        this.checkRequestDataForCreate(baseModel);
    }

    public Locator getLocator() {
        return locator;
    }

    public BaseBuilder getBaseBuilder() {
        return baseBuilder;
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        return this.baseBuilder.searchObjects(searchObject, skip, top);
    }

    @Override
    public BaseModel getObjectByOID(String oid) throws SException {
        return this.baseBuilder.getObjectByOid(oid);
    }

    @Override
    public BaseModel createNewObject(BaseModel object) throws SException {
        this.checkRequestDataForCreate(object);
        this.startTransaction();
        BaseModel baseModel = this.baseBuilder.createNewObject(object);
        if (baseModel != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                this.history.createNewObject(new History(History.Action.CREATE, object.getClass().getSimpleName().toLowerCase(), null, objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), null));
            } catch (JsonProcessingException ex) {
                logger.error(ex.toString());
            }
            this.endTransaction();
            return baseModel;
        }
        this.rollback();
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object) throws SException {
        this.checkRequestDataForModify(oid, object);
        try {
            this.startTransaction();
            BaseModel previousObject = this.baseBuilder.getObjectByOid(oid);
            BaseModel baseModel = this.baseBuilder.modifyObject(oid, object);
            if (baseModel != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                this.history.createNewObject(new History(History.Action.UPDATE, object.getClass().getSimpleName().toLowerCase(), previousObject != null ? objectMapper.writeValueAsString(previousObject) : "", objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), object.getOid()));
                this.endTransaction();
                return baseModel;
            }
            this.rollback();
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SException | JsonProcessingException ex) {
            logger.error(ex.toString());
        }
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }

    @Override
    public boolean deleteObjects(List<? extends BaseModel> objects) throws SException {
        if (isNull(objects) || objects.isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("noDataForDelete"));
        }
        this.startTransaction();
        for (BaseModel object : objects) {
            boolean deleted = this.baseBuilder.deleteObjectByOid(object.getOid());
            if (!deleted) {
                this.rollback();
                return false;
            }
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                this.history.createNewObject(new History(History.Action.DELETE, object.getClass().getSimpleName().toLowerCase(), objectMapper.writeValueAsString(object), null, LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), object.getOid()));
            } catch (JsonProcessingException ex) {
                logger.error(ex.toString());
            }
        }
        this.endTransaction();
        return true;
    }

    @Override
    public void startTransaction() {
        try {
            this.locator.getCONN().setAutoCommit(false);
        } catch (SQLException ex) {
            logger.error(ex.toString());
        }
    }

    @Override
    public void rollback() {
        try {
            this.locator.getCONN().rollback();
        } catch (SQLException ex) {
            logger.error(ex.toString());
        }
    }

    @Override
    public void endTransaction() {
        try {
            this.locator.getCONN().commit();
        } catch (SQLException ex) {
            logger.error(ex.toString());
        }
    }

    public void checkIsAmountPositive(double number, String errorMessageContinue) throws SException {
        if (number <= 0) {
            throw new SException(UserMessage.getLocalizedMessage("fulfillAllRequiredData") + " - " + errorMessageContinue);
        }
    }

    public boolean isObjectWithOid(BaseModel object) throws SException {
        return !((object.getOid() == null) || (object.getOid().length() == 0));
    }
}

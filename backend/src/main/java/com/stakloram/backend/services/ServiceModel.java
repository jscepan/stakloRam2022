package com.stakloram.backend.services;

import com.stakloram.backend.controllers.WorkOrderController;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.sql.SQLException;
import java.util.List;
import static java.util.Objects.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ServiceModel implements IService {

    Logger logger = LoggerFactory.getLogger(ServiceModel.class);

    public static final int SKIP = 50;
    public static final int TOP = 50;

    protected final Locator locator = new Locator(new ConnectionToDatabase().connect());
    protected BaseBuilder baseBuilder;

    public ServiceModel() {
        this.setBaseBuilder();
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
            BaseModel baseModel = this.baseBuilder.modifyObject(oid, object);
            if (baseModel != null) {
                this.endTransaction();
                return baseModel;
            }
            this.rollback();
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjects(List<String> oids) throws SException {
        if (isNull(oids) || oids.size() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("noDataForDelete"));
        }
        this.startTransaction();
        for (String oid : oids) {
            boolean deleted = this.baseBuilder.deleteObjectByOid(oid);
            if (!deleted) {
                this.rollback();
                return false;
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
}

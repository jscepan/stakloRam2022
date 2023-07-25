package com.stakloram.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.MyUserDetails;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.services.impl.builder.impl.HistoryBuilder;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import static java.util.Objects.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class ServiceModel implements IService {

    public Logger logger = LoggerFactory.getLogger(ServiceModel.class);

    public static final int SKIP = 50;
    public static final int TOP = 50;

    public final HistoryBuilder history = new HistoryBuilder();

    protected BaseBuilder baseBuilder;

    public ServiceModel() {
        this.setBaseBuilder();
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel baseModel) throws SException {
        this.checkRequestDataForCreate(baseModel);
    }

    public BaseBuilder getBaseBuilder() {
        return baseBuilder;
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return this.baseBuilder.searchObjects(searchObject, skip, top, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public BaseModel getObjectByOID(String oid) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            return this.baseBuilder.getObjectByOid(oid, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public BaseModel createNewObject(BaseModel object) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.checkRequestDataForCreate(object);
            this.startTransaction(conn);
            BaseModel baseModel = this.baseBuilder.createNewObject(object, conn);
            if (baseModel != null) {
                try {
                    ObjectMapper objectMapper = JsonMapper.builder()
                            .addModule(new JavaTimeModule())
                            .build();
                    this.history.createNewObject(new History(History.Action.CREATE, object.getClass().getSimpleName().toLowerCase(), null, objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.getCurrentUserOID()), null), conn);
                } catch (JsonProcessingException ex) {
                    logger.error(ex.toString());
                }
                this.endTransaction(conn);
                return baseModel;
            }
            this.rollback(conn);
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object) throws SException {
        this.checkRequestDataForModify(oid, object);
        try ( Connection conn = ConnectionToDatabase.connect()) {
            this.startTransaction(conn);
            BaseModel previousObject = this.baseBuilder.getObjectByOid(oid, conn);
            BaseModel baseModel = this.baseBuilder.modifyObject(oid, object, conn);
            if (baseModel != null) {
                try {
                    ObjectMapper objectMapper = JsonMapper.builder()
                            .addModule(new JavaTimeModule())
                            .build();
                    this.history.createNewObject(new History(History.Action.UPDATE, object.getClass().getSimpleName().toLowerCase(), previousObject != null ? objectMapper.writeValueAsString(previousObject) : "", objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.getCurrentUserOID()), object.getOid()), conn);
                } catch (JsonProcessingException ex) {
                    logger.error(ex.toString());
                }
                this.endTransaction(conn);
                return baseModel;
            }
            this.rollback(conn);
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        } catch (SException ex) {
            logger.error(ex.toString());
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }

    @Override
    public boolean deleteObjects(List<? extends BaseModel> objects) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            if (isNull(objects) || objects.isEmpty()) {
                throw new SException(UserMessage.getLocalizedMessage("noDataForDelete"));
            }
            this.startTransaction(conn);
            for (BaseModel object : objects) {
                boolean deleted = this.baseBuilder.deleteObjectByOid(object.getOid(), conn);
                if (!deleted) {
                    this.rollback(conn);
                    return false;
                }
                try {
                    ObjectMapper objectMapper = JsonMapper.builder()
                            .addModule(new JavaTimeModule())
                            .build();
                    this.history.createNewObject(new History(History.Action.DELETE, object.getClass().getSimpleName().toLowerCase(), objectMapper.writeValueAsString(object), null, LocalDateTime.now(), new User(this.getCurrentUserOID()), object.getOid()), conn);
                } catch (JsonProcessingException ex) {
                    logger.error(ex.toString());
                }
            }
            this.endTransaction(conn);
            return true;
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    @Override
    public void startTransaction(Connection conn) {
        try {
            conn.setAutoCommit(false);
        } catch (SQLException ex) {
            logger.error(ex.toString());
        }
    }

    @Override
    public void rollback(Connection conn) {
        try {
            conn.rollback();
        } catch (SQLException ex) {
            logger.error(ex.toString());
        }
    }

    @Override
    public void endTransaction(Connection conn) {
        try {
            conn.commit();
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

    public String getCurrentUserOID() {
        return ((MyUserDetails) (SecurityContextHolder.getContext().getAuthentication()).getPrincipal()).getOid();
    }
}

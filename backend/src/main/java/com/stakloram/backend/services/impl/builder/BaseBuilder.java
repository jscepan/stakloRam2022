package com.stakloram.backend.services.impl.builder;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.AttributeObject;
import com.stakloram.backend.models.AttributeObject.AttributeType;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseBuilder implements IObjectBuilder {

    public Logger logger = LoggerFactory.getLogger(BaseBuilder.class);

    protected ObjectStore objectStore;
    protected List<String> databaseColumnsForQuickSearch = new ArrayList<>();
    protected Map<String, String> databaseColumnsForAdvanceFilter = new HashMap<>();
    protected Map<String, String> databaseColumnsForAttributes = new HashMap<>();

    public BaseBuilder() {
        this.setObjectStore();
        this.setColumnsForSearch();
    }

    public ObjectStore getObjectStore() {
        return objectStore;
    }

    @Override
    public BaseModel createNewObject(BaseModel object, Connection conn) throws SException {
        try {
            return this.objectStore.createNewObjectToDatabase(object, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object, Connection conn) throws SException {
        try {
            BaseModel baseModel = this.objectStore.modifyObject(oid, object, conn);
            baseModel.setOid(oid);
            return baseModel;
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjectByOid(String oid, Connection conn) throws SException {
        try {
            return this.objectStore.deleteObjectByOid(oid, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public BaseModel getObjectByOid(String oid, Connection conn) throws SException {
        try {
            return this.objectStore.getObjectByOid(oid, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public ResponseWithCount searchObjects(String fromClausule, SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException {
        try {
            String searchClausule = this.getQuickSearchClausule(this.getQuickSearchWords(searchObject));
            String betweenClausule = this.getBetweenClausule(searchObject);
            return this.objectStore.searchObjectsFromDatabase(fromClausule, this.generateWhereClausule("", searchClausule, betweenClausule), skip, top, searchObject.getOrdering(), conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public ResponseWithCount searchObjects(String fromClausule, SearchRequest searchObject, Long skip, Long top, List<String> orderByColumns, Connection conn) throws SException {
        try {
            String searchClausule = this.getQuickSearchClausule(this.getQuickSearchWords(searchObject));
            String betweenClausule = this.getBetweenClausule(searchObject);
            return this.objectStore.searchObjectsFromDatabase(fromClausule, this.generateWhereClausule("", searchClausule, betweenClausule), skip, top, searchObject.getOrdering(), orderByColumns, conn);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException {
        try {
            String searchClausule = this.getQuickSearchClausule(this.getQuickSearchWords(searchObject));
            String betweenClausule = this.getBetweenClausule(searchObject);
            ResponseWithCount rwc = this.objectStore.searchObjectsFromDatabase(this.generateWhereClausule("", searchClausule, betweenClausule), skip, top, searchObject.getOrdering(), conn);
            return this.getArrayResponseFromResponseWithCount(rwc);
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public String getSqlFromAppendObjectStores(List<ObjectStore> stores) {
        StringBuilder sb = new StringBuilder();
        sb.append(" " + DATABASE_NAME);
        sb.append(".");
        sb.append(this.getObjectStore().getTableName());
        for (int i = 0; i < stores.size(); i++) {
            sb.append(" JOIN ");
            sb.append(DATABASE_NAME);
            sb.append(".");
            sb.append(stores.get(i).getTableName());
            sb.append(" ON ");
            sb.append(this.getObjectStore().getTableName());
            sb.append(".");
            sb.append(this.getObjectStore().getTableName());
            sb.append("_");
            sb.append(stores.get(i).getTableName());
            sb.append("_");
            sb.append(stores.get(i).getPrimaryKey());
            sb.append("=");
            sb.append(stores.get(i).getTableName());
            sb.append(".");
            sb.append(stores.get(i).getPrimaryKey());
        }
        return sb.toString();
    }

    @Override
    public String getSqlFromObjectStores(List<ObjectStore> stores) {
        if (stores.isEmpty()) {
            return "";
        } else if (stores.size() == 1) {
            return stores.get(0).getDefaultFromClausule();
        }
        StringBuilder sb = new StringBuilder();
        sb.append(" " + DATABASE_NAME);
        sb.append(".");
        sb.append(stores.get(0).getTableName());
        for (int i = 1; i < stores.size(); i++) {
            sb.append(" JOIN ");
            sb.append(DATABASE_NAME);
            sb.append(".");
            sb.append(stores.get(i).getTableName());
            sb.append(" ON ");
            sb.append(stores.get(0).getTableName());
            sb.append(".");
            sb.append(stores.get(0).getTableName());
            sb.append("_");
            sb.append(stores.get(i).getTableName());
            sb.append("_");
            sb.append(stores.get(i).getPrimaryKey());
            sb.append("=");
            sb.append(stores.get(i).getTableName());
            sb.append(".");
            sb.append(stores.get(i).getPrimaryKey());
        }
        return sb.toString();
    }

    @Override
    public ArrayResponse getArrayResponseFromResponseWithCount(ResponseWithCount rwc) throws SException {
        List<BaseModel> objects = new ArrayList<>();
        try {
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                objects.add(this.objectStore.getObjectFromResultSet(rs));
            }
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return new ArrayResponse(objects, rwc.getCount());
    }

    @Override
    public List<String> getQuickSearchWords(SearchRequest searchObject) {
        if (searchObject.getCriteriaQuick() != null && searchObject.getCriteriaQuick().length() > 0) {
            String[] wordsToFind = searchObject.getCriteriaQuick().split(" ");
            List<String> words = new ArrayList<>();
            words.addAll(Arrays.asList(wordsToFind));
            return words;
        }
        return new ArrayList<>();
    }

    @Override
    public String getQuickSearchClausule(List<String> words) {
        String searchClausule = "";
        if (words.size() > 0) {
            for (int i = 0; i < words.size(); i++) {
                if (i == 0) {
                    searchClausule += " (";
                }
                for (int j = 0; j < this.databaseColumnsForQuickSearch.size(); j++) {
                    if (j > 0) {
                        searchClausule += " OR ";
                    }
                    searchClausule += this.databaseColumnsForQuickSearch.get(j);
                    searchClausule += " LIKE '%" + words.get(i) + "%'";
                }
                if (i + 1 == words.size()) {
                    searchClausule += ")";
                } else {
                    searchClausule += ") AND (";
                }
            }
        }
        return searchClausule;
    }

    public String generateWhereClausule(String whereClausule, String searchClausule, String betweenClausule) {
        String where = "";
        if (whereClausule.trim().length() > 0 && searchClausule.length() > 0) {
            where = whereClausule + " AND " + searchClausule;
        } else {
            where = searchClausule;
        }
        if (where.trim().length() > 0 && betweenClausule.length() > 0) {
            where = where + " AND " + betweenClausule;
        } else {
            where += betweenClausule;
        }
        return where;
    }

    private String getBetweenClausule(SearchRequest searchObject) {
        if (this.databaseColumnsForAttributes.isEmpty()) {
            return "";
        }
        String betweenClausule = "";
        int i = 0;
        for (AttributeObject entity : searchObject.getBetweenAttributes()) {
            String tableName = this.databaseColumnsForAttributes.get(entity.getAttribute());
            if (entity.getAttribute().isEmpty()) {
                break;
            }
            if (i > 0) {
                betweenClausule += " AND ";
            }
            betweenClausule += "(";
            if (entity.getAttributeType().equals(AttributeType.DATE)) {
                betweenClausule += "DATE";
            }
            betweenClausule += "(" + this.getObjectStore().getTableName() + "." + this.getObjectStore().getTableName() + "_" + tableName + ")";
            if (null != entity.getType()) {
                switch (entity.getType()) {
                    case GREATER:
                        betweenClausule += ">";
                        break;
                    case GREATER_OR_EQUAL:
                        betweenClausule += ">=";
                        break;
                    case SMALLER:
                        betweenClausule += "<";
                        break;
                    case SMALLER_OR_EQUAL:
                        betweenClausule += "<=";
                        break;
                    default:
                        betweenClausule += "=";
                        break;
                }
            }
            if (entity.getAttributeType().equals(AttributeType.DATE) || entity.getAttributeType().equals(AttributeType.STRING)) {
                betweenClausule += "'";
            }
            betweenClausule += entity.getAttributeValue();
            if (entity.getAttributeType().equals(AttributeType.DATE) || entity.getAttributeType().equals(AttributeType.STRING)) {
                betweenClausule += "'";
            }
            betweenClausule += ")";
            i++;
        }
        return betweenClausule;
    }
}

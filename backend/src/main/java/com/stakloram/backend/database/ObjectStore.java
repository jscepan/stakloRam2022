package com.stakloram.backend.database;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.SearchRequest.Ordering;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ObjectStore implements IObjectStore {

    Logger logger = LoggerFactory.getLogger(ObjectStore.class);

    protected String tableName;

    public ObjectStore() {
        this.setTableName();
    }

    public String getTableName() {
        return this.tableName;
    }

    public String getPrimaryKey() {
        return this.getTableName() + "_id";
    }

    public String getDefaultFromClausule() {
        return DATABASE_NAME + "." + this.tableName;
    }

    @Override
    public BaseModel getObjectByOid(String oid, Connection conn) throws SQLException, SException {
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " where " + this.tableName + "_id=" + BaseModel.getIdFromOid(oid));
        if (resultSet.next()) {
            return this.getObjectFromResultSet(resultSet);
        }
        return null;
    }

    @Override
    public boolean deleteObjectByOid(String oid, Connection conn) throws SQLException {
        PreparedStatement st = conn.prepareStatement("DELETE FROM " + this.getDefaultFromClausule() + " WHERE " + tableName + "_id=?");
        st.setLong(1, BaseModel.getIdFromOid(oid));
        return st.executeUpdate() > 0;
    }

    @Override
    public ResultSet getAllObjectsFromDatabase(String whereClausule, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (whereClausule == null) {
            whereClausule = "";
        }
        Statement st = conn.createStatement();
        return st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " " + whereClausule);
    }

    @Override
    public ResultSet getAllObjectsFromDatabase(String fromClausule, String whereClausule, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        Statement st = conn.createStatement();
        return st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String whereClausule, Long skip, Long top, Ordering ordering, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        long count = 0;
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering + " limit " + skip + ", " + top);
        Statement stCount = conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + this.getDefaultFromClausule() + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Ordering ordering, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        long count = 0;
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering);
        Statement stCount = conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + fromClausule + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Long skip, Long top, Ordering ordering, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        long count = 0;
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering + " " + " limit " + skip + ", " + top);
        Statement stCount = conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + fromClausule + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Long skip, Long top, Ordering ordering, List<String> orderByColumns, Connection conn) throws SQLException, SException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }

        long count = 0;
        Statement st = conn.createStatement();
        String orderingClausule = this.getTableName();

        String orderByClause = "";
        if (orderByColumns != null && !orderByColumns.isEmpty()) {
            orderByClause = " ORDER BY ";
            for (int i = 0; i < orderByColumns.size(); i++) {
                orderByClause += orderingClausule + "." + orderByColumns.get(i);
                orderByClause += " " + ordering;
                if (i < orderByColumns.size() - 1) {
                    orderByClause += ", ";
                }
            }
        } else {
            orderByClause = " ORDER BY " + orderingClausule + "." + this.getPrimaryKey() + " " + ordering;
        }

        String query = "SELECT * from " + fromClausule + " " + whereClausule + orderByClause + " limit " + skip + ", " + top;
        ResultSet resultSet = st.executeQuery(query);

        Statement stCount = conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + fromClausule + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");

        return new ResponseWithCount(resultSet, count);
    }
}

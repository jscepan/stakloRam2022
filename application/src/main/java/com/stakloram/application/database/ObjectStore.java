package com.stakloram.application.database;

import com.stakloram.application.models.Locator;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.SearchRequest.Ordering;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ObjectStore implements IObjectStore {

    Logger logger = LoggerFactory.getLogger(ObjectStore.class);

    protected String tableName;
    protected final String primaryKey;
    public static final String DATABASE_NAME = ConnectionToDatabase.DATABASE_NAME;
    private final Connection conn;

    public ObjectStore(Locator locator) {
        this.conn = locator.getCONN();
        this.setTableName();
        this.primaryKey = this.getTableName() + "_id";
    }

    public Connection getConn() {
        return conn;
    }

    public String getTableName() {
        return this.tableName;
    }

    public String getPrimaryKey() {
        return primaryKey;
    }

    public String getDefaultFromClausule() {
        return ConnectionToDatabase.DATABASE_NAME + "." + this.tableName;
    }

    @Override
    public BaseModel getObjectByOid(String oid) throws SQLException {
        Statement st = this.conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " where " + this.tableName + "_id=" + BaseModel.getIdFromOid(oid));
        if (resultSet.next()) {
            return this.getObjectFromResultSet(resultSet);
        }
        return null;
    }

    @Override
    public boolean deleteObjectByOid(String oid) throws SQLException {
        PreparedStatement st = this.conn.prepareStatement("DELETE FROM " + this.getDefaultFromClausule() + " WHERE " + tableName + "_id=?");
        st.setLong(1, BaseModel.getIdFromOid(oid));
        return st.executeUpdate() > 0;
    }

    @Override
    public ResultSet getAllObjectsFromDatabase(String whereClausule) throws SQLException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (whereClausule == null) {
            whereClausule = "";
        }
        Statement st = this.conn.createStatement();
//        System.out.println("SELECT * from " + this.getDefaultFromClausule() + " " + whereClausule);
        return st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " " + whereClausule);
    }

    @Override
    public ResultSet getAllObjectsFromDatabase(String fromClausule, String whereClausule) throws SQLException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        Statement st = this.conn.createStatement();
        return st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String whereClausule, Long skip, Long top, Ordering ordering) throws SQLException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        long count = 0;
        Statement st = this.conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + this.getDefaultFromClausule() + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering + " limit " + skip + ", " + top);
        Statement stCount = this.conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + this.getDefaultFromClausule() + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Ordering ordering) throws SQLException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        long count = 0;
        Statement st = this.conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering);
        Statement stCount = this.conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + fromClausule + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }

    @Override
    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Long skip, Long top, Ordering ordering) throws SQLException {
        if (whereClausule != null && whereClausule.trim().length() > 0) {
            whereClausule = " WHERE " + whereClausule;
        }
        if (fromClausule == null || fromClausule.trim().length() == 0) {
            fromClausule = this.getDefaultFromClausule();
        }
        long count = 0;
        Statement st = this.conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + fromClausule + " " + whereClausule + " ORDER BY " + this.getTableName() + "." + this.getPrimaryKey() + " " + ordering + " " + " limit " + skip + ", " + top);
        Statement stCount = this.conn.createStatement();
        ResultSet resultSetCount = stCount.executeQuery("SELECT COUNT(*) AS rowcount from " + fromClausule + " " + whereClausule);
        resultSetCount.next();
        count = resultSetCount.getLong("rowcount");
        return new ResponseWithCount(resultSet, count);
    }
}
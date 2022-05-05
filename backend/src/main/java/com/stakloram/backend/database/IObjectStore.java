package com.stakloram.backend.database;

import com.stakloram.backend.models.BaseModel;
import java.sql.ResultSet;
import java.sql.SQLException;

public interface IObjectStore {

    public void setTableName();

    public BaseModel getObjectByOid(String oid) throws SQLException;

    public BaseModel createNewObjectToDatabase(BaseModel model) throws SQLException;

    public BaseModel modifyObject(String oid, BaseModel model) throws SQLException;

    public boolean deleteObjectByOid(String oid) throws SQLException;

    public BaseModel getObjectFromResultSet(ResultSet resultSet) throws SQLException;

    public ResultSet getAllObjectsFromDatabase(String whereClausule) throws SQLException;

    public ResultSet getAllObjectsFromDatabase(String fromClausule, String whereClausule) throws SQLException;

    public ResponseWithCount searchObjectsFromDatabase(String whereClausule, Long skip, Long top) throws SQLException;

    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule) throws SQLException;

    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Long skip, Long top) throws SQLException;

//
//    public ArrayResponse searchObjectsFromDatabase(QuickSearch quickSearch, AdvanceFilter advanceFilter, Long skip, Long top);
//
//    public ArrayResponse getAllObjectsFromDatabase(Long skip, Long top);
//
//    public List<? extends BaseModel> getAllObjectsFromDatabase();
//
//    public ResultSet getAllObjectsFromDatabase(String fromClausule, String whereClausule);
//
//    public List<? extends BaseModel> getAllObjectsFromDatabaseForCondition(String sqlWhereConditions);
}

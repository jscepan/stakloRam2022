package com.stakloram.backend.database;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.SearchRequest.Ordering;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public interface IObjectStore {

    public void setTableName();

    public BaseModel getObjectByOid(String oid, Connection conn) throws SQLException, SException;

    public BaseModel createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException;

    public BaseModel modifyObject(String oid, BaseModel model, Connection conn) throws SQLException;

    public boolean deleteObjectByOid(String oid, Connection conn) throws SQLException;

    public BaseModel getObjectFromResultSet(ResultSet resultSet) throws SQLException, SException;

    public ResultSet getAllObjectsFromDatabase(String whereClausule, Connection conn) throws SQLException, SException;

    public ResultSet getAllObjectsFromDatabase(String fromClausule, String whereClausule, Connection conn) throws SQLException, SException;

    public ResponseWithCount searchObjectsFromDatabase(String whereClausule, Long skip, Long top, Ordering ordering, Connection conn) throws SQLException, SException;

    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Ordering ordering, Connection conn) throws SQLException, SException;

    public ResponseWithCount searchObjectsFromDatabase(String fromClausule, String whereClausule, Long skip, Long top, Ordering ordering, Connection conn) throws SQLException, SException;
}

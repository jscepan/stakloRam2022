package com.stakloram.backend.services;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import java.sql.Connection;
import java.util.List;

public interface IService {

    public void setBaseBuilder();

    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException;

    public BaseModel getObjectByOID(String oid) throws SException;

    public BaseModel createNewObject(BaseModel object) throws SException;

    public BaseModel modifyObject(String oid, BaseModel object) throws SException;

    public boolean deleteObjects(List<? extends BaseModel> objects) throws SException;

    void startTransaction(Connection conn);

    void rollback(Connection conn);

    void endTransaction(Connection conn);

    public void checkRequestDataForCreate(BaseModel baseModel) throws SException;

    public void checkRequestDataForModify(String oid, BaseModel baseModel) throws SException;
}

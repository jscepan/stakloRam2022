package com.stakloram.backend.services;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import java.util.List;

public interface IService {

    public void setBaseBuilder();

    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException;

    public BaseModel getObjectByOID(String oid) throws SException;

    public BaseModel createNewObject(BaseModel object) throws SException;

    public BaseModel modifyObject(String oid, BaseModel object) throws SException;

    public boolean deleteObjects(List<String> oids) throws SException;

    void startTransaction();

    void rollback();

    void endTransaction();

    public void checkRequestDataForCreate(BaseModel object) throws SException;

    public void checkRequestDataForModify(String oid, BaseModel object) throws SException;
}

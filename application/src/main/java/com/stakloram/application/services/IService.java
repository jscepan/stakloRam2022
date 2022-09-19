package com.stakloram.application.services;

import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.SearchRequest;
import java.util.List;

public interface IService {

    public void setBaseBuilder();

    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException;

    public BaseModel getObjectByOID(String oid) throws SException;

    public BaseModel createNewObject(BaseModel object) throws SException;

    public BaseModel modifyObject(String oid, BaseModel object) throws SException;

    public boolean deleteObjects(List<? extends BaseModel> objects) throws SException;

    void startTransaction();

    void rollback();

    void endTransaction();

    public void checkRequestDataForCreate(BaseModel baseModel) throws SException;

    public void checkRequestDataForModify(String oid, BaseModel baseModel) throws SException;
}

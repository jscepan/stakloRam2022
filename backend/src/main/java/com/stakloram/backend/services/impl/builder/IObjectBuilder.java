package com.stakloram.backend.services.impl.builder;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import java.sql.Connection;
import java.util.List;

public interface IObjectBuilder {

    public void setObjectStore();

    public void setColumnsForSearch();

    public BaseModel createNewObject(BaseModel object, Connection conn) throws SException;

    public BaseModel modifyObject(String oid, BaseModel object, Connection conn) throws SException;

    public boolean deleteObjectByOid(String oid, Connection conn) throws SException;

    public BaseModel getObjectByOid(String oid, Connection conn) throws SException;

    public ArrayResponse<? extends BaseModel> searchObjects(SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException;

    public String getSqlFromAppendObjectStores(List<ObjectStore> stores);
    
    public String getSqlFromObjectStores(List<ObjectStore> stores);

    public ArrayResponse getArrayResponseFromResponseWithCount(ResponseWithCount rwc) throws SException;

    public List<String> getQuickSearchWords(SearchRequest searchObject);

    public String getQuickSearchClausule(List<String> words);
}

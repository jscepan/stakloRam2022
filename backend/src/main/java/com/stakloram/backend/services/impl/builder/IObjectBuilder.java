package com.stakloram.backend.services.impl.builder;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import java.util.List;

public interface IObjectBuilder {

    public void setObjectStore();

    public void setColumnsForSearch();

    public BaseModel createNewObject(BaseModel object) throws SException;

    public BaseModel modifyObject(String oid, BaseModel object) throws SException;

    public boolean deleteObjectByOid(String oid) throws SException;

    public BaseModel getObjectByOid(String oid) throws SException;

    public ArrayResponse<? extends BaseModel> searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException;

    public String getSqlFromAppendObjectStores(List<ObjectStore> stores);
    
    public String getSqlFromObjectStores(List<ObjectStore> stores);

    public ArrayResponse getArrayResponseFromResponseWithCount(ResponseWithCount rwc) throws SException;

    public List<String> getQuickSearchWords(SearchRequest searchObject);

    public String getQuickSearchClausule(List<String> words);
//    public ArrayResponse<? extends BaseModel> searchObjects(String searchObject, String equalsClausule, String containsClausule) throws SException;
//    public AdvanceFilter getAdvanceFilterFromSearchRequest(SearchRequest searchObject);
//    public List<? extends BaseModel> getAllObjects();
//    boolean saveHistoryObject(History history);
}

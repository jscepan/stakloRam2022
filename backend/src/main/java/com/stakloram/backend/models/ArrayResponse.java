package com.stakloram.backend.models;

import java.util.List;

public class ArrayResponse<T extends BaseModel> {

    private List<T> entities;
    private Long totalCount;

    public ArrayResponse(List<T> entities, Long totalCount) {
        this.entities = entities;
        this.totalCount = totalCount;
    }

    public List<T> getEntities() {
        return entities;
    }

    public void setEntities(List<T> entities) {
        this.entities = entities;
    }

    public Long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Long totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "ArrayResponse{" + "entities=" + entities + ", totalCount=" + totalCount + '}';
    }
}

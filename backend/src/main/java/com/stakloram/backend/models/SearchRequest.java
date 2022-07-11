package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SearchRequest {

    private String criteriaQuick;
    private List< Map<String, List<String>>> attributes = new ArrayList<>();
    private List< Map<String, List<String>>> objectsOIDS = new ArrayList<>();

    public SearchRequest() {
    }

    public String getCriteriaQuick() {
        return criteriaQuick;
    }

    public void setCriteriaQuick(String criteriaQuick) {
        this.criteriaQuick = criteriaQuick;
    }

    public List<Map<String, List<String>>> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Map<String, List<String>>> attributes) {
        this.attributes = attributes;
    }

    public List<Map<String, List<String>>> getObjectsOIDS() {
        return objectsOIDS;
    }

    public void setObjectsOIDS(List<Map<String, List<String>>> objectsOIDS) {
        this.objectsOIDS = objectsOIDS;
    }
}

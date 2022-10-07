package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.List;

public class SearchRequest {

    private String criteriaQuick;
    private List< AttributeObject> betweenAttributes = new ArrayList<>();
    private Ordering ordering = Ordering.ASC;

    public SearchRequest() {
    }

    public String getCriteriaQuick() {
        return criteriaQuick;
    }

    public void setCriteriaQuick(String criteriaQuick) {
        this.criteriaQuick = criteriaQuick;
    }

    public Ordering getOrdering() {
        return ordering;
    }

    public void setOrdering(Ordering ordering) {
        this.ordering = ordering;
    }

    public List<AttributeObject> getBetweenAttributes() {
        return betweenAttributes;
    }

    public void setBetweenAttributes(List<AttributeObject> betweenAttributes) {
        this.betweenAttributes = betweenAttributes;
    }

    public enum Ordering {
        ASC, DESC;
    }
}

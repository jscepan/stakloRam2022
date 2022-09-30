package com.stakloram.backend.models;

public class AttributeObject {

    private String attribute;
    private String attributeType;
    private String attributeValue;
    private SearchRequest.TypeOfRatio type;

    public AttributeObject() {
    }

    public AttributeObject(String attribute, String attributeType, String attributeValue, SearchRequest.TypeOfRatio type) {
        this.attribute = attribute;
        this.attributeType = attributeType;
        this.attributeValue = attributeValue;
        this.type = type;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getAttributeType() {
        return attributeType;
    }

    public void setAttributeType(String attributeType) {
        this.attributeType = attributeType;
    }

    public String getAttributeValue() {
        return attributeValue;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }

    public SearchRequest.TypeOfRatio getType() {
        return type;
    }

    public void setType(SearchRequest.TypeOfRatio type) {
        this.type = type;
    }
}

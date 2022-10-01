package com.stakloram.backend.models;

public class AttributeObject {

    private String attribute;
    private AttributeType attributeType;
    private String attributeValue;
    private TypeOfRatio type;

    public AttributeObject() {
    }

    public AttributeObject(String attribute, AttributeType attributeType, String attributeValue, TypeOfRatio type) {
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

    public AttributeType getAttributeType() {
        return attributeType;
    }

    public void setAttributeType(AttributeType attributeType) {
        this.attributeType = attributeType;
    }

    public String getAttributeValue() {
        return attributeValue;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }

    public TypeOfRatio getType() {
        return type;
    }

    public void setType(TypeOfRatio type) {
        this.type = type;
    }

    public enum AttributeType {
        STRING, DATE, NUMBER
    }

    public enum TypeOfRatio {
        GREATER, SMALLER, GREATER_OR_EQUAL, SMALLER_OR_EQUAL, EQUAL
    }
}

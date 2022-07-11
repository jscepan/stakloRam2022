package com.stakloram.backend.models;

public class Product extends BaseModel {

    private String number;
    private String description;
    private String unitOfMeasure;

    public Product() {
    }

    public Product(String number, String description, String unitOfMeasure, String oid) {
        super(oid);
        this.number = number;
        this.description = description;
        this.unitOfMeasure = unitOfMeasure;
    }

    public Product(String number, String description, String unitOfMeasure, Long id) {
        super(id);
        this.number = number;
        this.description = description;
        this.unitOfMeasure = unitOfMeasure;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    @Override
    public String toString() {
        return "Product{" + "number=" + number + ", description=" + description + ", unitOfMeasure=" + unitOfMeasure + '}';
    }
}

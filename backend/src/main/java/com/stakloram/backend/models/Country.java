package com.stakloram.backend.models;

public class Country extends BaseModel {

    private String description;

    public Country() {
    }

    public Country(String oid) {
        super(oid);
    }

    public Country(Long id) {
        super(id);
    }

    public Country(String description, String oid) {
        super(oid);
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Country{" + "description=" + description + '}';
    }
}

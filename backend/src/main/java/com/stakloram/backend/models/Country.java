package com.stakloram.backend.models;

public class Country extends BaseModel {

    private String description;
    private String identificationCode;

    public Country() {
    }

    public Country(String oid) {
        super(oid);
    }

    public Country(Long id) {
        super(id);
    }

    public Country(String description, String identificationCode) {
        this.description = description;
        this.identificationCode = identificationCode;
    }

    public Country(String description, String identificationCode, String oid) {
        super(oid);
        this.description = description;
        this.identificationCode = identificationCode;
    }

    public Country(String description, String identificationCode, Long id) {
        super(id);
        this.description = description;
        this.identificationCode = identificationCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIdentificationCode() {
        return identificationCode;
    }

    public void setIdentificationCode(String identificationCode) {
        this.identificationCode = identificationCode;
    }

    @Override
    public String toString() {
        return "Country{" + "description=" + description + ", identificationCode=" + identificationCode + '}';
    }
}

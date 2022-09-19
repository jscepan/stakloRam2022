package com.stakloram.application.models;

public class City extends BaseModel {

    private String zipCode;
    private String name;
    private Country country;

    public City() {
    }

    public City(String oid) {
        super(oid);
    }

    public City(Long id) {
        super(id);
    }

    public City(String zipCode, String name, Country country, String oid) {
        super(oid);
        this.zipCode = zipCode;
        this.name = name;
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "City{" + "zipCode=" + zipCode + ", name=" + name + ", country=" + country + '}';
    }
}

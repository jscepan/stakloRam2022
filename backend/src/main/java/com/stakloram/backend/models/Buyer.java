package com.stakloram.backend.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class Buyer extends BaseModel {

    private BuyerType type;
    private String name;
    private String address;
    private String maticalNumber;
    private String pib;
    private String contactPerson;
    private String phoneNumberFix;
    private String phoneNumberMobile;
    private String email;
    private GenderType gender;
    private City city;
    private String jbkjs;

    public Buyer() {
    }

    public Buyer(String oid) {
        super(oid);
    }

    public Buyer(Long id) {
        super(id);
    }

    public Buyer(BuyerType type, String name, String address, String maticalNumber, String pib, String contactPerson, String phoneNumberFix, String phoneNumberMobile, String email, GenderType gender, City city, String jbkjs, String oid) {
        super(oid);
        this.type = type;
        this.name = name;
        this.address = address;
        this.maticalNumber = maticalNumber;
        this.pib = pib;
        this.contactPerson = contactPerson;
        this.phoneNumberFix = phoneNumberFix;
        this.phoneNumberMobile = phoneNumberMobile;
        this.email = email;
        this.gender = gender;
        this.city = city;
        this.jbkjs = jbkjs;
    }

    public Buyer(BuyerType type, String name, String address, String maticalNumber, String pib, String contactPerson, String phoneNumberFix, String phoneNumberMobile, String email, GenderType gender, City city, String jbkjs, Long id) {
        super(id);
        this.type = type;
        this.name = name;
        this.address = address;
        this.maticalNumber = maticalNumber;
        this.pib = pib;
        this.contactPerson = contactPerson;
        this.phoneNumberFix = phoneNumberFix;
        this.phoneNumberMobile = phoneNumberMobile;
        this.email = email;
        this.gender = gender;
        this.city = city;
        this.jbkjs = jbkjs;
    }

    public BuyerType getType() {
        return type;
    }

    public void setType(BuyerType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMaticalNumber() {
        return maticalNumber;
    }

    public void setMaticalNumber(String maticalNumber) {
        this.maticalNumber = maticalNumber;
    }

    public String getPib() {
        return pib;
    }

    public void setPib(String pib) {
        this.pib = pib;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getPhoneNumberFix() {
        return phoneNumberFix;
    }

    public void setPhoneNumberFix(String phoneNumberFix) {
        this.phoneNumberFix = phoneNumberFix;
    }

    public String getPhoneNumberMobile() {
        return phoneNumberMobile;
    }

    public void setPhoneNumberMobile(String phoneNumberMobile) {
        this.phoneNumberMobile = phoneNumberMobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public GenderType getGender() {
        return gender;
    }

    public void setGender(GenderType gender) {
        this.gender = gender;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getJbkjs() {
        return jbkjs;
    }

    public void setJbkjs(String jbkjs) {
        this.jbkjs = jbkjs;
    }

    @Override
    public String toString() {
        return "Buyer{" + "type=" + type + ", name=" + name + ", address=" + address + ", maticalNumber=" + maticalNumber + ", pib=" + pib + ", contactPerson=" + contactPerson + ", phoneNumberFix=" + phoneNumberFix + ", phoneNumberMobile=" + phoneNumberMobile + ", email=" + email + ", gender=" + gender + ", city=" + city + ", jbkjs=" + jbkjs + '}';
    }

    public enum BuyerType {
        PERSON, COMPANY
    }

    @JsonInclude(Include.NON_NULL)
    public enum GenderType {
        MAN, WOMAN, REST
    }
}

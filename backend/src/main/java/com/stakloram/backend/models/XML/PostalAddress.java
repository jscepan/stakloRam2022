package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class PostalAddress {

    @XmlElement(name = "CityName")
    private String cityName;
    @XmlElement(name = "Country")
    private CountryXML country;

    public PostalAddress(String cityName, CountryXML country) {
        this.cityName = cityName;
        this.country = country;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public CountryXML getCountry() {
        return country;
    }

    public void setCountry(CountryXML country) {
        this.country = country;
    }
}

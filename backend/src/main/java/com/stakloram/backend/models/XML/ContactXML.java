package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ContactXML {

    @XmlElement(name = "ElectronicMail")
    private String electronicMail;

    public ContactXML(String electronicMail) {
        this.electronicMail = electronicMail;
    }

    public String getElectronicMail() {
        return electronicMail;
    }

    public void setElectronicMail(String electronicMail) {
        this.electronicMail = electronicMail;
    }
}

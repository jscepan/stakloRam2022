package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoicePeriodXML {

    @XmlElement(name = "DescriptionCode")
    private String descriptionCode;

    public InvoicePeriodXML(String descriptionCode) {
        this.descriptionCode = descriptionCode;
    }

    public String getDescriptionCode() {
        return descriptionCode;
    }

    public void setDescriptionCode(String descriptionCode) {
        this.descriptionCode = descriptionCode;
    }
}
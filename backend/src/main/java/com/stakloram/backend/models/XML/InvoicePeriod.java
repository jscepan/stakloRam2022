package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

//@XmlRootElement(name = "InvoicePeriod")
@XmlAccessorType(XmlAccessType.FIELD)
public class InvoicePeriod {

    @XmlElement(name = "DescriptionCode")
    private String descriptionCode;

    public InvoicePeriod(String descriptionCode) {
        this.descriptionCode = descriptionCode;
    }
}

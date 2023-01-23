package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceSeller {

    @XmlElement(name = "EndpointID")
    private PibXML pibXML;
    @XmlElement(name = "PartyName")
    private String name;

    public PibXML getPibXML() {
        return pibXML;
    }

    public void setPibXML(PibXML pibXML) {
        this.pibXML = pibXML;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

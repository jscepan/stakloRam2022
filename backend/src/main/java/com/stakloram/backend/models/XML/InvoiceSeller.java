package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceSeller {
//

    @XmlElement(name = "EndpointID")
    private PibXML pibXML;
    @XmlElement(name = "PartyName")
    private PartyName partyName;
    @XmlElement(name = "PostalAddress")
    private PostalAddress postalAddress;

    public InvoiceSeller() {
    }
//
//    public InvoiceSeller(PibXML pibXML, PartyName partyName, PostalAddress postalAddress) {
//        this.pibXML = pibXML;
//        this.partyName = partyName;
//        this.postalAddress = postalAddress;
//    }
//

    public PibXML getPibXML() {
        return pibXML;
    }

    public void setPibXML(PibXML pibXML) {
        this.pibXML = pibXML;
    }

    public PartyName getPartyName() {
        return partyName;
    }

    public void setPartyName(PartyName partyName) {
        this.partyName = partyName;
    }

    public PostalAddress getPostalAddress() {
        return postalAddress;
    }

    public void setPostalAddress(PostalAddress postalAddress) {
        this.postalAddress = postalAddress;
    }
}

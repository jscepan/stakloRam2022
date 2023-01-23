package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoicePartyXML {

    @XmlElement(name = "PartyIdentificationXML")
    private PartyIdentificationXML partyIdentificationXML;
    @XmlElement(name = "EndpointID")
    private PibXML pibXML;
    @XmlElement(name = "PartyName")
    private PartyName partyName;
    @XmlElement(name = "PostalAddress")
    private PostalAddress postalAddress;
    @XmlElement(name = "PartyTaxScheme")
    private PartyTaxSchemeXML partyTaxScheme;
    @XmlElement(name = "PartyLegalEntity")
    private PartyLegalEntityXML partyLegalEntity;
    @XmlElement(name = "Contact")
    private ContactXML contact;

    public InvoicePartyXML() {
    }

    public PartyIdentificationXML getPartyIdentificationXML() {
        return partyIdentificationXML;
    }

    public void setPartyIdentificationXML(PartyIdentificationXML partyIdentificationXML) {
        this.partyIdentificationXML = partyIdentificationXML;
    }

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

    public PartyTaxSchemeXML getPartyTaxScheme() {
        return partyTaxScheme;
    }

    public void setPartyTaxScheme(PartyTaxSchemeXML partyTaxScheme) {
        this.partyTaxScheme = partyTaxScheme;
    }

    public PartyLegalEntityXML getPartyLegalEntity() {
        return partyLegalEntity;
    }

    public void setPartyLegalEntity(PartyLegalEntityXML partyLegalEntity) {
        this.partyLegalEntity = partyLegalEntity;
    }

    public ContactXML getContact() {
        return contact;
    }

    public void setContact(ContactXML contact) {
        this.contact = contact;
    }
}

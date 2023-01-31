package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoicePartyXML {

    @XmlElement(name = "EndpointID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private PibXML pibXML;
    @XmlElement(name = "PartyIdentification", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PartyIdentificationXML partyIdentificationXML;
    @XmlElement(name = "PartyName", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PartyName partyName;
    @XmlElement(name = "PostalAddress", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PostalAddress postalAddress;
    @XmlElement(name = "PartyTaxScheme", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PartyTaxSchemeXML partyTaxScheme;
    @XmlElement(name = "PartyLegalEntity", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PartyLegalEntityXML partyLegalEntity;
    @XmlElement(name = "Contact", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
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

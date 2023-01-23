package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class PartyTaxSchemeXML {

    @XmlElement(name = "CompanyID")
    private String companyID;
    @XmlElement(name = "TaxScheme")
    private TaxSchemeXML taxScheme;

    public PartyTaxSchemeXML(String companyID, TaxSchemeXML taxScheme) {
        this.companyID = companyID;
        this.taxScheme = taxScheme;
    }

    public String getCompanyID() {
        return companyID;
    }

    public void setCompanyID(String companyID) {
        this.companyID = companyID;
    }

    public TaxSchemeXML getTaxScheme() {
        return taxScheme;
    }

    public void setTaxScheme(TaxSchemeXML taxScheme) {
        this.taxScheme = taxScheme;
    }

}

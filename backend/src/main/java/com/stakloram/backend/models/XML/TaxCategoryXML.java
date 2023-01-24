package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TaxCategoryXML {

    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String id;
    @XmlElement(name = "Percent", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private double percent;
    @XmlElement(name = "TaxScheme", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxSchemeXML taxSchemeXML;

    public TaxCategoryXML(String id, double percent, TaxSchemeXML taxSchemeXML) {
        this.id = id;
        this.percent = percent;
        this.taxSchemeXML = taxSchemeXML;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPercent() {
        return percent;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }

    public TaxSchemeXML getTaxSchemeXML() {
        return taxSchemeXML;
    }

    public void setTaxSchemeXML(TaxSchemeXML taxSchemeXML) {
        this.taxSchemeXML = taxSchemeXML;
    }
}

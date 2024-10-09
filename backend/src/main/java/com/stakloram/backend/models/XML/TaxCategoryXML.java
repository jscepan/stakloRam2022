package com.stakloram.backend.models.XML;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TaxCategoryXML implements Serializable{
    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String id;
    @XmlElement(name = "Percent", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private double percent;
    @XmlElement(name = "TaxExemptionReasonCode", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String taxExemptionReasonCode;
    @XmlElement(name = "TaxExemptionReason", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String taxExemptionReasonReason;
    @XmlElement(name = "TaxScheme", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxSchemeXML taxSchemeXML;

    public TaxCategoryXML(String id, double percent, TaxSchemeXML taxSchemeXML) {
        this.id = id;
        this.percent = percent;
        this.taxSchemeXML = taxSchemeXML;
    }

    public TaxCategoryXML(String id, double percent, TaxSchemeXML taxSchemeXML, String taxExemptionReasonCode) {
        this.id = id;
        this.percent = percent;
        this.taxSchemeXML = taxSchemeXML;
        this.taxExemptionReasonCode = taxExemptionReasonCode;
    }

    public TaxCategoryXML(String id, TaxSchemeXML taxSchemeXML, String taxExemptionReasonCode, String taxExemptionReasonReason) {
        this.id = id;
        this.taxSchemeXML = taxSchemeXML;
        this.taxExemptionReasonCode = taxExemptionReasonCode;
        this.taxExemptionReasonReason = taxExemptionReasonReason;
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

    public String getTaxExemptionReasonCode() {
        return taxExemptionReasonCode;
    }

    public void setTaxExemptionReasonCode(String taxExemptionReasonCode) {
        this.taxExemptionReasonCode = taxExemptionReasonCode;
    }

    public String getTaxExemptionReasonReason() {
        return taxExemptionReasonReason;
    }

    public void setTaxExemptionReasonReason(String taxExemptionReasonReason) {
        this.taxExemptionReasonReason = taxExemptionReasonReason;
    }
}

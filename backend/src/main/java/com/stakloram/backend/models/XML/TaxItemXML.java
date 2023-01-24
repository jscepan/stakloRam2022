package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TaxItemXML {

    @XmlElement(name = "TaxableAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML taxableAmount;
    @XmlElement(name = "TaxAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML taxAmount;
    @XmlElement(name = "TaxCategory", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxCategoryXML taxCategoryXML;

    public TaxItemXML(CurrencyAmountXML taxableAmount, CurrencyAmountXML taxAmount, TaxCategoryXML taxCategoryXML) {
        this.taxableAmount = taxableAmount;
        this.taxAmount = taxAmount;
        this.taxCategoryXML = taxCategoryXML;
    }

    public CurrencyAmountXML getTaxableAmount() {
        return taxableAmount;
    }

    public void setTaxableAmount(CurrencyAmountXML taxableAmount) {
        this.taxableAmount = taxableAmount;
    }

    public CurrencyAmountXML getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(CurrencyAmountXML taxAmount) {
        this.taxAmount = taxAmount;
    }

    public TaxCategoryXML getTaxCategoryXML() {
        return taxCategoryXML;
    }

    public void setTaxCategoryXML(TaxCategoryXML taxCategoryXML) {
        this.taxCategoryXML = taxCategoryXML;
    }
}

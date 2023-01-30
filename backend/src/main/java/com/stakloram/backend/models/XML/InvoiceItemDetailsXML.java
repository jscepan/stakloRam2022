package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class InvoiceItemDetailsXML {

    @XmlElement(name = "Name", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String name;
    @XmlElement(name = "ClassifiedTaxCategory", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxCategoryXML taxCategoryXML;

    public InvoiceItemDetailsXML(String name, TaxCategoryXML taxCategoryXML) {
        this.name = name;
        this.taxCategoryXML = taxCategoryXML;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TaxCategoryXML getTaxCategoryXML() {
        return taxCategoryXML;
    }

    public void setTaxCategoryXML(TaxCategoryXML taxCategoryXML) {
        this.taxCategoryXML = taxCategoryXML;
    }
}

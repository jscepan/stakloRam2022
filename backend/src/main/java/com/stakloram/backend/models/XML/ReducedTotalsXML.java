package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ReducedTotalsXML {

    @XmlElement(name = "TaxTotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private TaxTotalXML taxTotal;
    @XmlElement(name = "LegalMonetaryTotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private LegalMonetaryTotalXML legalMonetaryTotal;

    public ReducedTotalsXML(TaxTotalXML taxTotal, LegalMonetaryTotalXML legalMonetaryTotal) {
        this.taxTotal = taxTotal;
        this.legalMonetaryTotal = legalMonetaryTotal;
    }

    public TaxTotalXML getTaxTotal() {
        return taxTotal;
    }

    public void setTaxTotal(TaxTotalXML taxTotal) {
        this.taxTotal = taxTotal;
    }

    public LegalMonetaryTotalXML getLegalMonetaryTotal() {
        return legalMonetaryTotal;
    }

    public void setLegalMonetaryTotal(LegalMonetaryTotalXML legalMonetaryTotal) {
        this.legalMonetaryTotal = legalMonetaryTotal;
    }
}

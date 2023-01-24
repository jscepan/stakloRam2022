package com.stakloram.backend.models.XML;

import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TaxTotalXML {

    @XmlElement(name = "TaxAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML taxAmount;
    @XmlElement(name = "TaxSubtotal", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private List<TaxItemXML> taxSubtotalXML;

    public TaxTotalXML(CurrencyAmountXML taxAmount, List<TaxItemXML> taxSubtotalXML) {
        this.taxAmount = taxAmount;
        this.taxSubtotalXML = taxSubtotalXML;
    }

    public CurrencyAmountXML getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(CurrencyAmountXML taxAmount) {
        this.taxAmount = taxAmount;
    }

    public List<TaxItemXML> getTaxSubtotalXML() {
        return taxSubtotalXML;
    }

    public void setTaxSubtotalXML(List<TaxItemXML> taxSubtotalXML) {
        this.taxSubtotalXML = taxSubtotalXML;
    }
}

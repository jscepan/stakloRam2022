package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class PriceXML {

    @XmlElement(name = "PriceAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML priceAmount;

    public PriceXML(CurrencyAmountXML priceAmount) {
        this.priceAmount = priceAmount;
    }

    public CurrencyAmountXML getPriceAmount() {
        return priceAmount;
    }

    public void setPriceAmount(CurrencyAmountXML priceAmount) {
        this.priceAmount = priceAmount;
    }
}

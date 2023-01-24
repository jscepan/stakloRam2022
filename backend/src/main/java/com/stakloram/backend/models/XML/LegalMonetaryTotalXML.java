package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class LegalMonetaryTotalXML {

    @XmlElement(name = "LineExtensionAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML lineExtensionAmount;
    @XmlElement(name = "TaxExclusiveAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML taxExclusiveAmount;
    @XmlElement(name = "TaxInclusiveAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML taxInclusiveAmount;
    @XmlElement(name = "AllowanceTotalAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML allowanceTotalAmount;
    @XmlElement(name = "PrepaidAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML prepaidAmount;
    @XmlElement(name = "PayableAmount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private CurrencyAmountXML payableAmount;

    public LegalMonetaryTotalXML(CurrencyAmountXML lineExtensionAmount, CurrencyAmountXML taxExclusiveAmount, CurrencyAmountXML taxInclusiveAmount, CurrencyAmountXML allowanceTotalAmount, CurrencyAmountXML prepaidAmount, CurrencyAmountXML payableAmount) {
        this.lineExtensionAmount = lineExtensionAmount;
        this.taxExclusiveAmount = taxExclusiveAmount;
        this.taxInclusiveAmount = taxInclusiveAmount;
        this.allowanceTotalAmount = allowanceTotalAmount;
        this.prepaidAmount = prepaidAmount;
        this.payableAmount = payableAmount;
    }

    public CurrencyAmountXML getLineExtensionAmount() {
        return lineExtensionAmount;
    }

    public void setLineExtensionAmount(CurrencyAmountXML lineExtensionAmount) {
        this.lineExtensionAmount = lineExtensionAmount;
    }

    public CurrencyAmountXML getTaxExclusiveAmount() {
        return taxExclusiveAmount;
    }

    public void setTaxExclusiveAmount(CurrencyAmountXML taxExclusiveAmount) {
        this.taxExclusiveAmount = taxExclusiveAmount;
    }

    public CurrencyAmountXML getTaxInclusiveAmount() {
        return taxInclusiveAmount;
    }

    public void setTaxInclusiveAmount(CurrencyAmountXML taxInclusiveAmount) {
        this.taxInclusiveAmount = taxInclusiveAmount;
    }

    public CurrencyAmountXML getAllowanceTotalAmount() {
        return allowanceTotalAmount;
    }

    public void setAllowanceTotalAmount(CurrencyAmountXML allowanceTotalAmount) {
        this.allowanceTotalAmount = allowanceTotalAmount;
    }

    public CurrencyAmountXML getPrepaidAmount() {
        return prepaidAmount;
    }

    public void setPrepaidAmount(CurrencyAmountXML prepaidAmount) {
        this.prepaidAmount = prepaidAmount;
    }

    public CurrencyAmountXML getPayableAmount() {
        return payableAmount;
    }

    public void setPayableAmount(CurrencyAmountXML payableAmount) {
        this.payableAmount = payableAmount;
    }

    @Override
    public String toString() {
        return "LegalMonetaryTotalXML{" + "lineExtensionAmount=" + lineExtensionAmount + ", taxExclusiveAmount=" + taxExclusiveAmount + ", taxInclusiveAmount=" + taxInclusiveAmount + ", allowanceTotalAmount=" + allowanceTotalAmount + ", prepaidAmount=" + prepaidAmount + ", payableAmount=" + payableAmount + '}';
    }
}

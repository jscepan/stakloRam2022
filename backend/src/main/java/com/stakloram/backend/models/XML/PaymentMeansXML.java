package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class PaymentMeansXML {

    @XmlElement(name = "PaymentMeansCode", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String paymentMeansCode;
    @XmlElement(name = "PaymentID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String paymentID;
    @XmlElement(name = "PayeeFinancialAccount", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private PayeeFinancialAccountXML payeeFinancialAccountXML;

    public PaymentMeansXML(String paymentMeansCode, String paymentID, PayeeFinancialAccountXML payeeFinancialAccountXML) {
        this.paymentMeansCode = paymentMeansCode;
        this.paymentID = paymentID;
        this.payeeFinancialAccountXML = payeeFinancialAccountXML;
    }

    public String getPaymentMeansCode() {
        return paymentMeansCode;
    }

    public void setPaymentMeansCode(String paymentMeansCode) {
        this.paymentMeansCode = paymentMeansCode;
    }

    public String getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(String paymentID) {
        this.paymentID = paymentID;
    }

    public PayeeFinancialAccountXML getPayeeFinancialAccountXML() {
        return payeeFinancialAccountXML;
    }

    public void setPayeeFinancialAccountXML(PayeeFinancialAccountXML payeeFinancialAccountXML) {
        this.payeeFinancialAccountXML = payeeFinancialAccountXML;
    }
}

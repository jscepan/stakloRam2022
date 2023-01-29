package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class UBLExtensionXML {

    @XmlElement(name = "UBLExtension", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2")
    private ExtensionContentXML ublExtension;

    public UBLExtensionXML(ExtensionContentXML ublExtension) {
        this.ublExtension = ublExtension;
    }

    public ExtensionContentXML getUblExtension() {
        return ublExtension;
    }

    public void setUblExtension(ExtensionContentXML ublExtension) {
        this.ublExtension = ublExtension;
    }
}

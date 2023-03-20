package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class AttachmentXML {

    @XmlElement(name = "EmbeddedDocumentBinaryObject", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private EmbeddedDocumentBinaryObjectXML embeddedDocumentBinaryObject;

    public AttachmentXML(EmbeddedDocumentBinaryObjectXML embeddedDocumentBinaryObject) {
        this.embeddedDocumentBinaryObject = embeddedDocumentBinaryObject;
    }

    public EmbeddedDocumentBinaryObjectXML getEmbeddedDocumentBinaryObject() {
        return embeddedDocumentBinaryObject;
    }

    public void setEmbeddedDocumentBinaryObject(EmbeddedDocumentBinaryObjectXML embeddedDocumentBinaryObject) {
        this.embeddedDocumentBinaryObject = embeddedDocumentBinaryObject;
    }
}

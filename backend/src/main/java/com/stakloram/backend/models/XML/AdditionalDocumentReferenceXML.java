package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class AdditionalDocumentReferenceXML {

    @XmlElement(name = "ID", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
    private String id;
    @XmlElement(name = "Attachment", namespace = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
    private AttachmentXML attachmentXML;

    public AdditionalDocumentReferenceXML(String id, AttachmentXML attachmentXML) {
        this.id = id;
        this.attachmentXML = attachmentXML;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AttachmentXML getAttachmentXML() {
        return attachmentXML;
    }

    public void setAttachmentXML(AttachmentXML attachmentXML) {
        this.attachmentXML = attachmentXML;
    }
}

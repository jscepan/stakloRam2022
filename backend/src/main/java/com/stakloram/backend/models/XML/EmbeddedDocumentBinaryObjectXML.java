package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.FIELD)
public class EmbeddedDocumentBinaryObjectXML {

    @XmlValue
    private String value;

    @XmlAttribute
    private String mimeCode;

    @XmlAttribute
    private String encodingCode;

    @XmlAttribute
    private String filename;

    public EmbeddedDocumentBinaryObjectXML(String value, String mimeCode, String encodingCode, String filename) {
        this.value = value;
        this.mimeCode = mimeCode;
        this.encodingCode = encodingCode;
        this.filename = filename;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getMimeCode() {
        return mimeCode;
    }

    public void setMimeCode(String mimeCode) {
        this.mimeCode = mimeCode;
    }

    public String getEncodingCode() {
        return encodingCode;
    }

    public void setEncodingCode(String encodingCode) {
        this.encodingCode = encodingCode;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}

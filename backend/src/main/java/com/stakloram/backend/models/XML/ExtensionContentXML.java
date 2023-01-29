package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ExtensionContentXML {

    @XmlElement(name = "SrbDtExt", namespace = "http://mfin.gov.rs/srbdt/srbdtext")
    private SrbDtExtXML srbDtExt;

    public ExtensionContentXML(SrbDtExtXML srbDtExt) {
        this.srbDtExt = srbDtExt;
    }

    public SrbDtExtXML getSrbDtExt() {
        return srbDtExt;
    }

    public void setSrbDtExt(SrbDtExtXML srbDtExt) {
        this.srbDtExt = srbDtExt;
    }
}

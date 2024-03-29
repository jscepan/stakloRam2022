@XmlJavaTypeAdapters({
    @XmlJavaTypeAdapter(value = CollapsedStringAdapter.class, type = String.class)
})
@XmlSchema(
        namespace = "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
        xmlns = {
            @XmlNs(prefix = "cec", namespaceURI = "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"),
            @XmlNs(prefix = "cac", namespaceURI = "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"),
            @XmlNs(prefix = "cbc", namespaceURI = "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"),
            @XmlNs(prefix = "xsi", namespaceURI = "http://www.w3.org/2001/XMLSchema-instance"),
            @XmlNs(prefix = "xsd", namespaceURI = "http://www.w3.org/2001/XMLSchema"),
            @XmlNs(prefix = "sbt", namespaceURI = "http://mfin.gov.rs/srbdt/srbdtext"),
            @XmlNs(prefix = "", namespaceURI = "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"),},
        attributeFormDefault = XmlNsForm.UNSET,
        elementFormDefault = XmlNsForm.UNSET
)
package com.stakloram.backend.models.XML;

import javax.xml.bind.annotation.XmlSchema;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapters;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.XmlNs;
import javax.xml.bind.annotation.XmlNsForm;
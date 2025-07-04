package com.stakloram.backend.controllers;

import com.amazonaws.util.IOUtils;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.XmlValue;
import com.stakloram.backend.services.impl.InvoiceService;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController()
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;

    @RequestMapping(method = RequestMethod.POST, value = "/invoices/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return invoiceService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/invoices/{invoiceOid}")
    public Invoice getById(@PathVariable String invoiceOid) throws SException {
        return (Invoice) invoiceService.getObjectByOID(invoiceOid);
    }

    @RequestMapping("/invoices/invoiceItemDescriptions")
    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        return invoiceService.getAllInvoiceItemDescriptions();
    }

    @RequestMapping("/invoices/number")
    public int getNextInvoiceNumber(@RequestParam InvoiceType invoiceType, @RequestParam int year) throws SException {
        return invoiceService.getNextInvoiceNumber(invoiceType, year);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/invoices/change-buyer")
    public boolean changeBuyer(@RequestParam String invoiceOID, @RequestParam String buyerOID) throws SException {
        return invoiceService.changeBuyer(invoiceOID, buyerOID);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/invoices")
    public Invoice createNew(@RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/invoices/{invoiceOid}")
    public Invoice modify(@PathVariable String invoiceOid, @RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.modifyObject(invoiceOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/invoices")
    public boolean delete(@RequestBody List<Invoice> objects) throws SException {
        return invoiceService.deleteObjects(objects);
    }

    @RequestMapping("/invoices/getXML/{invoiceOid}")
    public XmlValue getXMLForInvoice(@PathVariable String invoiceOid) throws SException {
        return new XmlValue(invoiceService.getXMLForInvoice(invoiceOid));
    }

    @RequestMapping("/invoices/registration/{invoiceOid}")
    public boolean registrationOfInvoice(@PathVariable String invoiceOid) throws SException {
        return invoiceService.registrationOfInvoice(invoiceOid);
    }

    @RequestMapping("/invoices/registration/pdf/{invoiceOid}")
    public ResponseEntity<byte[]> getWorkOrderPDF(@PathVariable String invoiceOid) throws SException {
        InputStream in = null;
        File file = this.invoiceService.downloadFile(invoiceOid);
        try {
            in = new FileInputStream(file);
            return new ResponseEntity<byte[]>(IOUtils.toByteArray(in), HttpStatus.CREATED);
        } catch (IOException ex) {
            throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
            }
        }
    }
}

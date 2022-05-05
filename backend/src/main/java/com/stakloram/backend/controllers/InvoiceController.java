package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping("/invoices/number")
    public int getNextInvoiceNumber(@RequestParam InvoiceType invoiceType, @RequestParam int year) throws SException {
        return invoiceService.getNextInvoiceNumber(invoiceType, year);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/invoices")
    public Invoice createNew(@RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/invoices/{invoiceOid}")
    public Invoice modify(@PathVariable String invoiceOid, @RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.modifyObject(invoiceOid, object);
    }
}

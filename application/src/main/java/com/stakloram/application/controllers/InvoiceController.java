package com.stakloram.application.controllers;

import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.Invoice;
import com.stakloram.application.models.Invoice.InvoiceType;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.services.impl.InvoiceService;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class InvoiceController {

    Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    @Autowired
    InvoiceService invoiceService;

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/invoices/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return invoiceService.searchObjects(searchObject, skip, top);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping("/invoices/{invoiceOid}")
    public Invoice getById(@PathVariable String invoiceOid) throws SException {
        return (Invoice) invoiceService.getObjectByOID(invoiceOid);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping("/invoices/invoiceItemDescriptions")
    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        return invoiceService.getAllInvoiceItemDescriptions();
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping("/invoices/number")
    public int getNextInvoiceNumber(@RequestParam InvoiceType invoiceType, @RequestParam int year) throws SException {
        return invoiceService.getNextInvoiceNumber(invoiceType, year);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/invoices")
    public Invoice createNew(@RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.createNewObject(object);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.PUT, value = "/invoices/{invoiceOid}")
    public Invoice modify(@PathVariable String invoiceOid, @RequestBody Invoice object) throws SException {
        return (Invoice) this.invoiceService.modifyObject(invoiceOid, object);
    }

//    @PreAuthorize("hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, value = "/invoices")
    public boolean delete(@RequestBody List<Invoice> objects) throws SException {
        return invoiceService.deleteObjects(objects);
    }
}
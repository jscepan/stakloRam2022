package com.stakloram.application.controllers;

import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.Buyer;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.services.impl.BuyerService;
import java.util.List;
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
public class BuyerController {

    Logger logger = LoggerFactory.getLogger(BuyerController.class);

    @Autowired
    BuyerService buyerService;

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/buyers/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return buyerService.searchObjects(searchObject, skip, top);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping("/buyers/{buyerOid}")
    public Buyer getById(@PathVariable String buyerOid) throws SException {
        return (Buyer) buyerService.getObjectByOID(buyerOid);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/buyers")
    public Buyer createNew(@RequestBody Buyer object) throws SException {
        return (Buyer) this.buyerService.createNewObject(object);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.PUT, value = "/buyers/{buyerOid}")
    public Buyer modify(@PathVariable String buyerOid, @RequestBody Buyer object) throws SException {
        return (Buyer) this.buyerService.modifyObject(buyerOid, object);
    }

//    @PreAuthorize("hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, value = "/buyers")
    public boolean delete(@RequestBody List<Buyer> objects) throws SException {
        return this.buyerService.deleteObjects(objects);
    }
}

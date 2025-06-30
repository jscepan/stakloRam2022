package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.BuyerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController()
public class BuyerController {

    @Autowired
    BuyerService buyerService;

    @RequestMapping(method = RequestMethod.POST, value = "/buyers/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return buyerService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/buyers/{buyerOid}")
    public Buyer getById(@PathVariable String buyerOid) throws SException {
        return (Buyer) buyerService.getObjectByOID(buyerOid);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/buyers")
    public Buyer createNew(@RequestBody Buyer object) throws SException {
        return (Buyer) this.buyerService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/buyers/{buyerOid}")
    public Buyer modify(@PathVariable String buyerOid, @RequestBody Buyer object) throws SException {
        return (Buyer) this.buyerService.modifyObject(buyerOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/buyers")
    public boolean delete(@RequestBody List<Buyer> objects) throws SException {
        return this.buyerService.deleteObjects(objects);
    }
}

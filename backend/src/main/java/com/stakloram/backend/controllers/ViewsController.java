package com.stakloram.backend.controllers;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Debtor;
import com.stakloram.backend.services.impl.ViewsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController()
public class ViewsController {

    @Autowired
    ViewsService viewsService;

    @RequestMapping(method = RequestMethod.GET, value = "/views/debtors")
    public List<Debtor> getAllDebtors() throws SException {
        return viewsService.getAllDebtors();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/views/debtors/{buyerOid}")
    public Debtor getDebtor(@PathVariable String buyerOid) throws SException {
        return viewsService.getDebtor(buyerOid);
    }
}

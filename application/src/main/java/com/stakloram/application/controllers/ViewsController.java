package com.stakloram.application.controllers;

import com.stakloram.application.exception.SException;
import com.stakloram.application.models.Debtor;
import com.stakloram.application.services.impl.ViewsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class ViewsController {

    @Autowired
    ViewsService viewsService;

//    @PreAuthorize("hasRole('admin')")
    @RequestMapping(method = RequestMethod.GET, value = "/views/debtors")
    public List<Debtor> getAllDebtors() throws SException {
        return viewsService.getAllDebtors();
    }

//    @PreAuthorize("hasRole('admin')")
    @RequestMapping(method = RequestMethod.GET, value = "/views/debtors/{buyerOid}")
    public Debtor getDebtor(@PathVariable String buyerOid) throws SException {
        return viewsService.getDebtor(buyerOid);
    }
}

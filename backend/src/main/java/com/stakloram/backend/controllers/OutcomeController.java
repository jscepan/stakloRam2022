package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.Outcome;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.OutcomeService;
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
public class OutcomeController {

    Logger logger = LoggerFactory.getLogger(OutcomeController.class);

    @Autowired
    OutcomeService outcomeService;

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/outcomes/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return outcomeService.searchObjects(searchObject, skip, top);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping("/outcomes/{outcomeOid}")
    public Outcome getById(@PathVariable String outcomeOid) throws SException {
        return (Outcome) outcomeService.getObjectByOID(outcomeOid);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.POST, value = "/outcomes")
    public Outcome createNew(@RequestBody Outcome object) throws SException {
        return (Outcome) this.outcomeService.createNewObject(object);
    }

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.PUT, value = "/outcomes/{outcomeOid}")
    public Outcome modify(@PathVariable String outcomeOid, @RequestBody Outcome object) throws SException {
        return (Outcome) this.outcomeService.modifyObject(outcomeOid, object);
    }

//    @PreAuthorize("hasAnyRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, value = "/outcomes")
    public boolean delete(@RequestBody List<Outcome> objects) throws SException {
        return this.outcomeService.deleteObjects(objects);
    }
}

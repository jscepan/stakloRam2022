package com.stakloram.backend.controllers;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.Service;
import com.stakloram.backend.services.impl.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class ServiceController {

    @Autowired
    ServiceService serviceService;

    @RequestMapping(method = RequestMethod.POST, value = "/services/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return serviceService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/services/{serviceOid}")
    public Service getById(@PathVariable String serviceOid) throws SException {
        return (Service) serviceService.getObjectByOID(serviceOid);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/services")
    public Service createNew(@RequestBody Service object) throws SException {
        return (Service) this.serviceService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/services/{serviceOid}")
    public Service modify(@PathVariable String serviceOid, @RequestBody Service object) throws SException {
        return (Service) this.serviceService.modifyObject(serviceOid, object);
    }
}

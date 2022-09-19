package com.stakloram.application.controllers;

import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.Country;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.services.impl.CountryService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class CountryController {

    Logger logger = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    CountryService countryService;

    @RequestMapping(method = RequestMethod.POST, value = "/countries/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return countryService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/countries/{countryOid}")
    public Country getById(@PathVariable String countryOid) throws SException {
        return (Country) countryService.getObjectByOID(countryOid);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/countries")
    public Country createNew(@RequestBody Country object) throws SException {
        return (Country) this.countryService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/countries/{countryOid}")
    public Country modify(@PathVariable String countryOid, @RequestBody Country object) throws SException {
        return (Country) this.countryService.modifyObject(countryOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/countries")
    public boolean delete(@RequestBody List<Country> objects) throws SException {
        return this.countryService.deleteObjects(objects);
    }

}

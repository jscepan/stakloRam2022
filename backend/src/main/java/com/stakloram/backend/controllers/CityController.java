package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.City;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.CityService;
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
public class CityController {

    @Autowired
    CityService cityService;

    @RequestMapping(method = RequestMethod.POST, value = "/cities/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return cityService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/cities/{cityOid}")
    public City getById(@PathVariable String cityOid) throws SException {
        return (City) cityService.getObjectByOID(cityOid);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/cities")
    public City createNew(@RequestBody City object) throws SException {
        return (City) this.cityService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/cities/{cityOid}")
    public City modify(@PathVariable String cityOid, @RequestBody City object) throws SException {
        return (City) this.cityService.modifyObject(cityOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/cities")
    public boolean delete(@RequestBody List<City> objects) throws SException {
        return this.cityService.deleteObjects(objects);
    }
}

package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.IncomeService;
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
public class IncomeController {

    @Autowired
    IncomeService incomeService;

    @RequestMapping(method = RequestMethod.POST, value = "/incomes/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return incomeService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/incomes/{incomeOid}")
    public Income getById(@PathVariable String incomeOid) throws SException {
        return (Income) incomeService.getObjectByOID(incomeOid);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/incomes")
    public Income createNew(@RequestBody Income object) throws SException {
        return (Income) this.incomeService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/incomes/{incomeOid}")
    public Income modify(@PathVariable String incomeOid, @RequestBody Income object) throws SException {
        return (Income) this.incomeService.modifyObject(incomeOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/incomes")
    public boolean delete(@RequestBody List<Income> objects) throws SException {
        return this.incomeService.deleteObjects(objects);
    }
}

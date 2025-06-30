package com.stakloram.backend.controllers;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.HistoryService;
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
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @RequestMapping(method = RequestMethod.POST, value = "/histories/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        // TODO
        return historyService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/histories/{historyOid}")
    public History getById(@PathVariable String historyOid) throws SException {
        return (History) historyService.getObjectByOID(historyOid);
    }

}

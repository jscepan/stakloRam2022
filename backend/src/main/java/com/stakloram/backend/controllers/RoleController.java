package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class RoleController {
    
    @Autowired
    RoleService roleService;

    @RequestMapping(method = RequestMethod.POST, value = "/roles/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return roleService.searchObjects(searchObject, skip, top);
    }
}

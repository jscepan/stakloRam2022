package com.stakloram.backend.controllers;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.WorkOrderService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class WorkOrderController {

    @Autowired
    WorkOrderService workOrderService;

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return workOrderService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/workorders/{workOrderOid}")
    public WorkOrder getById(@PathVariable String workOrderOid) throws SException {
        return (WorkOrder) workOrderService.getObjectByOID(workOrderOid);
    }

    @RequestMapping("/workorders/workOrderItemDescriptions")
    public Set<String> getAllWorkOrderItemDescriptions() throws SException {
        return workOrderService.getAllWorkOrderItemDescriptions();
    }

    @RequestMapping("/workorders/number")
    public long getNextWorkOrderNumber(@RequestParam int year) throws SException {
        return workOrderService.getNextWorkOrderNumber(year);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/workorders")
    public WorkOrder createNew(@RequestBody WorkOrder object) throws SException {
        return (WorkOrder) this.workOrderService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/workorders/{workOrderOid}")
    public WorkOrder modify(@PathVariable String workOrderOid, @RequestBody WorkOrder object) throws SException {
        return (WorkOrder) this.workOrderService.modifyObject(workOrderOid, object);
    }

}

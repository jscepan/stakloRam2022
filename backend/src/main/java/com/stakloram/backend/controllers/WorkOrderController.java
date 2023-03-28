package com.stakloram.backend.controllers;

import com.amazonaws.util.IOUtils;
import static com.stakloram.backend.constants.Constants.IMAGE_DIRECTORY;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.WorkOrderService;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController()
public class WorkOrderController {

    @Autowired
    WorkOrderService workOrderService;

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return workOrderService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/workorders/unsettled")
    public List<WorkOrder> getAllUnsettled(@RequestParam String buyerOID) throws SException {
        return workOrderService.getAllUnsettledWorkOrder(buyerOID);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/unsettled")
    public boolean markWorkOrderAsUnsettled(@RequestParam String workOrderOID, @RequestParam boolean settled) throws SException {
        return workOrderService.toggleSettledForWorkOrder(workOrderOID, settled);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/change-buyer")
    public boolean changeBuyer(@RequestParam String workOrderOID, @RequestParam String buyerOID) throws SException {
        return workOrderService.changeBuyer(workOrderOID, buyerOID);
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

    @RequestMapping(method = RequestMethod.DELETE, value = "/workorders")
    public boolean delete(@RequestBody List<WorkOrder> objects) throws SException {
        return this.workOrderService.deleteObjects(objects);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/{workOrderOid}/files")
    public WorkOrder uploadFile(@PathVariable String workOrderOid, @RequestParam("pdfFile") MultipartFile pdfFile) throws SException {
        return this.workOrderService.uploadFile(workOrderOid, pdfFile);
    }

    @RequestMapping("/workorders/pdf/{workOrderOID}")
    public ResponseEntity<byte[]> getWorkOrderPDF(@PathVariable String workOrderOID) throws SException {
        InputStream in = null;
        File file = this.workOrderService.downloadFile(workOrderOID);
        try {
            in = new FileInputStream(file);
            return new ResponseEntity<byte[]>(IOUtils.toByteArray(in), HttpStatus.CREATED);
        } catch (IOException ex) {
            throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                throw new SException(UserMessage.getLocalizedMessage("fileNotFound"));
            }
        }
    }
}

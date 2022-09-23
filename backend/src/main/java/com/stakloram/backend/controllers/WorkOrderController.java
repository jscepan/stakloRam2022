package com.stakloram.backend.controllers;

import com.amazonaws.util.IOUtils;
import static com.stakloram.backend.constants.Constants.IMAGE_DIRECTORY;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.services.impl.WorkOrderService;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import static java.nio.file.Files.copy;
import java.nio.file.Path;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController()
public class WorkOrderController {

    Logger logger = LoggerFactory.getLogger(WorkOrderController.class);

    @Autowired
    WorkOrderService workOrderService;

    @RequestMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getWorkOrderImage(@PathVariable String imageName) throws SException, IOException {
        File file = new File(IMAGE_DIRECTORY + "/" + imageName);
        if (!file.exists()) {
            throw new FileNotFoundException();
        }
        InputStream in = new FileInputStream(file);
        return new ResponseEntity<>(IOUtils.toByteArray(in), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/images")
    public List<String> upload(@RequestParam("files") List<MultipartFile> multipartFiles) throws SException, IOException {
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String filename = "workOrder_" + LocalDate.now() + "_" + LocalTime.now().getHour() + "_" + LocalTime.now().getMinute() + "_" + LocalTime.now().getSecond() + "_" + Helper.generateRandomString(15) + "." + Helper.getFileExtension(file);
            File f = new File(IMAGE_DIRECTORY);
            if (!(f.exists() && f.isDirectory())) {
                f.mkdir();
            }
            Path fileStorage = get(IMAGE_DIRECTORY, filename).toAbsolutePath().normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
            fileNames.add(filename);
        }
        return fileNames;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/workorders/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return workOrderService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/workorders/unsettled")
    public List<WorkOrder> getAllUnsettled(@RequestParam String buyerOID) throws SException {
        return workOrderService.getAllUnsettledWorkOrder(buyerOID);
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

//    @PreAuthorize("hasAnyRole('admin','backoffice')")
    @RequestMapping(method = RequestMethod.PUT, value = "/workorders/{workOrderOid}")
    public WorkOrder modify(@PathVariable String workOrderOid, @RequestBody WorkOrder object) throws SException {
        return (WorkOrder) this.workOrderService.modifyObject(workOrderOid, object);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/workorders")
    public boolean delete(@RequestBody List<WorkOrder> objects) throws SException {
        return this.workOrderService.deleteObjects(objects);
    }
}

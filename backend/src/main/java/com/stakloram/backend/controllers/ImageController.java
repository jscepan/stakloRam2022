package com.stakloram.backend.controllers;

import com.stakloram.backend.exception.SException;
import com.stakloram.backend.util.Helper;
import java.io.IOException;
import static java.nio.file.Files.copy;
import java.nio.file.Path;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController()
public class ImageController {

    Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    @RequestMapping(method = RequestMethod.POST, value = "/images")
    public List<String> upload(@RequestParam("files") List<MultipartFile> multipartFiles) throws SException, IOException {
        String dir = System.getProperty("user.home") + "/Downloads/uploads/";
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String filename = "workOrder_" + LocalDate.now() + "_" + LocalTime.now() + "_" + Helper.generateRandomString(15) + "." + Helper.getFileExtension(file);
            Path fileStorage = get(dir, filename).toAbsolutePath().normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
            fileNames.add(filename);
        }
        return fileNames;
    }

}

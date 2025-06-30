package com.stakloram.backend.controllers;

import com.amazonaws.util.IOUtils;
import static com.stakloram.backend.constants.Constants.IMAGE_DIRECTORY;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import static java.nio.file.Files.copy;
import java.nio.file.Path;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController()
public class ImagesController {

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
}

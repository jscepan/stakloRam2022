package com.stakloram.backend.util;

import com.ironsoftware.ironpdf.PdfDocument;
import com.stakloram.backend.models.BaseModel;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import com.stakloram.backend.models.WorkOrder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.logging.Level;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.xhtmlrenderer.layout.SharedContext;
import org.xhtmlrenderer.pdf.ITextRenderer;

public class Helper {

    Logger logger = LoggerFactory.getLogger(Helper.class);

    public static java.sql.Date convertLocalDateTimeToDateTime(LocalDateTime date) {
        return Date.valueOf(date.toLocalDate());
    }

    public static LocalDateTime convertStringToLocalDateTime(String date) {
        return Timestamp.valueOf(date).toLocalDateTime();
    }

    public static java.sql.Date convertLocalDateToSqlDate(LocalDate date) {
        return Date.valueOf(date);
    }

    public static java.sql.Timestamp convertLocalDateToSqlTime(LocalDateTime date) {
        return Timestamp.valueOf(date);
    }

    public static String readFromFile(String filePath) {
        BufferedReader reader = null;
        String data = "";
        try {
            FileInputStream fileInputStream = new FileInputStream(filePath);
            reader = new BufferedReader(new InputStreamReader(fileInputStream, StandardCharsets.UTF_8));
            String thisLine = null;
            while ((thisLine = reader.readLine()) != null) {
                data += thisLine;
            }
            reader.close();
        } catch (FileNotFoundException ex) {
            LoggerFactory.getLogger(Helper.class).error("", ex);
        } catch (IOException ex) {
            LoggerFactory.getLogger(Helper.class).error("", ex);
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException ex) {
                LoggerFactory.getLogger(Helper.class).error("", ex);
            }
        }
        return data;
    }

    public static Map<Action, List<? extends BaseModel>> findDifferenceBetweenLists(List<? extends BaseModel> newList, List<? extends BaseModel> previousList) {
        Map<Action, List<? extends BaseModel>> difference = new HashMap<>();
        List<BaseModel> listForCreate = new ArrayList<>();
        List<BaseModel> listForModify = new ArrayList<>();

        for (BaseModel newModel : newList) {
            boolean isFound = false;
            for (BaseModel oldModel : previousList) {
                if (oldModel.getOid().equals(newModel.getOid())) {
                    isFound = true;
                    previousList.remove(oldModel);
                    listForModify.add(newModel);
                    break;
                }
            }
            if (isFound == false) {
                listForCreate.add(newModel);
            }
        }

        difference.put(Action.FOR_CREATE, listForCreate);
        difference.put(Action.FOR_UPDATE, listForModify);
        difference.put(Action.FOR_DELETE, previousList);
        return difference;
    }

    public static String generateRandomString(int n) {
        byte[] array = new byte[256];
        new Random().nextBytes(array);
        String randomString = new String(array, Charset.forName("UTF-8"));
        StringBuilder r = new StringBuilder();
        for (int k = 0; k < randomString.length(); k++) {
            char ch = randomString.charAt(k);
            if (((ch >= 'a' && ch <= 'z')
                    || (ch >= 'A' && ch <= 'Z')
                    || (ch >= '0' && ch <= '9'))
                    && (n > 0)) {
                r.append(ch);
                n--;
            }
        }
        return r.toString();
    }

    public static String getFileExtension(MultipartFile file) {
        try {
            Optional<String> value = Optional.ofNullable(file.getOriginalFilename())
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(file.getOriginalFilename().lastIndexOf(".") + 1));

            return value.get();
        } catch (Exception e) {
            return "";
        }
    }

    public static File mergePDFs(List<File> allPdfs) {
        try {
            PDFMergerUtility pdfmerger = new PDFMergerUtility();
            pdfmerger.setDestinationFileName("newMerged.pdf");
            for (File file : allPdfs) {
                pdfmerger.addSource(file);
                pdfmerger.mergeDocuments(MemoryUsageSetting.setupTempFileOnly());
            }
            return new File("newMerged.pdf");
        } catch (IOException e) {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }

    public static String convertFileToBase64(File mergedPDF) throws IOException {
        byte[] bytes = Files.readAllBytes(mergedPDF.toPath());
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static File createNewPdfForHtmlPage(String html) {
        System.out.println("html");
        System.out.println(html);
        File pdfFile = new File("new_pdf.pdf");
        OutputStream outputStream = null;
        try {
            ITextRenderer renderer = new ITextRenderer();
            SharedContext sharedContext = renderer.getSharedContext();
            sharedContext.setPrint(true);
            sharedContext.setInteractive(false);
            renderer.setDocumentFromString(html);
            renderer.layout();
            outputStream = new FileOutputStream(pdfFile);
            renderer.createPDF(outputStream);
        } catch (FileNotFoundException ex) {
            java.util.logging.Logger.getLogger(Helper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                outputStream.close();
            } catch (IOException ex) {
                java.util.logging.Logger.getLogger(Helper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return pdfFile;
    }

    public static String getDisplayValueForWorkOrderNumber(WorkOrder wo) {
        return wo.getNumber() + "/" + wo.getDateOfCreate().getYear();
    }

    public static String getDisplayValueForWorkOrderDate(WorkOrder wo) {
        return wo.getDateOfCreate().getDayOfMonth() + "." + wo.getDateOfCreate().getMonthValue() + "." + wo.getDateOfCreate().getYear();
    }

    public enum Action {
        FOR_CREATE, FOR_UPDATE, FOR_DELETE;
    }
}

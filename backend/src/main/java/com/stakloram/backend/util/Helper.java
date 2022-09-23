package com.stakloram.backend.util;

import com.stakloram.backend.models.BaseModel;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class Helper {

    Logger logger = LoggerFactory.getLogger(Helper.class);

    public static java.sql.Date convertLocalDateTimeToDateTime(LocalDateTime date) {
        return Date.valueOf(date.toLocalDate());
    }

    public static LocalDateTime convertStringToLocalDateTime(String date) {
        return LocalDateTime.parse(date);
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
            reader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "UTF-8"));
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

    public enum Action {
        FOR_CREATE, FOR_UPDATE, FOR_DELETE;
    }
}

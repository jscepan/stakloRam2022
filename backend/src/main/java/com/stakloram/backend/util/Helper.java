package com.stakloram.backend.util;

import com.stakloram.backend.models.BaseModel;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Helper {

    public static java.sql.Date convertLocalDateTimeToDateTime(LocalDateTime date) {
        return Date.valueOf(date.toLocalDate());
    }

    public static LocalDateTime convertStringToLocalDateTime(String date) {
        return LocalDateTime.parse(date);
    }

    public static java.sql.Date convertLocalDateToSqlDate(LocalDate date) {
        return Date.valueOf(date);
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
            Logger.getLogger(Helper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(Helper.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                reader.close();
            } catch (IOException ex) {
                Logger.getLogger(Helper.class.getName()).log(Level.SEVERE, null, ex);
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

    public enum Action {
        FOR_CREATE, FOR_UPDATE, FOR_DELETE;
    }
}

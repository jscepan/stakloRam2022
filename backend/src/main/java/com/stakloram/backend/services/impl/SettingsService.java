package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stakloram.backend.constants.Constants;
import com.stakloram.backend.models.Settings;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    public Settings getSettings() {
        String dataFromFile = Helper.readFromFile(Constants.SETTINGS_FILE);
        ObjectMapper objectMapper = new ObjectMapper();
        Settings settings = null;
        try {
            settings = objectMapper.readValue(dataFromFile, Settings.class);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(SettingsService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return settings;
    }

    public Settings modify(Settings settings) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(Constants.SETTINGS_FILE), settings);
        } catch (IOException ex) {
            return null;
        }
        return settings;
    }
}

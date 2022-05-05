package com.stakloram.backend.controllers;

import com.stakloram.backend.models.Settings;
import com.stakloram.backend.services.impl.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class SettingsController {
    @Autowired
    SettingsService settingsService;

    @RequestMapping("/settings")
    public Settings getSettings() {
        return this.settingsService.getSettings();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/settings")
    public Settings modify(@RequestBody Settings object) {
        return this.settingsService.modify(object);
    }
}

package com.stakloram.backend.services.impl;

import com.stakloram.backend.models.Settings;
import com.stakloram.backend.services.impl.builder.impl.SettingsBuilder;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    private final SettingsBuilder settingsBuilder = new SettingsBuilder();

    public Settings getSettings() {
        return this.settingsBuilder.getSettings();
    }

    public Settings modify(Settings settings) {
        return this.settingsBuilder.modify(settings);
    }
}

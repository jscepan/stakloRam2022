package com.stakloram.backend.models;

import java.util.Locale;
import java.util.ResourceBundle;
import org.springframework.context.i18n.LocaleContextHolder;

public class UserMessage {

    private static final String RESOURCE = "messages";

    public static String getLocalizedMessage(String key, Object... params) {
        Locale locale = new Locale("rs");
        // Locale locale = MTContext.getContext().getLocale();
        // Locale locale = new Locale("en");
        LocaleContextHolder.setLocale(locale);
        String str = ResourceBundle.getBundle(RESOURCE, LocaleContextHolder.getLocale()).getString(key);
        try {

        } catch (Exception e) {
            return "";
        }
        return str;
    }
}

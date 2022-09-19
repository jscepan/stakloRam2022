package com.stakloram.application.models;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;
import org.springframework.context.i18n.LocaleContextHolder;

public class UserMessage {

    private static final String RESOURCE = "messages";

    public static String getLocalizedMessage(String key, Object... params) {
        Locale locale = new Locale("rs");
        // Locale locale = MTContext.getContext().getLocale();

//        Locale locale = new Locale("en");
        LocaleContextHolder.setLocale(locale);
//        System.out.println("111" + LocaleContextHolder.getLocale());
        String str = ResourceBundle.getBundle(RESOURCE, LocaleContextHolder.getLocale()).getString(key);
        try {

        } catch (Exception e) {
//            String str = ResourceBundle.getBundle(RESOURCE, locale).getString(key);
//            return MessageFormat.format(str, params);
            return "";
        }
        return str;
    }
}

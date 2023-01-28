package com.stakloram.backend.util;

import org.apache.commons.validator.EmailValidator;

public class DataChecker {

    public static boolean isNull(Object object) {
        return object == null;
    }

    public static boolean isNotNull(Object object) {
        return object != null;
    }

    public static boolean isDecimal(String number) {
        if (number == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(number);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

    public static boolean isLong(String number) {
        if (number == null) {
            return false;
        }
        try {
            long d = Long.parseLong(number);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

    public static boolean isEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }

    public static boolean minTextLength(String text, int min) {
        return text != null && text.length() >= min;
    }

    public static boolean maxTextLength(String text, int max) {
        return text != null && text.length() <= max;
    }

    public static double roundOnDigits(double number, int digits) {
        double multipicationFactor = Math.pow(10, digits);
        double interestedInZeroDPs = number * multipicationFactor;
        return Math.round(interestedInZeroDPs) / multipicationFactor;
    }
}

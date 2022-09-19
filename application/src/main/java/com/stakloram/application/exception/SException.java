package com.stakloram.application.exception;

public class SException extends Exception {

    public SException(String message) {
        super(message);
    }

    public SException(String message, Throwable cause) {
        super(message, cause);
    }
}

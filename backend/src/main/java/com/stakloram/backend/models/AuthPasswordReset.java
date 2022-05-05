package com.stakloram.backend.models;

public class AuthPasswordReset {

    private String newPassword;

    public AuthPasswordReset() {
    }

    public AuthPasswordReset(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}

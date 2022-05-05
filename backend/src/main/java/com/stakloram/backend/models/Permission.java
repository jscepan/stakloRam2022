package com.stakloram.backend.models;

public class Permission {

    private String subject;
    private String permission;
    private String effect;

    public Permission() {
    }

    public Permission(String subject, String permission, String effect) {
        this.subject = subject;
        this.permission = permission;
        this.effect = effect;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }

    @Override
    public String toString() {
        return "Permission{" + "subject=" + subject + ", permission=" + permission + ", effect=" + effect + '}';
    }
}

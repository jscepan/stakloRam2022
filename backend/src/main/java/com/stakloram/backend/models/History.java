package com.stakloram.backend.models;

import java.time.LocalDateTime;

public class History extends BaseModel {

    private Action action;
    private String objectType;
    private String previousValue;
    private String newValue;
    private LocalDateTime time;
    private User user;

    public History(String oid) {
        super(oid);
    }

    public History(Long id) {
        super(id);
    }

    public History(Action action, String objectType, String previousValue, String newValue, LocalDateTime time, User user, String oid) {
        super(oid);
        this.action = action;
        this.objectType = objectType;
        this.previousValue = previousValue;
        this.newValue = newValue;
        this.time = time;
        this.user = user;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public String getPreviousValue() {
        return previousValue;
    }

    public void setPreviousValue(String previousValue) {
        this.previousValue = previousValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public enum Action {
        CREATE, UPDATE, DELETE
    }

    @Override
    public String toString() {
        return "History{" + "action=" + action + ", objectType=" + objectType + ", previousValue=" + previousValue + ", newValue=" + newValue + ", time=" + time + ", user=" + user + '}';
    }
}

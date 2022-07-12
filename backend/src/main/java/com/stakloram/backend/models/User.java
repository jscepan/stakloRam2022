package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.List;

public class User extends BaseModel {

    private String displayName;
    private String username;
    private String password;
    private boolean enabled;
    private String fullName;
    private String email;
    private String language;
    private List<Role> roles = new ArrayList<>();

    public User() {
    }

    public User(String oid) {
        super(oid);
    }

    public User(Long id) {
        super(id);
    }

    public User(String displayName, String username, String password, boolean enabled, String fullName, String email, String language, String oid) {
        super(oid);
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.fullName = fullName;
        this.email = email;
        this.language = language;
    }

    public User(String displayName, String username, String password, boolean enabled, String fullName, String email, String language, Long id) {
        super(id);
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.fullName = fullName;
        this.email = email;
        this.language = language;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" + "displayName=" + displayName + ", username=" + username + ", password=" + password + ", enabled=" + enabled + ", fullName=" + fullName + ", email=" + email + ", language=" + language + ", roles=" + roles + '}';
    }
}

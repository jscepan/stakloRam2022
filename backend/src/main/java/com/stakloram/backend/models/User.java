package com.stakloram.backend.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class User extends BaseModel {

    private String displayName;
    private String username;
    private String password;
    private boolean enabled;
    private String fullName;
    private String email;
    private String language;
    private List<Role> roles = new ArrayList<>();
    private Set<Privilege> privileges = new HashSet<>();

    public User() {
        this.setPrivileges();
    }

    public User(String oid) {
        super(oid);
        this.setPrivileges();
    }

    public User(Long id) {
        super(id);
        this.setPrivileges();
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
        this.setPrivileges();
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
        this.setPrivileges();
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
        this.setPrivileges();
    }

    public Set<Privilege> getPrivileges() {
        return privileges;
    }

    private void setPrivileges() {
        for (Role role : this.getRoles()) {
            this.privileges.add(Privilege.USER_ANY);
            switch (role.getName()) {
                case "admin":
                    this.privileges.add(Privilege.INVOICES_VIEW);
                    this.privileges.add(Privilege.INVOICE_VIEW);
                    this.privileges.add(Privilege.INVOICE_CREATE);
                    this.privileges.add(Privilege.INVOICE_MODIFY);
                    this.privileges.add(Privilege.INVOICE_DELETE);
                    this.privileges.add(Privilege.INCOMES_VIEW);
                    this.privileges.add(Privilege.INCOME_VIEW);
                    this.privileges.add(Privilege.INCOME_CREATE);
                    this.privileges.add(Privilege.INCOME_MODIFY);
                    this.privileges.add(Privilege.INCOME_DELETE);
                    this.privileges.add(Privilege.OUTCOMES_VIEW);
                    this.privileges.add(Privilege.OUTCOME_VIEW);
                    this.privileges.add(Privilege.OUTCOME_CREATE);
                    this.privileges.add(Privilege.OUTCOME_MODIFY);
                    this.privileges.add(Privilege.OUTCOME_DELETE);
                    this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_CREATE);
                    this.privileges.add(Privilege.WORK_ORDER_MODIFY);
                    this.privileges.add(Privilege.WORK_ORDER_DELETE);
                    this.privileges.add(Privilege.DEBTORS_VIEW);
                    this.privileges.add(Privilege.DEBTOR_VIEW);
                    this.privileges.add(Privilege.BUYERS_VIEW);
                    this.privileges.add(Privilege.BUYER_CREATE);
                    this.privileges.add(Privilege.BUYER_MODIFY);
                    this.privileges.add(Privilege.BUYER_DELETE);
                    this.privileges.add(Privilege.COUNTRIES_VIEW);
                    this.privileges.add(Privilege.COUNTRY_CREATE);
                    this.privileges.add(Privilege.COUNTRY_MODIFY);
                    this.privileges.add(Privilege.COUNTRY_DELETE);
                    this.privileges.add(Privilege.CITIES_VIEW);
                    this.privileges.add(Privilege.CITY_CREATE);
                    this.privileges.add(Privilege.CITY_MODIFY);
                    this.privileges.add(Privilege.CITY_DELETE);
                    this.privileges.add(Privilege.USERS_VIEW);
                    this.privileges.add(Privilege.USER_CREATE);
                    this.privileges.add(Privilege.USER_MODIFY);
                    this.privileges.add(Privilege.USER_DELETE);
                    this.privileges.add(Privilege.SETTINGS_VIEW);
                    this.privileges.add(Privilege.SETTINGS_MODIFY);
                    break;
                case "worker":
                    this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_VIEW);
                    this.privileges.add(Privilege.BUYERS_VIEW);
                    this.privileges.add(Privilege.COUNTRIES_VIEW);
                    this.privileges.add(Privilege.CITIES_VIEW);
                    break;
                case "worker_chief":
                    this.privileges.add(Privilege.INVOICES_VIEW);
                    this.privileges.add(Privilege.INVOICE_VIEW);
                    this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_CREATE);
                    this.privileges.add(Privilege.WORK_ORDER_MODIFY);
                    this.privileges.add(Privilege.BUYERS_VIEW);
                    this.privileges.add(Privilege.BUYER_CREATE);
                    this.privileges.add(Privilege.BUYER_MODIFY);
                    this.privileges.add(Privilege.COUNTRIES_VIEW);
                    this.privileges.add(Privilege.COUNTRY_CREATE);
                    this.privileges.add(Privilege.COUNTRY_MODIFY);
                    this.privileges.add(Privilege.CITIES_VIEW);
                    this.privileges.add(Privilege.CITY_CREATE);
                    this.privileges.add(Privilege.CITY_MODIFY);
                    break;
                case "backoffice":
                    this.privileges.add(Privilege.INVOICES_VIEW);
                    this.privileges.add(Privilege.INVOICE_VIEW);
                    this.privileges.add(Privilege.INVOICE_CREATE);
                    this.privileges.add(Privilege.INVOICE_MODIFY);
                    this.privileges.add(Privilege.INCOMES_VIEW);
                    this.privileges.add(Privilege.INCOME_VIEW);
                    this.privileges.add(Privilege.INCOME_CREATE);
                    this.privileges.add(Privilege.INCOME_MODIFY);
                    this.privileges.add(Privilege.OUTCOMES_VIEW);
                    this.privileges.add(Privilege.OUTCOME_VIEW);
                    this.privileges.add(Privilege.OUTCOME_CREATE);
                    this.privileges.add(Privilege.OUTCOME_MODIFY);
                    this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_VIEW);
                    this.privileges.add(Privilege.WORK_ORDER_CREATE);
                    this.privileges.add(Privilege.WORK_ORDER_MODIFY);
                    this.privileges.add(Privilege.DEBTORS_VIEW);
                    this.privileges.add(Privilege.BUYERS_VIEW);
                    this.privileges.add(Privilege.BUYER_CREATE);
                    this.privileges.add(Privilege.BUYER_MODIFY);
                    this.privileges.add(Privilege.COUNTRIES_VIEW);
                    this.privileges.add(Privilege.COUNTRY_CREATE);
                    this.privileges.add(Privilege.COUNTRY_MODIFY);
                    this.privileges.add(Privilege.CITIES_VIEW);
                    this.privileges.add(Privilege.CITY_CREATE);
                    this.privileges.add(Privilege.CITY_MODIFY);
                    this.privileges.add(Privilege.SETTINGS_VIEW);
                    break;
            }
        }
        this.getRoles().forEach(role -> System.out.println(role));
    }

    @Override
    public String toString() {
        return "User{" + "displayName=" + displayName + ", username=" + username + ", enabled=" + enabled + ", fullName=" + fullName + ", email=" + email + ", language=" + language + ", roles=" + roles + '}';
    }

    public enum Privilege {
        USER_ANY,
        INVOICES_VIEW, INVOICE_VIEW, INVOICE_CREATE, INVOICE_MODIFY, INVOICE_DELETE,
        INCOMES_VIEW, INCOME_VIEW, INCOME_CREATE, INCOME_MODIFY, INCOME_DELETE,
        OUTCOMES_VIEW, OUTCOME_VIEW, OUTCOME_CREATE, OUTCOME_MODIFY, OUTCOME_DELETE,
        WORK_ORDERS_VIEW, WORK_ORDER_VIEW, WORK_ORDER_CREATE, WORK_ORDER_MODIFY, WORK_ORDER_DELETE,
        DEBTORS_VIEW, DEBTOR_VIEW,
        BUYERS_VIEW, BUYER_CREATE, BUYER_MODIFY, BUYER_DELETE,
        COUNTRIES_VIEW, COUNTRY_CREATE, COUNTRY_MODIFY, COUNTRY_DELETE,
        CITIES_VIEW, CITY_CREATE, CITY_MODIFY, CITY_DELETE,
        USERS_VIEW, USER_CREATE, USER_MODIFY, USER_DELETE,
        SETTINGS_VIEW, SETTINGS_MODIFY
    }
}

package com.stakloram.backend.models;

import java.util.HashSet;
import java.util.Set;

public class Role extends BaseModel {

    private String name;
    private Set<Privilege> privileges = new HashSet<>();

    public Role(String oid) {
        super(oid);
    }

    public Role(Long id) {
        super(id);
    }

    public Role(String name, String oid) {
        super(oid);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Privilege> getPrivileges() {
        switch (this.getName()) {
            case "admin":
                this.privileges.add(Privilege.INVOICES_VIEW);
                this.privileges.add(Privilege.INVOICE_VIEW);
                this.privileges.add(Privilege.INVOICE_CREATE);
                this.privileges.add(Privilege.INVOICE_DELETE);
                this.privileges.add(Privilege.INCOMES_VIEW);
                this.privileges.add(Privilege.INCOME_VIEW);
                this.privileges.add(Privilege.INCOME_CREATE);
                this.privileges.add(Privilege.INCOME_DELETE);
                this.privileges.add(Privilege.OUTCOMES_VIEW);
                this.privileges.add(Privilege.OUTCOME_VIEW);
                this.privileges.add(Privilege.OUTCOME_CREATE);
                this.privileges.add(Privilege.OUTCOME_DELETE);
                this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_CREATE);
                this.privileges.add(Privilege.WORK_ORDER_DELETE);
                this.privileges.add(Privilege.DEBTORS_VIEW);
                this.privileges.add(Privilege.DEBTOR_VIEW);
                this.privileges.add(Privilege.BUYERS_VIEW);
                this.privileges.add(Privilege.BUYER_CREATE);
                this.privileges.add(Privilege.BUYER_DELETE);
                this.privileges.add(Privilege.COUNTRIES_VIEW);
                this.privileges.add(Privilege.COUNTRY_CREATE);
                this.privileges.add(Privilege.COUNTRY_DELETE);
                this.privileges.add(Privilege.CITIES_VIEW);
                this.privileges.add(Privilege.CITY_CREATE);
                this.privileges.add(Privilege.CITY_DELETE);
                this.privileges.add(Privilege.USERS_VIEW);
                this.privileges.add(Privilege.USER_CREATE);
                this.privileges.add(Privilege.SETTINGS_VIEW);
                this.privileges.add(Privilege.SETTINGS_MODIFY);
                this.privileges.add(Privilege.HISTORIES_VIEW);
                this.privileges.add(Privilege.HISTORY_VIEW);
                break;
            case "worker":
                this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_CREATE);
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
                this.privileges.add(Privilege.BUYERS_VIEW);
                this.privileges.add(Privilege.BUYER_CREATE);
                this.privileges.add(Privilege.COUNTRIES_VIEW);
                this.privileges.add(Privilege.COUNTRY_CREATE);
                this.privileges.add(Privilege.CITIES_VIEW);
                this.privileges.add(Privilege.CITY_CREATE);
                this.privileges.add(Privilege.USERS_VIEW);
                break;
            case "backoffice":
                this.privileges.add(Privilege.INVOICES_VIEW);
                this.privileges.add(Privilege.INVOICE_VIEW);
                this.privileges.add(Privilege.INVOICE_CREATE);
                this.privileges.add(Privilege.INCOMES_VIEW);
                this.privileges.add(Privilege.INCOME_VIEW);
                this.privileges.add(Privilege.INCOME_CREATE);
                this.privileges.add(Privilege.OUTCOMES_VIEW);
                this.privileges.add(Privilege.OUTCOME_VIEW);
                this.privileges.add(Privilege.OUTCOME_CREATE);
                this.privileges.add(Privilege.WORK_ORDERS_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_VIEW);
                this.privileges.add(Privilege.WORK_ORDER_CREATE);
                this.privileges.add(Privilege.DEBTORS_VIEW);
                this.privileges.add(Privilege.BUYERS_VIEW);
                this.privileges.add(Privilege.BUYER_CREATE);
                this.privileges.add(Privilege.COUNTRIES_VIEW);
                this.privileges.add(Privilege.COUNTRY_CREATE);
                this.privileges.add(Privilege.CITIES_VIEW);
                this.privileges.add(Privilege.CITY_CREATE);
                this.privileges.add(Privilege.SETTINGS_VIEW);
                this.privileges.add(Privilege.USERS_VIEW);
                break;
        }
        return this.privileges;
    }

    @Override
    public String toString() {
        return "Role{" + "name=" + name + '}';
    }

    public enum Privilege {
        USER_ANY,
        INVOICES_VIEW, INVOICE_VIEW, INVOICE_CREATE, INVOICE_DELETE,
        INCOMES_VIEW, INCOME_VIEW, INCOME_CREATE, INCOME_DELETE,
        OUTCOMES_VIEW, OUTCOME_VIEW, OUTCOME_CREATE, OUTCOME_DELETE,
        WORK_ORDERS_VIEW, WORK_ORDER_VIEW, WORK_ORDER_CREATE, WORK_ORDER_DELETE,
        DEBTORS_VIEW, DEBTOR_VIEW,
        BUYERS_VIEW, BUYER_CREATE, BUYER_DELETE,
        COUNTRIES_VIEW, COUNTRY_CREATE, COUNTRY_DELETE,
        CITIES_VIEW, CITY_CREATE, CITY_DELETE,
        USERS_VIEW, USER_CREATE,
        SETTINGS_VIEW, SETTINGS_MODIFY,
        HISTORIES_VIEW, HISTORY_VIEW,
    }
}

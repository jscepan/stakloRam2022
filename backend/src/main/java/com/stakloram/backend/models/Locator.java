package com.stakloram.backend.models;

import java.sql.Connection;

public class Locator {

    final Connection CONN;
//    final User CURRENT_USER;

    public Locator(Connection CONN) {
        this.CONN = CONN;
//        this.CURRENT_USER = CURRENT_USER;
    }

    public Connection getCONN() {
        return CONN;
    }
//
//    public User getCURRENT_USER() {
//        return CURRENT_USER;
//    }
}

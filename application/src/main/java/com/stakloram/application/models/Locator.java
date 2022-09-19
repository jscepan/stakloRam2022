package com.stakloram.application.models;

import java.sql.Connection;
import org.springframework.security.core.context.SecurityContextHolder;

public class Locator {

    final Connection CONN;

    public Locator(Connection CONN) {
        this.CONN = CONN;
    }

    public Connection getCONN() {
        return CONN;
    }

    public String getCurrentUserOID() {
        return ((MyUserDetails) (SecurityContextHolder.getContext().getAuthentication()).getPrincipal()).getOid();
    }
}

package com.stakloram.backend.models;

public class DatabaseSettings {

    private String databaseName = "stakloram2022";
    private String databaseDriver = "com.mysql.cj.jdbc.Driver";
    private String databaseUrl = "jdbc:mysql://localhost:3306/";
    private String username = "root";
    private String password = "password";

    public DatabaseSettings() {
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getDatabaseDriver() {
        return databaseDriver;
    }

    public void setDatabaseDriver(String databaseDriver) {
        this.databaseDriver = databaseDriver;
    }

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    public void setDatabaseUrl(String databaseUrl) {
        this.databaseUrl = databaseUrl;
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

    @Override
    public String toString() {
        return "DatabaseSettings{" + "databaseName=" + databaseName + ", databaseDriver=" + databaseDriver + ", databaseUrl=" + databaseUrl + ", username=" + username + ", password=" + password + '}';
    }
}

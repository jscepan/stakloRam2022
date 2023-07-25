package com.stakloram.backend.database;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stakloram.backend.constants.Constants;
import com.stakloram.backend.models.DatabaseSettings;
import com.stakloram.backend.util.Helper;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ConnectionToDatabase {

    static Logger logger = LoggerFactory.getLogger(ConnectionToDatabase.class);

    private static HikariConfig config = new HikariConfig();
    private static HikariDataSource ds;

    public static String DATABASE_NAME;
    private static String DATABASE_DRIVER;
    private static String DATABASE_URL;
    private static String USERNAME;
    private static String PASSWORD;

    // connect database
    public static Connection connect() {
        if (DATABASE_URL == null || DATABASE_NAME == null || USERNAME == null || PASSWORD == null || DATABASE_DRIVER == null) {
            setParameters();
        }
        try {
            Connection conn = ds.getConnection();
            return conn;
        } catch (SQLException ex) {
            return null;
        }
    }

    static {
        if (DATABASE_URL == null || DATABASE_NAME == null || USERNAME == null || PASSWORD == null || DATABASE_DRIVER == null) {
            setParameters();
        }
        config.setJdbcUrl(DATABASE_URL + DATABASE_NAME + "?autoReconnect=true");
        config.setUsername(USERNAME);
        config.setPassword(PASSWORD);
        config.setMinimumIdle(5); // Minimalni broj aktivnih veza
        config.setMaximumPoolSize(20); // Maksimalni broj veza u bazenu
        config.setConnectionTimeout(60000);
        config.setIdleTimeout(30000); // Vrijeme neaktivnosti nakon kojeg se veza zatvara (u milisekundama)
        ds = new HikariDataSource(config);
    }

    private static void setParameters() {
        String dataFromFile = Helper.readFromFile(Constants.DATABASE_SETTINGS_FILE);
        ObjectMapper objectMapper = new ObjectMapper();
        DatabaseSettings databaseSettings = new DatabaseSettings();
        try {
            databaseSettings = objectMapper.readValue(dataFromFile, DatabaseSettings.class);
        } catch (JsonProcessingException ex) {
            try {
                // save settings to file
                objectMapper.writeValue(new File(Constants.DATABASE_SETTINGS_FILE), databaseSettings);
            } catch (IOException ex1) {
            }
        }
        DATABASE_NAME = databaseSettings.getDatabaseName();
        DATABASE_DRIVER = databaseSettings.getDatabaseDriver();
        USERNAME = databaseSettings.getUsername();
        PASSWORD = databaseSettings.getPassword();
        DATABASE_URL = databaseSettings.getDatabaseUrl();
    }
}

package com.stakloram.backend.database;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stakloram.backend.constants.Constants;
import com.stakloram.backend.models.DatabaseSettings;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.util.Helper;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ConnectionToDatabase {

    static Logger logger = LoggerFactory.getLogger(ConnectionToDatabase.class);

    public static final String DATABASE_NAME = "stakloram2022";
    private static String DATABASE_DRIVER;
    private static String USERNAME;
    private static String PASSWORD;
    private static String URL;

    // init connection object
    private static Connection connection = null;

    public ConnectionToDatabase() {
    }

    // connect database
    public static Connection connect() {
        if (connection != null) {
            return connection;
        }
        if (DATABASE_DRIVER == null || DATABASE_DRIVER.isEmpty()
                || USERNAME == null || USERNAME.isEmpty()
                || PASSWORD == null || PASSWORD.isEmpty()
                || URL == null || URL.isEmpty()) {
            setParameters();
        }

        try {
            Class.forName(DATABASE_DRIVER);
            String url = URL + DATABASE_NAME + "?user=" + USERNAME + "&password=" + PASSWORD + "&autoReconnect=true&useSSL=false&characterEncoding=UTF-8";
            connection = (Connection) DriverManager.getConnection(url);
        } catch (ClassNotFoundException | SQLException e) {
            logger.error(e.toString());
        }
        return connection;
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
        DATABASE_DRIVER = databaseSettings.getDatabaseDriver();
        USERNAME = databaseSettings.getUsername();
        PASSWORD = databaseSettings.getPassword();
        URL = databaseSettings.getDatabaseUrl();
    }

    // disconnect database
    public void disconnect() throws Exception {
        if (connection != null) {
            try {
                connection.close();
                connection = null;
            } catch (SQLException e) {
                logger.error(e.toString());
                throw new Exception(UserMessage.getLocalizedMessage("databaseConnectionIssue"), e);
            }
        }
    }
}

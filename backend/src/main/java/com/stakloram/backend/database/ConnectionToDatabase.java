package com.stakloram.backend.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

@Service
public class ConnectionToDatabase {

    Logger logger = LoggerFactory.getLogger(ConnectionToDatabase.class);

    public static final String DATABASE_NAME = "stakloram2022";
    private static final String DATABASE_DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "password";
    private static final String URL = "jdbc:mysql://localhost:3306/";

    // init connection object
    private Connection connection = null;

    public ConnectionToDatabase() {
    }

    // connect database
    public Connection connect() {
        if (this.connection != null) {
            return this.connection;
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

    public DataSource getDataSource() {
        return DataSourceBuilder.create()
                .driverClassName(DATABASE_DRIVER)
                .url(URL + DATABASE_NAME)
                .username(USERNAME)
                .password(PASSWORD)
                .build();
    }

    // disconnect database
    public void disconnect() {
        if (connection != null) {
            try {
                connection.close();
                connection = null;
            } catch (SQLException e) {
                logger.error(e.toString());
            }
        }
    }
}

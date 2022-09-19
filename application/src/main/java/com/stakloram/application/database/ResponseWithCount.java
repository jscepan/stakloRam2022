package com.stakloram.application.database;

import java.sql.ResultSet;

public class ResponseWithCount {

    private ResultSet resultSet;
    private Long count;

    public ResponseWithCount() {
    }

    public ResponseWithCount(ResultSet resultSet, Long count) {
        this.resultSet = resultSet;
        this.count = count;
    }

    public ResultSet getResultSet() {
        return resultSet;
    }

    public void setResultSet(ResultSet resultSet) {
        this.resultSet = resultSet;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}

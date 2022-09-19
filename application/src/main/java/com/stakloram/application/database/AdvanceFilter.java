package com.stakloram.application.database;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdvanceFilter {

    private Map<String, Long> tableNameEqualsTo = new HashMap<>();
    private Map<String, List<String>> tableNameContains = new HashMap<>();

    public AdvanceFilter() {
    }

    public Map<String, Long> getTableNameEqualsTo() {
        return tableNameEqualsTo;
    }

    public void setTableNameEqualsTo(Map<String, Long> tableNameEqualsTo) {
        this.tableNameEqualsTo = tableNameEqualsTo;
    }

    public Map<String, List<String>> getTableNameContains() {
        return tableNameContains;
    }

    public void setTableNameContains(Map<String, List<String>> tableNameContains) {
        this.tableNameContains = tableNameContains;
    }
}

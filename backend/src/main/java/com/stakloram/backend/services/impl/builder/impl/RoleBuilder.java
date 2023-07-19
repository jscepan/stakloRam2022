package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.RoleStore;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.util.Arrays;

public class RoleBuilder extends BaseBuilder {

    @Override
    public void setObjectStore() {
        this.objectStore = new RoleStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("role_name");
    }
}

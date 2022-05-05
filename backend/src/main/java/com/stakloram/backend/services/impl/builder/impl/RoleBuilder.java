package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.RoleStore;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.util.Arrays;

public class RoleBuilder extends BaseBuilder {

    public RoleBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new RoleStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("role_name");
    }
}

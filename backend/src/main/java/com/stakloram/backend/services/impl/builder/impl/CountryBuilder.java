package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.CountryStore;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.util.Arrays;

public class CountryBuilder extends BaseBuilder {

    @Override
    public void setObjectStore() {
        this.objectStore = new CountryStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("country_description");
    }
}

package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.CountryStore;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.util.Arrays;

public class CountryBuilder extends BaseBuilder {

    public CountryBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new CountryStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("country_description");
    }
}

package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.objects.CountryStore;
import com.stakloram.application.models.Locator;
import com.stakloram.application.services.impl.builder.BaseBuilder;
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

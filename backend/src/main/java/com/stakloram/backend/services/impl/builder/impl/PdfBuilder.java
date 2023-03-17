package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.PdfStore;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import java.util.Arrays;

public class PdfBuilder extends BaseBuilder {

    public PdfBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new PdfStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("pdf_url");
    }
}

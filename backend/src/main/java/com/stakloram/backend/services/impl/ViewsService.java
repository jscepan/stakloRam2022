package com.stakloram.backend.services.impl;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Debtor;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.services.impl.builder.impl.ViewsBuilder;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ViewsService {

    protected final Locator locator = new Locator(new ConnectionToDatabase().connect());
    private final ViewsBuilder viewsBuilder = new ViewsBuilder(locator);

    public ViewsService() {
    }

    public List<Debtor> getAllDebtors() throws SException {
        return viewsBuilder.getAllDebtors();
    }

    public Debtor getDebtor(String buyerOID) throws SException {
        return viewsBuilder.getDebtor(buyerOID);
    }
}

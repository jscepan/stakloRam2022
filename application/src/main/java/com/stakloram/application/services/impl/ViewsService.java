package com.stakloram.application.services.impl;

import com.stakloram.application.database.ConnectionToDatabase;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.Debtor;
import com.stakloram.application.models.Locator;
import com.stakloram.application.services.impl.builder.impl.ViewsBuilder;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ViewsService {

    protected final Locator locator = new Locator(new ConnectionToDatabase().connect());
    private final ViewsBuilder viewsBuilder = new ViewsBuilder(locator);

    public List<Debtor> getAllDebtors() throws SException {
        return viewsBuilder.getAllDebtors();
    }

    public Debtor getDebtor(String buyerOID) throws SException {
        return viewsBuilder.getDebtor(buyerOID);
    }
}

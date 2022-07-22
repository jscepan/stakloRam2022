package com.stakloram.backend.services.impl;

import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.InvoiceBuilder;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new InvoiceBuilder(this.locator);
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        return ((InvoiceBuilder) this.baseBuilder).getNextInvoiceNumber(invoiceType, year);
    }

    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        return ((InvoiceBuilder) this.baseBuilder).getAllInvoiceItemDescriptions();
    }

    @Override
    public void checkRequestDataForCreate(BaseModel object) throws SException {
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel object) throws SException {
    }
}

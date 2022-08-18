package com.stakloram.backend.services.impl;

import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Income;
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.IncomeBuilder;
import com.stakloram.backend.services.impl.builder.impl.InvoiceBuilder;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService extends ServiceModel {

    private IncomeBuilder incomeBuilder = new IncomeBuilder(this.locator);

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
    public BaseModel createNewObject(BaseModel object) throws SException {
        if (((Invoice) object).getType() == InvoiceType.CASH) {
            this.checkRequestDataForCreate(object);
            this.startTransaction();
            Invoice invoice = (Invoice) this.baseBuilder.createNewObject(object);
            if (invoice != null) {
                Income income = this.incomeBuilder.createNewObject(new Income(invoice.getDateOfCreate(), invoice.getGrossAmount(), "Gotovinski račun " + invoice.getNumber(), "", invoice.getBuyer(), ""));
                if (income != null) {
                    this.endTransaction();
                    return invoice;
                }
            }
            this.rollback();
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx");
        } else {
            return super.createNewObject(object);
        }

    }

    @Override
    public void checkRequestDataForCreate(BaseModel object) throws SException {
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel object) throws SException {
    }
}

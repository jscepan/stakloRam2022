package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.InvoiceItemStore;
import com.stakloram.backend.database.objects.InvoiceStore;
import com.stakloram.backend.database.objects.ServiceStore;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.InvoiceItem;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.Service;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class InvoiceBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());
    private final InvoiceItemStore INVOICE_ITEM_STORE = new InvoiceItemStore(this.getLocator());
    private final CityStore CITY_STORE = new CityStore(this.getLocator());
    private final ServiceStore SERVICE_STORE = new ServiceStore(this.getLocator());

    public InvoiceBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new InvoiceStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
        this.databaseColumnsForAttributes.put("type", "type");
        this.databaseColumnsForAdvanceFilter.put("buyer", "invoice_buyer_buyer_id");
    }

    @Override
    public Invoice getObjectByOid(String oid) throws SException {
        Invoice invoice;
        try {
            String fromSt = this.getJoinObjectStoresForSqlFrom(Arrays.asList(BUYER_STORE));
            String whereSt = this.getObjectStore().getTableName() + "." + this.getObjectStore().getPrimaryKey() + "=" + BaseModel.getIdFromOid(oid);
            ResultSet resultSet = this.getObjectStore().getAllObjectsFromDatabase(fromSt, whereSt);
            if (resultSet.next()) {
                invoice = (Invoice) this.getObjectStore().getObjectFromResultSet(resultSet);
                Buyer buyer = BUYER_STORE.getObjectFromResultSet(resultSet);
                buyer.setCity((City) CITY_STORE.getObjectByOid(buyer.getCity().getOid()));
                invoice.setBuyer(buyer);

                List<InvoiceItem> invoiceItems = new ArrayList<>();
                ResultSet rs = INVOICE_ITEM_STORE.getAllObjectsFromDatabase(INVOICE_ITEM_STORE.getTableName() + "_invoice_invoice_id=" + invoice.getId());
                while (rs.next()) {
                    InvoiceItem invoiceItem = INVOICE_ITEM_STORE.getObjectFromResultSet(rs);
                    List<Service> tasks = new ArrayList<>();
                    ResultSet r = SERVICE_STORE.getAllObjectsFromDatabase(SERVICE_STORE.getTableName() + "_invoice_item_invoice_item_id=" + invoiceItem.getId());
                    while (r.next()) {
                        tasks.add(SERVICE_STORE.getObjectFromResultSet(r));
                    }
                    invoiceItem.setTasks(tasks);
                    invoiceItems.add(invoiceItem);
                }
                invoice.setInvoiceItems(invoiceItems);
                return invoice;
            } else {
                throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx");

            }
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    @Override
    public Invoice createNewObject(BaseModel object) throws SException {
        Invoice invoice = (Invoice) super.createNewObject(object);
        for (InvoiceItem invoiceItem : invoice.getInvoiceItems()) {
            try {
                InvoiceItem ii = INVOICE_ITEM_STORE.createNewObjectToDatabase(invoiceItem, invoice.getId());
                for (int i = 0; i < ii.getTasks().size(); i++) {
                    SERVICE_STORE.setInvoiceItemForService(ii.getTasks().get(i).getOid(), ii.getOid());
                }
            } catch (SQLException ex) {
                throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
            }
        }
        return invoice;
    }

    @Override
    public Invoice modifyObject(String oid, BaseModel object) throws SException {
        try {
            Invoice invoice = (Invoice) super.modifyObject(oid, object);
            List<InvoiceItem> oldInvoiceItems = new ArrayList<>();
            ResultSet resultSet = INVOICE_ITEM_STORE.getAllObjectsFromDatabase(INVOICE_ITEM_STORE.getTableName() + "_invoice_invoice_id=" + invoice.getId());
            while (resultSet.next()) {
                oldInvoiceItems.add(INVOICE_ITEM_STORE.getObjectFromResultSet(resultSet));
            }
            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferences = Helper.findDifferenceBetweenLists(invoice.getInvoiceItems(), oldInvoiceItems);
            for (BaseModel inv : mapOfDifferences.get(Helper.Action.FOR_CREATE)) {
                INVOICE_ITEM_STORE.createNewObjectToDatabase(inv);
            }
            for (BaseModel inv : mapOfDifferences.get(Helper.Action.FOR_UPDATE)) {
                INVOICE_ITEM_STORE.modifyObject(inv.getOid(), inv);
                List<Service> tasks = new ArrayList<>();
                ResultSet r = SERVICE_STORE.getAllObjectsFromDatabase(SERVICE_STORE.getTableName() + "_invoice_item_invoice_item_id=" + inv.getId());
                while (r.next()) {
                    tasks.add(SERVICE_STORE.getObjectFromResultSet(r));
                }
                Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesTasks = Helper.findDifferenceBetweenLists(tasks, ((InvoiceItem) inv).getTasks());
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_CREATE)) {
                    SERVICE_STORE.setInvoiceItemForService(task.getOid(), inv.getOid());
                }
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_UPDATE)) {
                    SERVICE_STORE.setInvoiceItemForService(task.getOid(), inv.getOid());
                }
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_DELETE)) {
                    SERVICE_STORE.removeInvoiceItemForService(inv.getOid());
                }
            }
            for (BaseModel inv : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                SERVICE_STORE.removeInvoiceItemForService(inv.getOid());
                INVOICE_ITEM_STORE.deleteObjectByOid(inv.getOid());
            }
            return invoice;
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getJoinObjectStoresForSqlFrom(Arrays.asList(BUYER_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                Invoice invoice = (Invoice) this.getObjectStore().getObjectFromResultSet(rs);
                invoice.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                objects.add(invoice);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        try {
            return ((InvoiceStore) this.getObjectStore()).getLastInvoiceNumber(invoiceType, year) + 1;
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }
}

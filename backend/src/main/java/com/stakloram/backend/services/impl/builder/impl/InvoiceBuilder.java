package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.InvoiceItemStore;
import com.stakloram.backend.database.objects.InvoiceStore;
import com.stakloram.backend.database.objects.NoteStore;
import com.stakloram.backend.database.objects.WorkOrderItemStore;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.InvoiceItem;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Note;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class InvoiceBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());
    private final InvoiceItemStore INVOICE_ITEM_STORE = new InvoiceItemStore(this.getLocator());
    private final CityStore CITY_STORE = new CityStore(this.getLocator());
    private final WorkOrderItemStore WORK_ORDER_ITEM_STORE = new WorkOrderItemStore(this.getLocator());
    private final NoteStore NOTE_STORE = new NoteStore(this.getLocator());

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
            String fromSt = this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE));
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
                    List<WorkOrderItem> workOrderItems = new ArrayList<>();
                    ResultSet r = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_invoice_item_invoice_item_id=" + invoiceItem.getId());
                    while (r.next()) {
                        workOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(r));
                    }
                    invoiceItem.setWorkOrderItems(workOrderItems);
                    invoiceItems.add(invoiceItem);
                }
                invoice.setInvoiceItems(invoiceItems);
                return invoice;
            } else {
                throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
            }
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public Invoice createNewObject(BaseModel object) throws SException {
        try {
            Invoice invoice = (Invoice) super.createNewObject(object);
            for (InvoiceItem invoiceItem : invoice.getInvoiceItems()) {
                InvoiceItem ii = INVOICE_ITEM_STORE.createNewObjectToDatabase(invoiceItem, invoice.getId());
                for (int i = 0; i < ii.getWorkOrderItems().size(); i++) {
                    WORK_ORDER_ITEM_STORE.setInvoiceItemForWorkOrderItem(ii.getWorkOrderItems().get(i).getOid(), ii.getOid());
                }
            }
            for (Note note : invoice.getNotes()) {
                note.setOid(NOTE_STORE.createNewObjectToDatabase(note, invoice.getId()).getOid());
            }
            return invoice;
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
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
                List<WorkOrderItem> tasks = new ArrayList<>();
                ResultSet r = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_invoice_item_invoice_item_id=" + inv.getId());
                while (r.next()) {
                    tasks.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(r));
                }
                Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesTasks = Helper.findDifferenceBetweenLists(tasks, ((InvoiceItem) inv).getWorkOrderItems());
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_CREATE)) {
                    WORK_ORDER_ITEM_STORE.setInvoiceItemForWorkOrderItem(task.getOid(), inv.getOid());
                }
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_UPDATE)) {
                    WORK_ORDER_ITEM_STORE.setInvoiceItemForWorkOrderItem(task.getOid(), inv.getOid());
                }
                for (BaseModel task : mapOfDifferencesTasks.get(Helper.Action.FOR_DELETE)) {
                    WORK_ORDER_ITEM_STORE.removeInvoiceItemForWorkOrderItem(task.getOid());
                }
            }
            for (BaseModel inv : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                WORK_ORDER_ITEM_STORE.removeInvoiceItemForWorkOrderItem(inv.getOid());
                INVOICE_ITEM_STORE.deleteObjectByOid(inv.getOid());
            }
            return invoice;
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                Invoice invoice = (Invoice) this.getObjectStore().getObjectFromResultSet(rs);
                invoice.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                objects.add(invoice);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjectByOid(String oid) throws SException {
        Invoice invoice = this.getObjectByOid(oid);
        for (InvoiceItem item : invoice.getInvoiceItems()) {
            try {
                for (WorkOrderItem woi : item.getWorkOrderItems()) {
                    WORK_ORDER_ITEM_STORE.removeInvoiceItemForWorkOrderItem(woi.getOid());
                }
                INVOICE_ITEM_STORE.deleteObjectByOid(item.getOid());
            } catch (SQLException ex) {
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }

        return super.deleteObjectByOid(oid);
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        try {
            return ((InvoiceStore) this.getObjectStore()).getLastInvoiceNumber(invoiceType, year) + 1;
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public Set<String> getAllInvoiceItemDescriptions() throws SException {
        Set<String> items = new HashSet<>();
        try {
            ResultSet rs = INVOICE_ITEM_STORE.getAllObjectsForSpecificColumn("invoice_item_description");
            while (rs.next()) {
                items.add(rs.getString("invoice_item_description"));
            }
        } catch (SQLException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return items;
    }
}

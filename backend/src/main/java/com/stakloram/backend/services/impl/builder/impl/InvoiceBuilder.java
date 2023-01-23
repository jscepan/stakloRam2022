package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.CountryStore;
import com.stakloram.backend.database.objects.InvoiceItemStore;
import com.stakloram.backend.database.objects.InvoiceStore;
import com.stakloram.backend.database.objects.NoteStore;
import com.stakloram.backend.database.objects.WorkOrderItemStore;
import com.stakloram.backend.database.objects.WorkOrderStore;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.InvoiceItem;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.Country;
import com.stakloram.backend.models.XML.InvoiceXML;
import com.stakloram.backend.models.Note;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.models.XML.CountryXML;
import com.stakloram.backend.models.XML.InvoicePeriod;
import com.stakloram.backend.models.XML.InvoiceSeller;
import com.stakloram.backend.models.XML.InvoiceSellerWrapper;
import com.stakloram.backend.models.XML.PartyName;
import com.stakloram.backend.models.XML.PibXML;
import com.stakloram.backend.models.XML.PostalAddress;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
import java.io.StringWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

public class InvoiceBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());
    private final InvoiceItemStore INVOICE_ITEM_STORE = new InvoiceItemStore(this.getLocator());
    private final CityStore CITY_STORE = new CityStore(this.getLocator());
    private final CountryStore COUNTRY_STORE = new CountryStore(this.getLocator());
    private final WorkOrderItemStore WORK_ORDER_ITEM_STORE = new WorkOrderItemStore(this.getLocator());
    private final NoteStore NOTE_STORE = new NoteStore(this.getLocator());
    private final WorkOrderStore WORK_ORDER_STORE = new WorkOrderStore(this.getLocator());

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
        this.databaseColumnsForAttributes.put("from_date", "date_of_create");
        this.databaseColumnsForAttributes.put("to_date", "date_of_create");
        this.databaseColumnsForAttributes.put("from_matured_date", "date_of_maturity");
        this.databaseColumnsForAttributes.put("to_matured_date", "date_of_maturity");
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
                buyer.getCity().setCountry((Country) COUNTRY_STORE.getObjectByOid(buyer.getCity().getCountry().getOid()));
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

                List<Note> notes = new ArrayList<>();
                ResultSet rsNotes = NOTE_STORE.getAllObjectsFromDatabase(NOTE_STORE.getTableName() + "_invoice_invoice_id=" + invoice.getId());
                while (rsNotes.next()) {
                    Note note = NOTE_STORE.getObjectFromResultSet(rsNotes);
                    notes.add(note);
                }
                invoice.setNotes(notes);
                return invoice;
            } else {
                throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
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
            super.logger.error(ex.toString());
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

                // Get list of previously work order items for this specific invoice item
                List<WorkOrderItem> previousWorkOrderItems = new ArrayList<>();
                ResultSet r = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_invoice_item_invoice_item_id=" + inv.getId());
                while (r.next()) {
                    previousWorkOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(r));
                }

                Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesWorkOrderItems = Helper.findDifferenceBetweenLists(((InvoiceItem) inv).getWorkOrderItems(), previousWorkOrderItems);
                for (BaseModel workOrderItem : mapOfDifferencesWorkOrderItems.get(Helper.Action.FOR_CREATE)) {
                    WORK_ORDER_ITEM_STORE.setInvoiceItemForWorkOrderItem(workOrderItem.getOid(), inv.getOid());
                }
                for (BaseModel workOrderItem : mapOfDifferencesWorkOrderItems.get(Helper.Action.FOR_DELETE)) {
                    WORK_ORDER_ITEM_STORE.removeInvoiceItemForWorkOrderItem(workOrderItem.getOid());
                }
            }
            for (BaseModel inv : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                WORK_ORDER_ITEM_STORE.removeWorkOrdersItemForInvoiceItemOid(inv.getOid());
                INVOICE_ITEM_STORE.deleteObjectByOid(inv.getOid());
            }

            List<Note> oldNotes = new ArrayList<>();
            ResultSet resultSetNotes = NOTE_STORE.getAllObjectsFromDatabase(NOTE_STORE.getTableName() + "_invoice_invoice_id=" + invoice.getId());
            while (resultSetNotes.next()) {
                oldNotes.add(NOTE_STORE.getObjectFromResultSet(resultSetNotes));
            }
            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesNotes = Helper.findDifferenceBetweenLists(invoice.getNotes(), oldNotes);
            for (BaseModel inv : mapOfDifferencesNotes.get(Helper.Action.FOR_CREATE)) {
                NOTE_STORE.createNewObjectToDatabase(inv);
            }
            for (BaseModel inv : mapOfDifferencesNotes.get(Helper.Action.FOR_UPDATE)) {
                NOTE_STORE.modifyObject(inv.getOid(), inv);
            }
            for (BaseModel inv : mapOfDifferencesNotes.get(Helper.Action.FOR_DELETE)) {
                NOTE_STORE.deleteObjectByOid(inv.getOid());
            }
            return invoice;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
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
            super.logger.error(ex.toString());
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
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        for (Note note : invoice.getNotes()) {
            try {
                NOTE_STORE.deleteObjectByOid(note.getOid());
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }

        return super.deleteObjectByOid(oid);
    }

    public int getNextInvoiceNumber(Invoice.InvoiceType invoiceType, int year) throws SException {
        try {
            return ((InvoiceStore) this.getObjectStore()).getLastInvoiceNumber(invoiceType, year) + 1;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
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
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return items;
    }

    public boolean changeBuyer(String invoiceOID, String buyerOID) throws SException {
        try {
            return ((InvoiceStore) this.objectStore).changeBuyer(invoiceOID, buyerOID);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
//        try {
//            if (!((InvoiceStore) this.objectStore).changeBuyer(invoiceOID, buyerOID)) {
//                return false;
//            }
//        } catch (SQLException ex) {
//            super.logger.error(ex.toString());
//            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
//        }
//        // find all associate workOrders
//        Set<String> workOrderOIDSForChange = new HashSet<>();
//        try {
//            String from = this.getSqlFromObjectStores(Arrays.asList(WORK_ORDER_ITEM_STORE, WORK_ORDER_STORE));
//            for (InvoiceItem ii : invoice.getInvoiceItems()) {
//                String where = WORK_ORDER_ITEM_STORE.getTableName() + "_invoice_item_invoice_item_id=" + BaseModel.getIdFromOid(ii.getOid());
//                ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(from, where);
//                while (rs.next()) {
//                    WorkOrder workOrder = WORK_ORDER_STORE.getObjectFromResultSet(rs);
//                    workOrderOIDSForChange.add(workOrder.getOid());
//                }
//            }
//        } catch (SQLException ex) {
//            super.logger.error(ex.toString());
//            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
//        }
//
//        for (String oid : workOrderOIDSForChange) {
//            try {
//                if (!WORK_ORDER_STORE.changeBuyer(oid, buyerOID)) {
//                    return false;
//                }
//            } catch (SQLException ex) {
//                super.logger.error(ex.toString());
//                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
//            }
//        }
//        return true;
    }

    public Set<String> getAllWorkOrdersForInvoice(Invoice invoice) throws SException {
        // find all associate workOrders
        Set<String> workOrderOIDSForChange = new HashSet<>();
        try {
            String from = this.getSqlFromObjectStores(Arrays.asList(WORK_ORDER_ITEM_STORE, WORK_ORDER_STORE));
            for (InvoiceItem ii : invoice.getInvoiceItems()) {
                String where = WORK_ORDER_ITEM_STORE.getTableName() + "_invoice_item_invoice_item_id=" + BaseModel.getIdFromOid(ii.getOid());
                ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(from, where);
                while (rs.next()) {
                    WorkOrder workOrder = WORK_ORDER_STORE.getObjectFromResultSet(rs);
                    workOrderOIDSForChange.add(workOrder.getOid());
                }
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return workOrderOIDSForChange;
    }

    public String getXMLForInvoice(String invoiceOID) throws SException {
        // TODO
        Invoice invoice = this.getObjectByOid(invoiceOID);
        if (invoice == null) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
        }

        String customizationID = "urn:cen.eu:en16931:2017#compliant#urn:mfin.gov.rs:srbdt:2021";// settings.getCustomizationID();
        String invoiceTypeCode = "380";// settings.getInvoiceTypeCode(invoice.getType());
        String documentCurrencyCode = "RSD";// settings.getDocumentCurrencyCode();
        InvoicePeriod invoicePeriod = new InvoicePeriod("35");// settings.getInvoicePeriodDescription();
        String schemeID = "9948";// settings.getSchemeID();
        InvoiceSeller sellerXML = new InvoiceSeller();
        CountryXML sellerCountry = new CountryXML("RS"); // settings.getSellerCountry();
        sellerXML.setPibXML(new PibXML("10101010", schemeID));//settings.getSellerPIB();
        sellerXML.setPartyName(new PartyName("StakloRam"));//settings.getSellerName();
        sellerXML.setPostalAddress(new PostalAddress("Backa Palanka", sellerCountry));//settings.getSellerCity()
        InvoiceSellerWrapper isw = new InvoiceSellerWrapper(sellerXML);

        InvoiceXML invoiceXML = new InvoiceXML();
        invoiceXML.setCustomizationID(customizationID);
        invoiceXML.setNumber(invoice.getNumber());
        invoiceXML.setDateOfCreate(invoice.getDateOfCreate() + "");
        invoiceXML.setDateOfMaturity(invoice.getDateOfMaturity() + "");
        invoiceXML.setInvoiceTypeCode(invoiceTypeCode);
        invoiceXML.setDocumentCurrencyCode(documentCurrencyCode);
        invoiceXML.setInvoicePeriod(invoicePeriod);
        invoiceXML.setInvoiceSellerWrapper(isw);

        return this.jaxbObjectToXML(invoiceXML);
    }

    private String jaxbObjectToXML(InvoiceXML invoice) throws SException {
        try {
            String xmlString = "";
            JAXBContext context = JAXBContext.newInstance(InvoiceXML.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE); // To format XML
            StringWriter sw = new StringWriter();
            m.marshal(invoice, sw);
            xmlString = sw.toString();
            return xmlString;
        } catch (JAXBException ex) {
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

}

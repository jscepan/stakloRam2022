package com.stakloram.backend.services.impl.builder.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import static com.stakloram.backend.constants.Constants.INVOICE_PDF_DIRECTORY;
import static com.stakloram.backend.constants.Constants.INVOICE_XML_DIRECTORY;
import static com.stakloram.backend.constants.Constants.WORK_ORDER_PDF_DIRECTORY;
import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.CountryStore;
import com.stakloram.backend.database.objects.InvoiceItemStore;
import com.stakloram.backend.database.objects.InvoiceStore;
import com.stakloram.backend.database.objects.NoteStore;
import com.stakloram.backend.database.objects.PdfStore;
import com.stakloram.backend.database.objects.RegistratedInvoiceStore;
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
import com.stakloram.backend.models.Invoice.InvoiceType;
import com.stakloram.backend.models.XML.InvoiceXML;
import com.stakloram.backend.models.Note;
import com.stakloram.backend.models.Pdf;
import com.stakloram.backend.models.RegistratedInvoice;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.Settings;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.models.WorkOrderItem.UOM;
import com.stakloram.backend.models.XML.AdditionalDocumentReferenceXML;
import com.stakloram.backend.models.XML.AttachmentXML;
import com.stakloram.backend.models.XML.ContactXML;
import com.stakloram.backend.models.XML.ContractDocumentReferenceXML;
import com.stakloram.backend.models.XML.CountryXML;
import com.stakloram.backend.models.XML.DeliveryXML;
import com.stakloram.backend.models.XML.InvoiceBuyerWrapperXML;
import com.stakloram.backend.models.XML.InvoiceItemXML;
import com.stakloram.backend.models.XML.InvoicePeriodXML;
import com.stakloram.backend.models.XML.InvoicePartyXML;
import com.stakloram.backend.models.XML.InvoiceSellerWrapperXML;
import com.stakloram.backend.models.XML.LegalMonetaryTotalXML;
import com.stakloram.backend.models.XML.PartyIdentificationXML;
import com.stakloram.backend.models.XML.PartyLegalEntityXML;
import com.stakloram.backend.models.XML.PartyName;
import com.stakloram.backend.models.XML.PartyTaxSchemeXML;
import com.stakloram.backend.models.XML.PayeeFinancialAccountXML;
import com.stakloram.backend.models.XML.PaymentMeansXML;
import com.stakloram.backend.models.XML.PibXML;
import com.stakloram.backend.models.XML.PostalAddress;
import com.stakloram.backend.models.XML.CurrencyAmountXML;
import com.stakloram.backend.models.XML.EmbeddedDocumentBinaryObjectXML;
import com.stakloram.backend.models.XML.ImportSalesUblResponse;
import com.stakloram.backend.models.XML.InvoiceItemDetailsXML;
import com.stakloram.backend.models.XML.InvoicedQuantityXML;
import com.stakloram.backend.models.XML.PriceXML;
import com.stakloram.backend.models.XML.TaxCategoryXML;
import com.stakloram.backend.models.XML.TaxItemXML;
import com.stakloram.backend.models.XML.TaxSchemeXML;
import com.stakloram.backend.models.XML.TaxTotalXML;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.DataChecker;
import com.stakloram.backend.util.Helper;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import org.apache.commons.io.FileUtils;

public class InvoiceBuilder extends BaseBuilder {

    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());
    private final InvoiceItemStore INVOICE_ITEM_STORE = new InvoiceItemStore(this.getLocator());
    private final CityStore CITY_STORE = new CityStore(this.getLocator());
    private final CountryStore COUNTRY_STORE = new CountryStore(this.getLocator());
    private final WorkOrderItemStore WORK_ORDER_ITEM_STORE = new WorkOrderItemStore(this.getLocator());
    private final NoteStore NOTE_STORE = new NoteStore(this.getLocator());
    private final WorkOrderStore WORK_ORDER_STORE = new WorkOrderStore(this.getLocator());
    private final PdfStore PDF_STORE = new PdfStore(this.getLocator());

    public InvoiceBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new InvoiceStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name", "invoice_number_sign");
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
                INVOICE_ITEM_STORE.createNewObjectToDatabase(inv, invoice.getId());
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
        // find all associate workOrders - get decision about work orders of that invoice...
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
        Invoice invoice = this.getObjectByOid(invoiceOID);
        if (invoice == null) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
        }
        SettingsBuilder settingsBuilder = new SettingsBuilder();
        Settings settings = settingsBuilder.getSettings();

        InvoiceXML invoiceXML = new InvoiceXML();
        if (invoice.getType() == InvoiceType.FINAL
                || invoice.getType() == InvoiceType.FOREIGN
                || invoice.getType() == InvoiceType.PRE_INVOICE) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceTypeNotSupported"));
        }
        // For final invoices first part is UBLExtensions
        if (invoice.getType() == InvoiceType.FINAL) {
            /*
            Invoice advanceInvoice = this.getObjectByOid(invoice.getAdvanceInvoiceOid());
            List<UBLExtensionXML> ublExtensions = new ArrayList<>();
            List<TaxItemXML> taxSubtotalAdvanceInvoiceXML = new ArrayList<>();

            for (InvoiceItem aii : advanceInvoice.getInvoiceItems()) {
                String categoryAdvanceInvoice = settings.getCategoryForStandardVAT();
                if (aii.getVatRate() == 0) {
                    throw new SException(UserMessage.getLocalizedMessage("categoryVATError"));
                }
                TaxCategoryXML taxCategoryXML = new TaxCategoryXML(categoryAdvanceInvoice, aii.getVatRate(), new TaxSchemeXML(settings.getTaxScheme()));
                TaxItemXML taxItemAdvanceInvoiceXML = new TaxItemXML(new CurrencyAmountXML(aii.getNetPrice(), settings.getInvoiceCurrencyEInvoice()), new CurrencyAmountXML(aii.getVatAmount(), settings.getInvoiceCurrencyEInvoice()), taxCategoryXML);
                taxSubtotalAdvanceInvoiceXML.add(taxItemAdvanceInvoiceXML);
                TaxTotalXML taxTotalAdvanceInvoiced = new TaxTotalXML(new CurrencyAmountXML(advanceInvoice.getGrossAmount(), settings.getInvoiceCurrencyEInvoice()), taxSubtotalAdvanceInvoiceXML);
                InvoicedPrepaymentAmmountXML invoicedPrepaymentAmmount = new InvoicedPrepaymentAmmountXML(invoice.getNumber(), taxTotalAdvanceInvoiced);

                ReducedTotalsXML reducedTotalsXML = new ReducedTotalsXML();
                SrbDtExtXML srbDtExtXML = new SrbDtExtXML(invoicedPrepaymentAmmount, reducedTotalsXML);
                UBLExtensionXML ublExtension = new UBLExtensionXML(new ExtensionContentXML(srbDtExtXML));
                ublExtensions.add(ublExtension);

                //////////////////// Invoice total amount without VAT BT-109 ////////
                double taxExclusiveAmount = invoice.getNetAmount();
                //////////////////// Invoice total amount with VAT BT-112 ///////////
                double taxInclusiveAmount = invoice.getGrossAmount();
                //////////////////// Paid amounT BT-113 /////////////////////////////
                double prepaidAmount = invoice.getAdvancePayAmount();
                //////////////////// Amount due for payment BT-115 //////////////////
                double payableAmount = invoice.getGrossAmount() - prepaidAmount;

                LegalMonetaryTotalXML legalMonetaryTotalAdvanceInvoice = new LegalMonetaryTotalXML(
                        null,
                        new CurrencyAmountXML(DataChecker.roundOnDigits(taxExclusiveAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                        new CurrencyAmountXML(DataChecker.roundOnDigits(taxInclusiveAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                        null,
                        null,
                        new CurrencyAmountXML(DataChecker.roundOnDigits(payableAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice())
                );
        }
            invoiceXML.setUblExtensions(ublExtensions);
             */
        }

        //////////////////// customizationID BT-24////////////////////////////
        String customizationID = settings.getCustomizationID();
        if (customizationID
                == null || customizationID.length()
                == 0) {
            throw new SException(UserMessage.getLocalizedMessage("customizationIDError"));
        }

        invoiceXML.setCustomizationID(customizationID);

        //////////////////// invoice number BT-1//////////////////////////////
        invoiceXML.setNumber(invoice.getNumber());

        //////////////////// invoice number BT-2//////////////////////////////
        invoiceXML.setDateOfCreate(invoice.getDateOfCreate() + "");
        //////////////////// invoice number BT-9//////////////////////////////
        invoiceXML.setDateOfMaturity(invoice.getDateOfMaturity() + "");

        //////////////////// invoiceTypeCode BT-3/////////////////////////////
        String invoiceTypeCode = "";

        if (invoice.getType()
                == InvoiceType.DOMESTIC || invoice.getType() == InvoiceType.CASH) {
            invoiceTypeCode = settings.getInvoiceTypeCodeCommercialInvoice();
        } else if (invoice.getType()
                == InvoiceType.ADVANCE_INVOICE) {
            invoiceTypeCode = settings.getInvoiceTypeCodeAdvanceInvoice();
        }
        if (invoiceTypeCode
                == null || invoiceTypeCode.length()
                == 0) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceTypeCodeError"));
        }

        invoiceXML.setInvoiceTypeCode(invoiceTypeCode);

        //////////////////// invoiceTypeCode BT-21/////////////////////////////
        if (invoice.getComment() != null && invoice.getComment().length() > 0) {
            invoiceXML.setNote(invoice.getComment());
        }
        //////////////////// DocumentCurrencyCode BT-5////////////////////////
        String documentCurrencyCode = settings.getDocumentCurrencyCode();
        if (documentCurrencyCode
                == null || documentCurrencyCode.length()
                == 0) {
            throw new SException(UserMessage.getLocalizedMessage("documentCurrencyCodeError"));
        }

        invoiceXML.setDocumentCurrencyCode(documentCurrencyCode);

        //////////////////// ContractDocumentReference BT-12/////////////////
        if (invoice.getBuyer().getJbkjs() != null) {
            invoiceXML.setContractDocumentReferenceXML(new ContractDocumentReferenceXML(invoice.getNumber()));
        }
        //////////////////// InvoicePeriod BT-8//////////////////////////////
        // Za avansne racune to je datum placanja, a za ostale pogledaj tutorial...
        String invoiceTaxPeriod;

        if (invoice.getType()
                == InvoiceType.ADVANCE_INVOICE) {
            invoiceTaxPeriod = settings.getInvoiceTaxPeriodByDateOfPaying();
        } else {
            // Ovo je ovako jer je knjigovodja rekao da uvek na mesto datuma obracuna PDV-a stavljamo datum prometa
//            if (invoice.getDateOfTurnover().isBefore(invoice.getDateOfCreate())) {
            invoiceTaxPeriod = settings.getInvoiceTaxPeriodByDateOfTurnover();
//            } else {
//                invoiceTaxPeriod = settings.getInvoiceTaxPeriodByDateOfCreate();
//            }
        }
        InvoicePeriodXML invoicePeriod = new InvoicePeriodXML(invoiceTaxPeriod);

        if (invoicePeriod.getDescriptionCode()
                == null || invoicePeriod.getDescriptionCode().length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("invoicePeriodError"));
        }

        invoiceXML.setInvoicePeriod(invoicePeriod);

        //////////////////// BG-24 AdditionalDocumentReference //////////////
        Set<String> workOrderOIDS = new HashSet<>();
        for (InvoiceItem ii : invoice.getInvoiceItems()) {
            for (WorkOrderItem woi : ii.getWorkOrderItems()) {
                try {
                    workOrderOIDS.add(this.WORK_ORDER_ITEM_STORE.getWorkOrderOidForWorkOrderItemOid(woi.getOid()));
                } catch (SQLException ex) {
                    throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
                }
            }
        }

        if (!workOrderOIDS.isEmpty()) {
            List<AdditionalDocumentReferenceXML> additionalDocumentReferencesList = new ArrayList<>();
            String title = UserMessage.getLocalizedMessage("workOrder") + " ";
            List<File> allPdfs = new ArrayList<>();
            boolean start = false;
            int counter = 1;
            String pdfFileName = "filepdf";
            for (String woOIDS : workOrderOIDS) {
                if (start == true) {
                    title += ", ";
                }
                WorkOrder wo = (WorkOrder) new WorkOrderBuilder(this.getLocator()).getObjectByOid(woOIDS);
                title += wo.getNumber();

                // Get All pdf-s and add it to list
                if (wo.getPdf() != null && wo.getPdf().getOid() != null) {
                    try {
                        wo.setPdf((Pdf) this.PDF_STORE.getObjectByOid(wo.getPdf().getOid()));
                    } catch (SQLException ex) {
                        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
                    }
                    try {
                        File f = this.getExistingPdfForWorkOrder(wo);
                        if (f.exists()) {
                            allPdfs.add(f);
                        }
                    } catch (Exception e) {
                        File f = Helper.createNewPdfForHtmlPage(PdfBuilder.generateHtmlForWorkOrder(wo), (pdfFileName + counter + ".pdf"));
                        if (f.exists()) {
                            allPdfs.add(f);
                        }
                    }
                } else {
                    File f = Helper.createNewPdfForHtmlPage(PdfBuilder.generateHtmlForWorkOrder(wo), (pdfFileName + counter + ".pdf"));
                    if (f.exists()) {
                        allPdfs.add(f);
                    }
                }
                start = true;
                counter++;
            }
            File mergedPDF = null;
            if (!allPdfs.isEmpty()) {
                mergedPDF = Helper.mergePDFs(allPdfs);
            }
            if (mergedPDF != null) {
                // Convert sumOfAllPdfs to string
                String fileInBase64;
                try {
                    fileInBase64 = Helper.convertFileToBase64(mergedPDF);
                } catch (IOException ex) {
                    super.logger.error(ex.toString());
                    throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
                }
                String encoding = "base64";
                EmbeddedDocumentBinaryObjectXML attachment = new EmbeddedDocumentBinaryObjectXML(fileInBase64, "application/pdf", encoding, title + ".pdf");
                AdditionalDocumentReferenceXML additionalDocumentReference = new AdditionalDocumentReferenceXML(title, new AttachmentXML(attachment));
                additionalDocumentReferencesList.add(additionalDocumentReference);
                invoiceXML.setAdditionalDocumentReferencesXML(additionalDocumentReferencesList);
            }
        }

        //////////////////// SELLER DATA BG-4 ///////////////////////////////
        InvoicePartyXML sellerXML = new InvoicePartyXML();
        //////////////////// SELLER PIB BT-31 ///////////////////////////////

        sellerXML.setPibXML(
                new PibXML(settings.getSellerPIB(), settings.getSchemeID()));
        //////////////////// SELLER NAME BT-27 //////////////////////////////
        sellerXML.setPartyName(
                new PartyName(settings.getSellerName()));
        //////////////////// SELLER ADDRESS BG-5 ////////////////////////////
        PostalAddress postalAddressSeller = new PostalAddress();
        //////////////////// SELLER CITY BT-37 //////////////////////////////
        postalAddressSeller.setCityName(settings.getSellerCity());
        postalAddressSeller.setStreetName(settings.getSellerStreetName());
        //////////////////// SELLER CITY BT-38 //////////////////////////////
        postalAddressSeller.setPostalZone(settings.getSellerPostalCode());
        //////////////////// SELLER COUNTRY BT-40 ///////////////////////////
        CountryXML sellerCountry = new CountryXML(settings.getSellerCountry());

        postalAddressSeller.setCountry(sellerCountry);

        sellerXML.setPostalAddress(postalAddressSeller);
        //////////////////// SELLER TAX SCHEME BT-62 ////////////////////////
        TaxSchemeXML taxScheme = new TaxSchemeXML(settings.getTaxScheme());
        //////////////////// SELLER PIB BT-63 ///////////////////////////////
        PartyTaxSchemeXML partyTaxScheme = new PartyTaxSchemeXML(settings.getTaxCountrySign() + settings.getSellerPIB(), taxScheme);//settings.getTaxCountrySign()+settings.getCompanyId, 

        sellerXML.setPartyTaxScheme(partyTaxScheme);
        //////////////////// SELLER MATICAL NUMBER BT-30 ////////////////////
        PartyLegalEntityXML partyLegalEntity = new PartyLegalEntityXML(settings.getSellerName(), settings.getSellerMaticalNumber());
        ContactXML sellerContact = new ContactXML(settings.getSellerElectronicMail());

        sellerXML.setPartyLegalEntity(partyLegalEntity);

        sellerXML.setContact(sellerContact);
        InvoiceSellerWrapperXML isw = new InvoiceSellerWrapperXML(sellerXML);

        invoiceXML.setInvoiceSellerWrapper(isw);
        /////////////////////////////////////////////////////////////////////

        //////////////////// BUYER DATA BG-7 ////////////////////////////////
        InvoicePartyXML buyerXML = new InvoicePartyXML();
        //////////////////// BUYER DATA BT-49 ///////////////////////////////

        buyerXML.setPibXML(
                new PibXML(invoice.getBuyer().getPib(), settings.getSchemeID()));
        //////////////////// BUYER DATA BT-46 ///////////////////////////////
        String jbkjs = invoice.getBuyer().getJbkjs();
        if (jbkjs
                != null && jbkjs.length()
                > 0) {
            buyerXML.setPartyIdentificationXML(new PartyIdentificationXML(settings.getJbkjsPrefix() + ":" + jbkjs));
        }
        //////////////////// BUYER DATA BT-44 ///////////////////////////////

        buyerXML.setPartyName(
                new PartyName(invoice.getBuyer().getName().trim()));

        //////////////////// BUYER DATA BT-55 ///////////////////////////////
        PostalAddress postalAddressBuyer = new PostalAddress();
        //////////////////// BUYER DATA BT-52 ///////////////////////////////

        postalAddressBuyer.setStreetName(invoice.getBuyer().getAddress().trim());
        postalAddressBuyer.setCityName(invoice.getBuyer().getCity().getName());
        postalAddressBuyer.setPostalZone(invoice.getBuyer().getCity().getZipCode());
        CountryXML buyerCountry = new CountryXML(invoice.getBuyer().getCity().getCountry().getIdentificationCode());

        postalAddressBuyer.setCountry(buyerCountry);

        buyerXML.setPostalAddress(postalAddressBuyer);
        //////////////////// BUYER DATA BT-49 ///////////////////////////////
        TaxSchemeXML taxSchemeBuyer = new TaxSchemeXML(settings.getTaxScheme());
        //////////////////// BUYER DATA BT-48 ///////////////////////////////
        PartyTaxSchemeXML partyTaxSchemeBuyer = new PartyTaxSchemeXML(settings.getTaxCountrySign() + invoice.getBuyer().getPib(), taxSchemeBuyer);

        buyerXML.setPartyTaxScheme(partyTaxSchemeBuyer);
        //////////////////// BUYER DATA BT-44 BT-47 /////////////////////////
        PartyLegalEntityXML partyLegalEntityBuyer = new PartyLegalEntityXML(invoice.getBuyer().getName(), invoice.getBuyer().getMaticalNumber());

        buyerXML.setPartyLegalEntity(partyLegalEntityBuyer);

        if (invoice.getBuyer()
                .getEmail() == null || invoice.getBuyer().getEmail().length() == 0) {
            ContactXML buyerContact = new ContactXML(invoice.getBuyer().getEmail());
            buyerXML.setContact(buyerContact);
        }
        InvoiceBuyerWrapperXML isb = new InvoiceBuyerWrapperXML(buyerXML);

        invoiceXML.setInvoiceBuyerWrapperXML(isb);

        // ako je sifra datuma poreske obaveze BT-8 != 432 iskazuje da je nacin odredjivanja
        // kada nastaje poreska obaveza prema datumu placanja...
        // IF is not advance invoice
        if (invoiceTaxPeriod != settings.getInvoiceTaxPeriodByDateOfPaying()) {
            // If BT-8 == 3 then it's by date of create of invoice
            if (invoiceTaxPeriod == settings.getInvoiceTaxPeriodByDateOfCreate()) {
                invoiceXML.setDeliveryXML(new DeliveryXML(invoice.getDateOfCreate() + ""));
            } else {
                // otherwise it's 35 - by date of turnover
                invoiceXML.setDeliveryXML(new DeliveryXML(invoice.getDateOfTurnover() + ""));
            }
        }
        //////////////////// BUYER PAYMENT MEANS CODE BT-81 /////////////////
        String paymentMeansCode = settings.getPaymentMeansCode();
        //////////////////// BUYER DATA BT-83 ///////////////////////////////
        String paymentID = null;

        if (invoice.getType()
                == InvoiceType.DOMESTIC || invoice.getType() == InvoiceType.CASH) {
            paymentID = settings.getModelPaymentCode() + " " + invoice.getNumber();
        }

        //////////////////// BUYER ACCOUNT BT-84 ////////////////////////////
//        String buyerAccount = invoice.getBuyer().getAccount();
//        if (buyerAccount
//                == null || buyerAccount.length()
//                == 0) {
//            throw new SException(UserMessage.getLocalizedMessage("buyerAccountError"));
//        }
        invoiceXML.setPaymentMeansXML(
                new PaymentMeansXML(paymentMeansCode, paymentID, new PayeeFinancialAccountXML(settings.getSellerAccount())));

        //////////////////// Sum of Invoice line net amount BT-106 //////////
        double lineExtensionAmount = invoice.getNetAmount();
        //////////////////// Invoice total amount without VAT BT-109 ////////
        double taxExclusiveAmount = invoice.getNetAmount();
        //////////////////// Invoice total amount with VAT BT-112 ///////////
        double taxInclusiveAmount = invoice.getGrossAmount();
        //////////////////// Paid amounT BT-113 /////////////////////////////
        double prepaidAmount = invoice.getAdvancePayAmount();
        //////////////////// Amount due for payment BT-115 //////////////////
        double payableAmount = invoice.getGrossAmount() - prepaidAmount;
        LegalMonetaryTotalXML legalMonetaryTotal = new LegalMonetaryTotalXML(
                new CurrencyAmountXML(DataChecker.roundOnDigits(lineExtensionAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                new CurrencyAmountXML(DataChecker.roundOnDigits(taxExclusiveAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                new CurrencyAmountXML(DataChecker.roundOnDigits(taxInclusiveAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                new CurrencyAmountXML(0, settings.getInvoiceCurrencyEInvoice()),
                new CurrencyAmountXML(DataChecker.roundOnDigits(prepaidAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()),
                new CurrencyAmountXML(DataChecker.roundOnDigits(payableAmount, settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice())
        );

        invoiceXML.setLegalMonetaryTotal(legalMonetaryTotal);

        //////////////////// TAX AMOUNT BT-117 //////////////////////////
        CurrencyAmountXML taxAmount = new CurrencyAmountXML(invoice.getVatAmount(), settings.getInvoiceCurrencyEInvoice());

        List<TaxItemXML> taxItems = new ArrayList<>();
        List<InvoiceItemXML> items = new ArrayList<>();
        int count = 1;
        for (InvoiceItem invoiceItem
                : invoice.getInvoiceItems()) {
            //////////////////// VAT CATEGORY BT-118 ////////////////////////
            String category = null;
            double rate = 0;
            if (invoiceItem.getVatRate() == settings.getStandardVATRate()) {
                category = settings.getCategoryForStandardVAT();
                rate = settings.getStandardVATRate();
            } else if (invoiceItem.getVatRate() == settings.getPrivillegedVATRate()) {
                category = settings.getCategoryForPrivillegedVAT();
                rate = settings.getPrivillegedVATRate();
            } else {
                throw new SException(UserMessage.getLocalizedMessage("categoryVATError"));
            }
            if (category == null || rate == 0) {
                throw new SException(UserMessage.getLocalizedMessage("categoryVATError"));
            }
            TaxCategoryXML taxCategoryXML = new TaxCategoryXML(category, rate, new TaxSchemeXML(settings.getTaxScheme()));

            TaxItemXML previousTaxItemXML = null;
            CurrencyAmountXML itemTaxAmount = new CurrencyAmountXML(invoiceItem.getVatAmount(), settings.getInvoiceCurrencyEInvoice());

            for (TaxItemXML tiXML : taxItems) {
                if (tiXML.getTaxCategoryXML().getId() == category) {
                    previousTaxItemXML = tiXML;
                }
            }
            if (previousTaxItemXML == null) {
                //////////////////// VAT category taxable amount BT-116 /////////
                CurrencyAmountXML taxableAmount = new CurrencyAmountXML(invoiceItem.getNetPrice(), settings.getInvoiceCurrencyEInvoice());

                TaxItemXML taxItem = new TaxItemXML(taxableAmount, itemTaxAmount, taxCategoryXML);
                taxItems.add(taxItem);
            } else {
                previousTaxItemXML.getTaxableAmount().setValue(DataChecker.roundOnDigits(previousTaxItemXML.getTaxableAmount().getValue() + invoiceItem.getNetPrice(), settings.getDigitsCountForTaxInvoice()));
                previousTaxItemXML.getTaxAmount().setValue(DataChecker.roundOnDigits(previousTaxItemXML.getTaxAmount().getValue() + invoiceItem.getVatAmount(), settings.getDigitsCountForTaxInvoice()));
            }

            //////////////////// Invoiced quantity BT-130 ///////////////////
            String unitCode = "";
            if (invoiceItem.getUom().equals(UOM.M2.name())) {
                unitCode = settings.getUnitCodeForMeter2();
            } else if (invoiceItem.getUom().equals(UOM.M.name())) {
                unitCode = settings.getUnitCodeForMeter();
            } else if (invoiceItem.getUom().equals(UOM.HOUR.name())) {
                unitCode = settings.getUnitCodeForHour();
            } else if (invoiceItem.getUom().equals(UOM.PCS.name())) {
                unitCode = settings.getUnitCodeForPieces();
            } else if (invoiceItem.getUom().equals(UOM.KG.name())) {
                unitCode = settings.getUnitCodeForKilograme();
            }
            if (unitCode == null || unitCode.length() == 0) {
                throw new SException(UserMessage.getLocalizedMessage("unitCodeError"));
            }
            //////////////////// Invoiced quantity BT-129 ///////////////////
            InvoicedQuantityXML invoicedQuantityXML = new InvoicedQuantityXML(invoiceItem.getQuantity(), unitCode);
            //////////////////// Invoice line net amount BT-131 /////////////
            CurrencyAmountXML lineExtensionAmountItem = new CurrencyAmountXML(DataChecker.roundOnDigits(invoiceItem.getNetPrice(), settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice());
            //////////////////// Item name BG-25 ///////////////////////////
            InvoiceItemDetailsXML invoiceItemDetailsXML = new InvoiceItemDetailsXML(invoiceItem.getDescription(), taxCategoryXML);
            //////////////////// Item net price BT-146 /////////////////////
            PriceXML priceInvoiceItem = new PriceXML(new CurrencyAmountXML(DataChecker.roundOnDigits(invoiceItem.getPricePerUnit(), settings.getDigitsCountForInvoice()), settings.getInvoiceCurrencyEInvoice()));
            //////////////////// Invoice line net amount BT-131 /////////////
            InvoiceItemXML invoiceLineXML = new InvoiceItemXML(count, invoicedQuantityXML, lineExtensionAmountItem, invoiceItemDetailsXML, priceInvoiceItem);
            items.add(invoiceLineXML);
            count++;
        }
        //////////////////// TAX TOTAL BT-110 ///////////////////////////////
        TaxTotalXML taxTotalXML = new TaxTotalXML(new CurrencyAmountXML(invoice.getVatAmount(), settings.getInvoiceCurrencyEInvoice()), taxItems);

        invoiceXML.setTaxTotalXML(taxTotalXML);

        invoiceXML.setInvoiceItemsXML(items);

        return this.jaxbObjectToXML(invoiceXML);
    }

    private String jaxbObjectToXML(InvoiceXML invoice) throws SException {
        try {
            String xmlString = "";
            JAXBContext context = JAXBContext.newInstance(InvoiceXML.class
            );
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

    public boolean registrationOfInvoice(String invoiceOID) throws SException {
        Invoice invoice = this.getObjectByOid(invoiceOID);
        SettingsBuilder settingsBuilder = new SettingsBuilder();
        Settings settings = settingsBuilder.getSettings();

        // Parameters for http call
        String apiUrl = settings.getUrlImportSalesUbl();
        String requestID = Helper.generateRandomString(settings.getRequestIDcharsNumber());
        String sendToCir;
        String body = this.getXMLForInvoice(invoiceOID);
        String encodedText = null;
        try {
            encodedText = URLEncoder.encode(body, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(InvoiceBuilder.class.getName()).log(Level.SEVERE, null, ex);
        }

        if (invoice.getBuyer().getJbkjs() == null || invoice.getBuyer().getJbkjs().length() == 0) {
            sendToCir = "No";
        } else {
            sendToCir = "Yes";
        }

        if (invoice == null) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
        }
        if (apiUrl == null || apiUrl.length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("apiUrlError"));
        }
        if (requestID == null || requestID.length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("requestIDError"));
        }
        if (encodedText == null || encodedText.length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("requestBodyError"));
        }

        try {
            // Postavljanje URL-a API-ja
            String urlParams = "requestId=" + requestID + "&sendToCir=" + sendToCir;
            URL url = new URL(apiUrl + "?" + urlParams);

            // Otvaranje HTTP veze prema API-ju
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // Podesavanje parametara za zahtev
            conn.setConnectTimeout(10000); // Vreme cekanja na API je 5 sekundi
            conn.setRequestMethod("POST"); // Metoda zahteva je POST
            conn.setRequestProperty("ApiKey", settings.getKeyAPI()); // ApiKey se salje kroz HTTP zaglavlje
            conn.setRequestProperty("accept", "text/plain"); // ApiKey se salje kroz HTTP zaglavlje
            conn.setRequestProperty("Content-Type", "application/xml"); // Postavljamo Content-Type na application/xml
            conn.setDoOutput(true); // Dozvoljavamo slanje podataka
            conn.setUseCaches(false);

            // Postavljanje Content-Length zaglavlja na osnovu duzine xmlString-a
            conn.setRequestProperty("Content-Length", Integer.toString(encodedText.getBytes().length));

            // Slanje tela zahteva na API
            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream(), StandardCharsets.UTF_8);
            writer.write(encodedText);
            writer.flush();

            // Ispisivanje HTTP odgovora
            int responseCode = conn.getResponseCode();

            if (responseCode == 200) {
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String responseLine;
                StringBuilder response = new StringBuilder();
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }

                try {
                    ObjectMapper objectMapper = JsonMapper.builder()
                            .addModule(new JavaTimeModule())
                            .build();

                    ImportSalesUblResponse importSalesUblResponse = objectMapper.readValue(response.toString(), ImportSalesUblResponse.class);

                    // TODO mark invoice as registrated
                    RegistratedInvoiceStore registratedInvoiceStore = new RegistratedInvoiceStore(this.getLocator());
                    RegistratedInvoice regInvoice = new RegistratedInvoice(importSalesUblResponse.getInvoiceId(), importSalesUblResponse.getPurchaseInvoiceId(), importSalesUblResponse.getSalesInvoiceId(), LocalDateTime.now(), invoice);
                    registratedInvoiceStore.createNewObjectToDatabase(regInvoice);
                } catch (JsonProcessingException ex) {
                    logger.error(ex.toString());
                    logger.error("Get response from api: " + response.toString());
                    return true;
                } catch (SQLException ex) {
                    logger.error(ex.toString());
                    return true;
                }
            } else {
                String responseMessage = conn.getResponseMessage();
                System.out.println("Response Code: " + responseCode);
                System.out.println("Response Message: " + responseMessage);

                try ( BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream()))) {
                    String responseLine;
                    StringBuilder response = new StringBuilder();
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    logger.error("Get response from api: " + response.toString());
                    System.out.println("Get response from api: " + response.toString());
                    throw new SException(response.toString());
                }
            }

            // Zatvaranje HTTP veze
            conn.disconnect();
            System.out.println("13");

        } catch (Exception e) {
            e.printStackTrace();
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }
        return true;
    }

    public boolean registrationOfInvoiceUPLOAD(String invoiceOID) throws SException {
        Invoice invoice = this.getObjectByOid(invoiceOID);
        SettingsBuilder settingsBuilder = new SettingsBuilder();
        Settings settings = settingsBuilder.getSettings();

        // Parameters for http call
        String apiUrl = settings.getUrlImportSalesUbl();
        String requestID = Helper.generateRandomString(settings.getRequestIDcharsNumber());
        String sendToCir;

        if (invoice.getBuyer().getJbkjs() == null || invoice.getBuyer().getJbkjs().length() == 0) {
            sendToCir = "No";
        } else {
            sendToCir = "Yes";
        }

        if (invoice == null) {
            throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
        }
        if (apiUrl == null || apiUrl.length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("apiUrlError"));
        }
        if (requestID == null || requestID.length() == 0) {
            throw new SException(UserMessage.getLocalizedMessage("requestIDError"));
        }

        // Postavljanje URL-a API-ja
        String urlParams = "requestId=" + requestID + "&sendToCir=" + sendToCir;
        URL url;
        try {
            url = new URL(apiUrl + "?" + urlParams);
        } catch (MalformedURLException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }

        // Otvaranje HTTP veze prema API-ju
        HttpURLConnection conn;
        try {
            conn = (HttpURLConnection) url.openConnection();
        } catch (IOException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }

        // Podesavanje parametara za zahtev
        conn.setConnectTimeout(10000); // Vreme cekanja na API je 5 sekundi
        try {
            conn.setRequestMethod("POST"); // Metoda zahteva je POST
        } catch (ProtocolException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }
        conn.setRequestProperty("ApiKey", settings.getKeyAPI()); // ApiKey se salje kroz HTTP zaglavlje
        conn.setRequestProperty("accept", "text/plain"); // ApiKey se salje kroz HTTP zaglavlje

// Postavljanje boundary vrednosti
        String boundary = "-----" + System.currentTimeMillis() + "-----";
        conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

        conn.setDoOutput(true); // Dozvoljavamo slanje podataka

        File f = new File(INVOICE_XML_DIRECTORY);
        if (!(f.exists() && f.isDirectory())) {
            f.mkdir();
        }

        String fileName = "invoice_" + invoice.getDateOfCreate().getYear() + "_" + invoice.getId() + ".xml";
        try {
            FileUtils.writeStringToFile(new File(INVOICE_XML_DIRECTORY + "/" + fileName), this.getXMLForInvoice(invoiceOID), Charset.forName("UTF-8"));
        } catch (IOException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }
        File file = new File(INVOICE_XML_DIRECTORY + "/" + fileName);
        if (!file.exists()) {
            throw new SException(UserMessage.getLocalizedMessage("requestBodyError"));
        }

        // Formiranje tela zahteva
        OutputStream outputStream;
        try {
            outputStream = conn.getOutputStream();
            PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, "UTF-8"), true);
            String lineSeparator = "\r\n";

// Pisanje zaglavlja za datoteku
            writer.append("--" + boundary).append(lineSeparator);
            writer.append("Content-Disposition: form-data; name=\"ublFile\"; filename=\"" + fileName + "\"").append(lineSeparator);
            writer.append("Content-Type: text/xml").append(lineSeparator);
            writer.append(lineSeparator);
            writer.flush();

// Slanje sadržaja datoteke
            try ( FileInputStream fileInputStream = new FileInputStream(file)) {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                outputStream.flush();
            }

// Završavanje zahteva
            writer.append(lineSeparator);
            writer.append("--" + boundary + "--").append(lineSeparator);
            writer.close();

            // Ispisivanje HTTP odgovora
        } catch (IOException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }

        int responseCode = 0;
        try {
            responseCode = conn.getResponseCode();
            // Ispisivanje odgovora koji je stigao od API-ja
        } catch (IOException ex) {
            logger.error(ex.getMessage());
            throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
        }

        if (responseCode == 200) {
            BufferedReader br;
            try {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }
            String responseLine;
            StringBuilder response = new StringBuilder();
            try {
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }

            try {
                ObjectMapper objectMapper = JsonMapper.builder()
                        .addModule(new JavaTimeModule())
                        .build();

                ImportSalesUblResponse importSalesUblResponse = objectMapper.readValue(response.toString(), ImportSalesUblResponse.class);
                // TODO mark invoice as registrated
                RegistratedInvoiceStore registratedInvoiceStore = new RegistratedInvoiceStore(this.getLocator());
                RegistratedInvoice regInvoice = new RegistratedInvoice(importSalesUblResponse.getInvoiceId(), importSalesUblResponse.getPurchaseInvoiceId(), importSalesUblResponse.getSalesInvoiceId(), LocalDateTime.now(), invoice);
                System.out.println("regInvoice OID: " + regInvoice.getOid() + ", regInvoice ID: " + regInvoice.getId());
                registratedInvoiceStore.createNewObjectToDatabase(regInvoice);
                System.out.println("REGISTROVANO USPESNO");
            } catch (JsonProcessingException ex) {
                logger.error("Get response from api: " + response.toString());
                return true;
            } catch (SQLException ex) {
                logger.error(ex.toString());
                return true;
            }

        } else {
            String responseMessage;
            try {
                responseMessage = conn.getResponseMessage();
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }
            System.out.println("Response Code: " + responseCode);
            System.out.println("Response Message: " + responseMessage);
            try ( BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream()))) {
                String responseLine;
                StringBuilder response = new StringBuilder();
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                logger.error("Get response from api: " + response.toString());
                System.out.println("Get response from api: " + response.toString());
                throw new SException(response.toString());
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }
        }

        // Zatvaranje HTTP veze
        conn.disconnect();
        return true;
    }

    private File getExistingPdfForWorkOrder(WorkOrder wo) {
        return new File(WORK_ORDER_PDF_DIRECTORY + "/" + wo.getPdf().getUrl());
    }

    public File getPDFForRegistratedInvoice(Invoice invoice) throws SException {
        try {
            // Uzmi registrovanu fakturu
            RegistratedInvoice regInvoice = new RegistratedInvoiceStore(this.getLocator()).getRegistratedInvoiceByInvoiceId(invoice.getId());
            if (regInvoice == null) {
                throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
            }

            // Idi na api i uzmi tu fakturu
            SettingsBuilder settingsBuilder = new SettingsBuilder();
            Settings settings = settingsBuilder.getSettings();
            String apiUrl = settings.getUrlDownloadSalesUbl();
            HttpURLConnection conn;
            String urlParams = "invoiceId=" + regInvoice.getSalesInvoiceId();
            URL url = new URL(apiUrl + "?" + urlParams);
            try {
                conn = (HttpURLConnection) url.openConnection();
            } catch (IOException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }

            // Podesavanje parametara za zahtev
            conn.setConnectTimeout(10000); // Vreme cekanja na API je 5 sekundi
            try {
                conn.setRequestMethod("GET"); // Metoda zahteva je POST
            } catch (ProtocolException ex) {
                logger.error(ex.getMessage());
                throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
            }
            conn.setRequestProperty("ApiKey", settings.getKeyAPI()); // ApiKey se salje kroz HTTP zaglavlje
            conn.setRequestProperty("accept", "*/*"); // ApiKey se salje kroz HTTP zaglavlje
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line;
                StringBuilder response = new StringBuilder();

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }

                reader.close();

// Pronalaženje početne i krajnje pozicije Base64 stringa
                int startIndex = response.indexOf("<env:DocumentPdf mimeCode=\"application/pdf\">") + "<env:DocumentPdf mimeCode=\"application/pdf\">".length();
                int endIndex = response.indexOf("</env:DocumentPdf>");

// Izdvajanje Base64 stringa
                String base64String = response.substring(startIndex, endIndex);

                // Dekodiranje Base64 stringa
                byte[] decodedBytes = Base64.getDecoder().decode(base64String);

// Kreiranje izlaznog fajla
                File f = new File(INVOICE_PDF_DIRECTORY);
                if (!(f.exists() && f.isDirectory())) {
                    f.mkdir();
                }
                String filename = "invoice_" + invoice.getDateOfCreate().getYear() + "_" + invoice.getDateOfCreate().getMonthValue() + "_" + invoice.getDateOfCreate().getDayOfMonth() + "__" + invoice.getNumber().replace("/", "_") + ".pdf";

                String outputPath = INVOICE_PDF_DIRECTORY + "/" + filename;
                try ( FileOutputStream fos = new FileOutputStream(outputPath)) {
                    // Upisivanje dekodiranog sadržaja u fajl
                    fos.write(decodedBytes);
                }

                return new File(outputPath);
            } else {
                String responseMessage;
                try {
                    responseMessage = conn.getResponseMessage();
                } catch (IOException ex) {
                    logger.error(ex.getMessage());
                    throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
                }
                System.out.println("Response Code: " + responseCode);
                System.out.println("Response Message: " + responseMessage);
                try ( BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream()))) {
                    String responseLine;
                    StringBuilder response = new StringBuilder();
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    logger.error("Get response from api: " + response.toString());
                    System.out.println("Get response from api: " + response.toString());
                    throw new SException(response.toString());
                } catch (IOException ex) {
                    logger.error(ex.getMessage());
                    throw new SException(UserMessage.getLocalizedMessage("apiCallError"));
                }
            }
        } catch (IOException ex) {
            logger.error(ex.getMessage());
        } catch (SQLException ex) {
            logger.error(ex.getMessage());
        }
        throw new SException(UserMessage.getLocalizedMessage("invoiceNotFound"));
    }
}

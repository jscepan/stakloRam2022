package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.ResponseWithCount;
import com.stakloram.backend.database.objects.BuyerStore;
import com.stakloram.backend.database.objects.CityStore;
import com.stakloram.backend.database.objects.ImageStore;
import com.stakloram.backend.database.objects.PdfStore;
import com.stakloram.backend.database.objects.WorkOrderItemStore;
import com.stakloram.backend.database.objects.WorkOrderStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Image;
import com.stakloram.backend.models.Pdf;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class WorkOrderBuilder extends BaseBuilder {

    private final WorkOrderItemStore WORK_ORDER_ITEM_STORE = new WorkOrderItemStore();
    private final BuyerStore BUYER_STORE = new BuyerStore();
    private final CityStore CITY_STORE = new CityStore();
    private final ImageStore IMAGE_STORE = new ImageStore();
    private final PdfStore PDF_STORE = new PdfStore();

    @Override
    public void setObjectStore() {
        this.objectStore = new WorkOrderStore();
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name", "work_order_number");
        this.databaseColumnsForAdvanceFilter.put("buyer", "work_order_buyer_buyer_id");
        this.databaseColumnsForAttributes.put("from_date", "date_of_create");
        this.databaseColumnsForAttributes.put("to_date", "date_of_create");
    }

    @Override
    public BaseModel createNewObject(BaseModel object, Connection conn) throws SException {
        WorkOrder workOrder = (WorkOrder) object;
        super.createNewObject(object, conn);
        for (WorkOrderItem woi : workOrder.getWorkOrderItems()) {
            try {
                WORK_ORDER_ITEM_STORE.createNewObjectToDatabase(woi, workOrder.getId(), conn);
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        for (Image image : workOrder.getImages()) {
            try {
                IMAGE_STORE.createNewObjectToDatabase(image, workOrder.getOid(), conn);
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        return workOrder;
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object, Connection conn) throws SException {
        try {
            WorkOrder workOrder = (WorkOrder) super.modifyObject(oid, object, conn);
            List<WorkOrderItem> oldWorkOrderItems = new ArrayList<>();
            ResultSet resultSet = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId(), conn);
            while (resultSet.next()) {
                oldWorkOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(resultSet));
            }
            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferences = Helper.findDifferenceBetweenLists(workOrder.getWorkOrderItems(), oldWorkOrderItems);
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_CREATE)) {
                WORK_ORDER_ITEM_STORE.createNewObjectToDatabase(workOrderItem, workOrder.getId(), conn);
            }
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_UPDATE)) {
                WORK_ORDER_ITEM_STORE.modifyObject(workOrderItem.getOid(), workOrderItem, conn);
            }
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                WORK_ORDER_ITEM_STORE.deleteObjectByOid(workOrderItem.getOid(), conn);
            }

            List<Image> oldWorkOrderImages = new ArrayList<>();
            ResultSet resultSetImages = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId(), conn);
            while (resultSetImages.next()) {
                oldWorkOrderImages.add(IMAGE_STORE.getObjectFromResultSet(resultSetImages));
            }

            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesImages = Helper.findDifferenceBetweenLists(workOrder.getImages(), oldWorkOrderImages);
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_CREATE)) {
                IMAGE_STORE.createNewObjectToDatabase(image, workOrder.getOid(), conn);
            }
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_UPDATE)) {
                IMAGE_STORE.modifyObject(image.getOid(), image, conn);
            }
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_DELETE)) {
                IMAGE_STORE.deleteObjectByOid(image.getOid(), conn);
            }
            return workOrder;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjectByOid(String oid, Connection conn) throws SException {
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + BaseModel.getIdFromOid(oid), conn);
            while (rs.next()) {
                WorkOrderItem woi = WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs);
                WORK_ORDER_ITEM_STORE.deleteObjectByOid(woi.getOid(), conn);
            }
            ResultSet rsImages = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + BaseModel.getIdFromOid(oid), conn);
            while (rsImages.next()) {
                Image image = IMAGE_STORE.getObjectFromResultSet(rsImages);
                IMAGE_STORE.deleteObjectByOid(image.getOid(), conn);
            }
            return this.objectStore.deleteObjectByOid(oid, conn);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("referrencialError") + " - " + UserMessage.getLocalizedMessage("removeThisObjectFromOtherPlacesFirst"));
        }
    }

    @Override
    public BaseModel getObjectByOid(String oid, Connection conn) throws SException {
        WorkOrder workOrder = (WorkOrder) super.getObjectByOid(oid, conn);
        Buyer buyer;
        try {
            buyer = (Buyer) BUYER_STORE.getObjectByOid(workOrder.getBuyer().getOid(), conn);
            buyer.setCity((City) CITY_STORE.getObjectByOid(buyer.getCity().getOid(), conn));
            workOrder.setBuyer(buyer);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        List<WorkOrderItem> workOrderItems = new ArrayList<>();
        List<Image> images = new ArrayList<>();
        Pdf pdf = null;
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId(), conn);
            while (rs.next()) {
                workOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs));
            }
            rs = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId(), conn);
            while (rs.next()) {
                images.add(IMAGE_STORE.getObjectFromResultSet(rs));
            }
            if (workOrder.getPdf() != null && workOrder.getPdf().getOid() != null) {
                pdf = (Pdf) PDF_STORE.getObjectByOid(workOrder.getPdf().getOid(), conn);
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        workOrder.setWorkOrderItems(workOrderItems);
        workOrder.setImages(images);
        if (pdf != null) {
            workOrder.setPdf(pdf);
        }
        return workOrder;
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top, Connection conn) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top, conn);
            ResultSet rs = rwc.getResultSet();
            while (rs.next()) {
                WorkOrder workOrder = (WorkOrder) this.getObjectStore().getObjectFromResultSet(rs);
                workOrder.setBuyer(BUYER_STORE.getObjectFromResultSet(rs));
                objects.add(workOrder);
            }
            return new ArrayResponse(objects, rwc.getCount());
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public List<WorkOrder> getAllUnsettledWorkOrder(String buyerOID, Connection conn) throws SException {
        try {
            List<WorkOrder> objects = new ArrayList<>();
            String from = this.getSqlFromObjectStores(Arrays.asList(WORK_ORDER_ITEM_STORE, this.getObjectStore()));
            String where = (buyerOID.isEmpty() ? ("") : ((this.getObjectStore().getTableName() + "_buyer_buyer_id=" + BaseModel.getIdFromOid(buyerOID) + " AND "))) + WORK_ORDER_ITEM_STORE.getTableName() + "_settled=" + false;
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(from, where, conn);
            while (rs.next()) {
                WorkOrder workOrder = (WorkOrder) this.getObjectStore().getObjectFromResultSet(rs);
                workOrder.setBuyer((Buyer) BUYER_STORE.getObjectByOid(workOrder.getBuyer().getOid(), conn));
                WorkOrderItem workOrderItem = (WorkOrderItem) WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs);

                List<WorkOrder> alreadyExists = objects.stream().filter(o -> o.getOid().equals(workOrder.getOid())).collect(Collectors.toList());
                if (!alreadyExists.isEmpty()) {
                    alreadyExists.get(0).getWorkOrderItems().add(workOrderItem);
                } else {
                    workOrder.getWorkOrderItems().add(workOrderItem);
                    objects.add(workOrder);
                }
            }
            return objects;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean toggleSettledForWorkOrder(String workOrderOID, boolean settled, Connection conn) throws SException {
        WorkOrder workOrder = (WorkOrder) this.getObjectByOid(workOrderOID, conn);
        for (WorkOrderItem woi : workOrder.getWorkOrderItems()) {
            try {
                WORK_ORDER_ITEM_STORE.setSettledForWorkOrderItem(woi.getOid(), settled, conn);
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        return true;
    }

    public long getNextWorkOrderNumber(int year, Connection conn) throws SException {
        try {
            return ((WorkOrderStore) this.getObjectStore()).getLastWorkOrderNumber(year, conn) + 1;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public Set<String> getAllWorkOrderItemDescriptions(Connection conn) throws SException {
        Set<String> items = new HashSet<>();
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsForSpecificColumn("work_order_item_description", conn);
            while (rs.next()) {
                items.add(rs.getString("work_order_item_description"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return items;
    }

    public boolean changeBuyer(String workOrderOID, String buyerOID, Connection conn) throws SException {
        try {
            return ((WorkOrderStore) this.objectStore).changeBuyer(workOrderOID, buyerOID, conn);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean assignPdf(WorkOrder workOrder, Pdf pdf, Connection conn) throws SException {
        try {
            boolean assigned = ((WorkOrderStore) this.objectStore).assignPdf(workOrder.getOid(), pdf.getOid(), conn);
            workOrder.setPdf(pdf);
            return assigned;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}

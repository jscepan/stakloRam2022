package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.ResponseWithCount;
import com.stakloram.application.database.objects.BuyerStore;
import com.stakloram.application.database.objects.CityStore;
import com.stakloram.application.database.objects.ImageStore;
import com.stakloram.application.database.objects.WorkOrderItemStore;
import com.stakloram.application.database.objects.WorkOrderStore;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.ArrayResponse;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Buyer;
import com.stakloram.application.models.City;
import com.stakloram.application.models.Image;
import com.stakloram.application.models.Locator;
import com.stakloram.application.models.SearchRequest;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.models.WorkOrder;
import com.stakloram.application.models.WorkOrderItem;
import com.stakloram.application.services.impl.builder.BaseBuilder;
import com.stakloram.application.util.Helper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public class WorkOrderBuilder extends BaseBuilder {

    private final WorkOrderItemStore WORK_ORDER_ITEM_STORE = new WorkOrderItemStore(this.getLocator());
    private final BuyerStore BUYER_STORE = new BuyerStore(this.getLocator());
    private final CityStore CITY_STORE = new CityStore(this.getLocator());
    private final ImageStore IMAGE_STORE = new ImageStore(this.getLocator());

    public WorkOrderBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public BaseModel createNewObject(BaseModel object) throws SException {
        WorkOrder workOrder = (WorkOrder) object;
        super.createNewObject(object);
        for (WorkOrderItem woi : workOrder.getWorkOrderItems()) {
            try {
                WORK_ORDER_ITEM_STORE.createNewObjectToDatabase(woi, workOrder.getId());
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        for (Image image : workOrder.getImages()) {
            try {
                IMAGE_STORE.createNewObjectToDatabase(image, workOrder.getOid());
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        return workOrder;
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel object) throws SException {
        try {
            WorkOrder workOrder = (WorkOrder) super.modifyObject(oid, object);
            List<WorkOrderItem> oldWorkOrderItems = new ArrayList<>();
            ResultSet resultSet = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId());
            while (resultSet.next()) {
                oldWorkOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(resultSet));
            }
            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferences = Helper.findDifferenceBetweenLists(workOrder.getWorkOrderItems(), oldWorkOrderItems);
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_CREATE)) {
                WORK_ORDER_ITEM_STORE.createNewObjectToDatabase(workOrderItem, workOrder.getId());
            }
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_UPDATE)) {
                WORK_ORDER_ITEM_STORE.modifyObject(workOrderItem.getOid(), workOrderItem);
            }
            for (BaseModel workOrderItem : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                WORK_ORDER_ITEM_STORE.deleteObjectByOid(workOrderItem.getOid());
            }

            List<Image> oldWorkOrderImages = new ArrayList<>();
            ResultSet resultSetImages = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId());
            while (resultSetImages.next()) {
                oldWorkOrderImages.add(IMAGE_STORE.getObjectFromResultSet(resultSetImages));
            }

            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferencesImages = Helper.findDifferenceBetweenLists(workOrder.getImages(), oldWorkOrderImages);
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_CREATE)) {
                IMAGE_STORE.createNewObjectToDatabase(image, workOrder.getOid());
            }
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_UPDATE)) {
                IMAGE_STORE.modifyObject(image.getOid(), image);
            }
            for (BaseModel image : mapOfDifferencesImages.get(Helper.Action.FOR_DELETE)) {
                IMAGE_STORE.deleteObjectByOid(image.getOid());
            }
            return workOrder;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    @Override
    public boolean deleteObjectByOid(String oid) throws SException {
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + BaseModel.getIdFromOid(oid));
            while (rs.next()) {
                WorkOrderItem woi = WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs);
                WORK_ORDER_ITEM_STORE.deleteObjectByOid(woi.getOid());
            }
            ResultSet rsImages = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + BaseModel.getIdFromOid(oid));
            while (rsImages.next()) {
                Image image = IMAGE_STORE.getObjectFromResultSet(rsImages);
                IMAGE_STORE.deleteObjectByOid(image.getOid());
            }
            return this.objectStore.deleteObjectByOid(oid);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("referrencialError") + " - " + UserMessage.getLocalizedMessage("removeThisObjectFromOtherPlacesFirst"));
        }
    }

    @Override
    public BaseModel getObjectByOid(String oid) throws SException {
        WorkOrder workOrder = (WorkOrder) super.getObjectByOid(oid);
        Buyer buyer;
        try {
            buyer = (Buyer) BUYER_STORE.getObjectByOid(workOrder.getBuyer().getOid());
            buyer.setCity((City) CITY_STORE.getObjectByOid(buyer.getCity().getOid()));
            workOrder.setBuyer(buyer);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        List<WorkOrderItem> workOrderItems = new ArrayList<>();
        List<Image> images = new ArrayList<>();
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsFromDatabase(WORK_ORDER_ITEM_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId());
            while (rs.next()) {
                workOrderItems.add(WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs));
            }
            rs = IMAGE_STORE.getAllObjectsFromDatabase(IMAGE_STORE.getTableName() + "_work_order_work_order_id=" + workOrder.getId());
            while (rs.next()) {
                images.add(IMAGE_STORE.getObjectFromResultSet(rs));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        workOrder.setWorkOrderItems(workOrderItems);
        workOrder.setImages(images);
        return workOrder;
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new WorkOrderStore(this.getLocator());
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForQuickSearch = Arrays.asList("buyer_name");
        this.databaseColumnsForAdvanceFilter.put("buyer", "work_order_buyer_buyer_id");
    }

    @Override
    public ArrayResponse searchObjects(SearchRequest searchObject, Long skip, Long top) throws SException {
        try {
            List<BaseModel> objects = new ArrayList<>();
            ResponseWithCount rwc = super.searchObjects(this.getSqlFromAppendObjectStores(Arrays.asList(BUYER_STORE)), searchObject, skip, top);
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

    public List<WorkOrder> getAllUnsettledWorkOrder(String buyerOID) throws SException {
        try {
            List<WorkOrder> objects = new ArrayList<>();
            String from = this.getSqlFromObjectStores(Arrays.asList(WORK_ORDER_ITEM_STORE, this.getObjectStore()));
            String where = this.getObjectStore().getTableName() + "_buyer_buyer_id=" + BaseModel.getIdFromOid(buyerOID) + " AND " + WORK_ORDER_ITEM_STORE.getTableName() + "_settled=" + false;
            ResultSet rs = this.getObjectStore().getAllObjectsFromDatabase(from, where);
            while (rs.next()) {
                WorkOrder workOrder = (WorkOrder) this.getObjectStore().getObjectFromResultSet(rs);
                Optional<WorkOrder> alreadyExists = objects.stream().filter(o -> o.getOid().equals(workOrder.getOid())).findFirst();
                WorkOrderItem workOrderItem = (WorkOrderItem) WORK_ORDER_ITEM_STORE.getObjectFromResultSet(rs);
                if (alreadyExists.isPresent()) {
                    alreadyExists.get().getWorkOrderItems().add(workOrderItem);
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

    public long getNextWorkOrderNumber(int year) throws SException {
        try {
            return ((WorkOrderStore) this.getObjectStore()).getLastWorkOrderNumber(year) + 1;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public Set<String> getAllWorkOrderItemDescriptions() throws SException {
        Set<String> items = new HashSet<>();
        try {
            ResultSet rs = WORK_ORDER_ITEM_STORE.getAllObjectsForSpecificColumn("work_order_item_description");
            while (rs.next()) {
                items.add(rs.getString("work_order_item_description"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
        return items;
    }
}
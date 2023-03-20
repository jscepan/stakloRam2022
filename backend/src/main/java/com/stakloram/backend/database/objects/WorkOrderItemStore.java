package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import static com.stakloram.backend.database.ObjectStore.DATABASE_NAME;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.models.WorkOrderItem;
import com.stakloram.backend.models.WorkOrderItem.UOM;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class WorkOrderItemStore extends ObjectStore {

    public WorkOrderItemStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "work_order_item";
    }

    public WorkOrderItem createNewObjectToDatabase(BaseModel model, Long workOrderId) throws SQLException {
        WorkOrderItem object = (WorkOrderItem) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getUom().name());
        st.setDouble(++i, object.getDimension1());
        st.setDouble(++i, object.getDimension2());
        st.setDouble(++i, object.getDimension3());
        st.setDouble(++i, object.getQuantity());
        st.setDouble(++i, object.getSumQuantity());
        st.setString(++i, object.getNote());
        st.setLong(++i, workOrderId);
        st.setNull(++i, java.sql.Types.NULL);
        st.setBoolean(++i, object.isSettled());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public WorkOrderItem createNewObjectToDatabase(BaseModel model) throws SQLException {
        return null;
    }

    @Override
    public WorkOrderItem modifyObject(String oid, BaseModel model) throws SQLException {
        WorkOrderItem object = (WorkOrderItem) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_description=?,"
                + this.getTableName() + "_uom=?,"
                + this.getTableName() + "_dimension1=?,"
                + this.getTableName() + "_dimension2=?,"
                + this.getTableName() + "_dimension3=?,"
                + this.getTableName() + "_quantity=?,"
                + this.getTableName() + "_sum_quantity=?,"
                + this.getTableName() + "_note=?,"
                + this.getTableName() + "_settled=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getUom().name());
        st.setDouble(++i, object.getDimension1());
        st.setDouble(++i, object.getDimension2());
        st.setDouble(++i, object.getDimension3());
        st.setDouble(++i, object.getQuantity());
        st.setDouble(++i, object.getSumQuantity());
        st.setString(++i, object.getNote());
        st.setBoolean(++i, object.isSettled());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    public void setInvoiceItemForWorkOrderItem(String workOrderItemOid, String invoiceItemOid) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoice_item_invoice_item_id=?, "
                + this.getTableName() + "_settled=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(invoiceItemOid));
        st.setBoolean(++i, true);
        st.setLong(++i, BaseModel.getIdFromOid(workOrderItemOid));
        st.executeUpdate();
    }

    public void setSettledForWorkOrderItem(String workOrderItemOid, boolean settled) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_settled=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setBoolean(++i, settled);
        st.setLong(++i, BaseModel.getIdFromOid(workOrderItemOid));
        st.executeUpdate();
    }

    public boolean removeInvoiceItemForWorkOrderItem(String workOrderItemOid) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoice_item_invoice_item_id=null, "
                + this.getTableName() + "_settled=false"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(workOrderItemOid));
        return st.executeUpdate() > 0;
    }

    public boolean removeWorkOrdersItemForInvoiceItemOid(String invoiceItemOid) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoice_item_invoice_item_id=null, "
                + this.getTableName() + "_settled=false"
                + " WHERE " + this.getTableName() + "_invoice_item_invoice_item_id" + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(invoiceItemOid));
        return st.executeUpdate() > 0;
    }

    @Override
    public WorkOrderItem getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        WorkOrderItem object = new WorkOrderItem(resultSet.getLong(this.getPrimaryKey()));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        object.setUom(UOM.valueOf(resultSet.getString(this.getTableName() + "_uom")));
        object.setDimension1(resultSet.getDouble(this.getTableName() + "_dimension1"));
        object.setDimension2(resultSet.getDouble(this.getTableName() + "_dimension2"));
        object.setDimension3(resultSet.getDouble(this.getTableName() + "_dimension3"));
        object.setQuantity(resultSet.getDouble(this.getTableName() + "_quantity"));
        object.setSumQuantity(resultSet.getDouble(this.getTableName() + "_sum_quantity"));
        object.setNote(resultSet.getString(this.getTableName() + "_note"));
        object.setSettled(resultSet.getBoolean(this.getTableName() + "_settled"));
        return object;
    }

    public ResultSet getAllObjectsForSpecificColumn(String columnName) throws SQLException {
        return this.getConn().createStatement().executeQuery("SELECT " + columnName + " from " + this.getDefaultFromClausule());
    }

    public String getWorkOrderOidForWorkOrderItemOid(String workOrderItemOid) throws SQLException {
        String oid = "";
        Statement st = this.getConn().createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + ConnectionToDatabase.getDatabaseName() + "." + this.tableName + " WHERE " + ConnectionToDatabase.getDatabaseName() + "." + this.tableName + "." + this.getPrimaryKey() + "=" + BaseModel.getIdFromOid(workOrderItemOid));
        while (resultSet.next()) {
            oid = new WorkOrder(resultSet.getLong(this.getTableName() + "_work_order_work_order_id")).getOid();
        }
        return oid;
    }
}

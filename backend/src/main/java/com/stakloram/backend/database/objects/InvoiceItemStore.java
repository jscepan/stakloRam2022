package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.InvoiceItem;
import com.stakloram.backend.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class InvoiceItemStore extends ObjectStore {

    public InvoiceItemStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "invoice_item";
    }

    public InvoiceItem createNewObjectToDatabase(BaseModel model, Long invoiceId) throws SQLException {
        InvoiceItem object = (InvoiceItem) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getDescription());
        st.setDouble(++i, object.getNetPrice());
        st.setDouble(++i, object.getVatRate());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossPrice());
        st.setLong(++i, invoiceId);

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public InvoiceItem createNewObjectToDatabase(BaseModel model) throws SQLException {
        return null;
    }

    @Override
    public InvoiceItem modifyObject(String oid, BaseModel model) throws SQLException {
        InvoiceItem object = (InvoiceItem) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_description=?,"
                + this.getTableName() + "_net_price=?,"
                + this.getTableName() + "_vat_rate=?,"
                + this.getTableName() + "_vat_amount=?,"
                + this.getTableName() + "_gross_price=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getDescription());
        st.setDouble(++i, object.getNetPrice());
        st.setDouble(++i, object.getVatRate());
        st.setDouble(++i, object.getVatAmount());
        st.setDouble(++i, object.getGrossPrice());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public InvoiceItem getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        InvoiceItem object = new InvoiceItem(resultSet.getLong(this.getPrimaryKey()));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        object.setNetPrice(resultSet.getDouble(this.getTableName() + "_net_price"));
        object.setVatRate(resultSet.getDouble(this.getTableName() + "_vat_rate"));
        object.setVatAmount(resultSet.getDouble(this.getTableName() + "_vat_amount"));
        object.setGrossPrice(resultSet.getDouble(this.getTableName() + "_gross_price"));
        return object;
    }
}

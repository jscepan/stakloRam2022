package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Invoice;
import com.stakloram.backend.models.RegistratedInvoice;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RegistratedInvoiceStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "registrated_invoice";
    }

    @Override
    public RegistratedInvoice createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        RegistratedInvoice object = (RegistratedInvoice) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setInt(++i, object.getInvoiceId());
        st.setInt(++i, object.getPurchaseInvoiceId());
        st.setInt(++i, object.getSalesInvoiceId());
        st.setTimestamp(++i, Helper.convertLocalDateToSqlTime(object.getDate()));
        st.setLong(++i, object.getInvoice().getId());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        RegistratedInvoice object = (RegistratedInvoice) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoiceid=?,"
                + this.getTableName() + "_purchaseinvoiceid=?,"
                + this.getTableName() + "_salesinvoiceid=?,"
                + this.getTableName() + "_date=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setInt(++i, object.getInvoiceId());
        st.setInt(++i, object.getPurchaseInvoiceId());
        st.setInt(++i, object.getSalesInvoiceId());
        st.setTimestamp(++i, Helper.convertLocalDateToSqlTime(object.getDate()));
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public RegistratedInvoice getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        RegistratedInvoice object = new RegistratedInvoice(resultSet.getLong(this.getPrimaryKey()));
        object.setInvoiceId(resultSet.getInt(this.getTableName() + "_invoiceid"));
        object.setPurchaseInvoiceId(resultSet.getInt(this.getTableName() + "_purchaseinvoiceid"));
        object.setSalesInvoiceId(resultSet.getInt(this.getTableName() + "_salesinvoiceid"));
        object.setDate(Helper.convertStringToLocalDateTime(resultSet.getString(this.getTableName() + "_date")));
        object.setInvoice(new Invoice(resultSet.getLong(this.getTableName() + "_invoice_invoice_id")));
        return object;
    }

    public RegistratedInvoice getRegistratedInvoiceByInvoiceId(Long id) throws SQLException, SException {
        ResultSet rs = this.getAllObjectsFromDatabase(this.getTableName() + "_invoice_invoice_id=" + id);
        if (rs.next()) {
            return this.getObjectFromResultSet(rs);
        }
        return null;
    }
}

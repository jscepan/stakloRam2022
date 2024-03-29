package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Pdf;
import com.stakloram.backend.models.WorkOrder;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class WorkOrderStore extends ObjectStore {

    @Override
    public void setTableName() {
        this.tableName = "work_order";
    }

    @Override
    public WorkOrder createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        try {
            WorkOrder object = (WorkOrder) model;
            int i = 0;
            PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
            st.setLong(++i, this.getLastWorkOrderNumber(object.getDateOfCreate().getYear(), conn) + 1);
            st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
            st.setString(++i, object.getPlaceOfIssue());
            st.setString(++i, object.getForPerson());
            st.setString(++i, object.getDescription());
            st.setString(++i, object.getNote());
            st.setLong(++i, object.getBuyer().getId());
            st.setObject(++i, null);

            if (st.executeUpdate() > 0) {
                ResultSet rs = st.getGeneratedKeys();
                rs.next();
                object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
                return object;
            }
            return null;
        } catch (SException ex) {
            throw new SQLException();
        }
    }

    @Override
    public WorkOrder modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        WorkOrder object = (WorkOrder) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_number=?,"
                + this.getTableName() + "_date_of_create=?,"
                + this.getTableName() + "_place_of_issue=?,"
                + this.getTableName() + "_for_person=?,"
                + this.getTableName() + "_description=?,"
                + this.getTableName() + "_note=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, object.getNumber());
        st.setDate(++i, java.sql.Date.valueOf(object.getDateOfCreate()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setString(++i, object.getForPerson());
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getNote());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    public boolean changeBuyer(String oid, String buyerOID, Connection conn) throws SQLException {
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_buyer_buyer_id=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(buyerOID));
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        return st.executeUpdate() > 0;
    }

    public boolean assignPdf(String workOrderOID, String pdfOID, Connection conn) throws SQLException {
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_pdf_pdf_id=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(pdfOID));
        st.setLong(++i, BaseModel.getIdFromOid(workOrderOID));
        return st.executeUpdate() > 0;
    }

    @Override
    public WorkOrder getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        WorkOrder object = new WorkOrder(resultSet.getLong(this.getPrimaryKey()));
        object.setNumber(resultSet.getInt(this.getTableName() + "_number"));
        object.setDateOfCreate(resultSet.getDate(this.getTableName() + "_date_of_create").toLocalDate());
        object.setPlaceOfIssue(resultSet.getString(this.getTableName() + "_place_of_issue"));
        object.setForPerson(resultSet.getString(this.getTableName() + "_for_person"));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        object.setNote(resultSet.getString(this.getTableName() + "_note"));
        object.setBuyer(new Buyer(resultSet.getLong(this.getTableName() + "_buyer_buyer_id")));
        object.setPdf(resultSet.getLong(this.getTableName() + "_pdf_pdf_id") > 0 ? (new Pdf(resultSet.getLong(this.getTableName() + "_pdf_pdf_id"))) : null);
        return object;
    }

    public long getLastWorkOrderNumber(int year, Connection conn) throws SQLException, SException {
        long lastWorkOrderNumber = 0;
        Statement st = conn.createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " WHERE work_order_number=(SELECT MAX(work_order_number) FROM " + DATABASE_NAME + "." + this.tableName + " WHERE year(work_order_date_of_create)=" + year + ") and year(work_order_date_of_create)=" + year);
        while (resultSet.next()) {
            lastWorkOrderNumber = resultSet.getLong(this.getTableName() + "_number");
        }
        return lastWorkOrderNumber;
    }
}

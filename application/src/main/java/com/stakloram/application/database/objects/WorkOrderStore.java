package com.stakloram.application.database.objects;

import com.stakloram.application.database.ConnectionToDatabase;
import com.stakloram.application.database.ObjectStore;
import static com.stakloram.application.database.ObjectStore.DATABASE_NAME;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Buyer;
import com.stakloram.application.models.Locator;
import com.stakloram.application.models.WorkOrder;
import com.stakloram.application.util.Helper;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class WorkOrderStore extends ObjectStore {

    public WorkOrderStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "work_order";
    }

    @Override
    public WorkOrder createNewObjectToDatabase(BaseModel model) throws SQLException {
        WorkOrder object = (WorkOrder) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setLong(++i, this.getLastWorkOrderNumber(object.getDateOfCreate().getYear()) + 1);
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setString(++i, object.getPlaceOfIssue());
        st.setString(++i, object.getForPerson());
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getNote());
        st.setLong(++i, object.getBuyer().getId());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public WorkOrder modifyObject(String oid, BaseModel model) throws SQLException {
        WorkOrder object = (WorkOrder) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
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
        return object;
    }

    public long getLastWorkOrderNumber(int year) throws SQLException {
        long lastWorkOrderNumber = 0;
        Statement st = this.getConn().createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE work_order_number=(SELECT MAX(work_order_number) FROM " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE year(work_order_date_of_create)=" + year + ") and year(work_order_date_of_create)=" + year);
        while (resultSet.next()) {
            lastWorkOrderNumber = resultSet.getLong(this.getTableName() + "_number");
        }
        return lastWorkOrderNumber;
    }
}

package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import static com.stakloram.backend.database.ObjectStore.DATABASE_NAME;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.InvoiceItem;
import com.stakloram.backend.models.Service;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.Service.ServiceStatus;
import com.stakloram.backend.models.Service.ServiceType;
import com.stakloram.backend.models.User;
import com.stakloram.backend.util.Helper;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ServiceStore extends ObjectStore {

    public ServiceStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "service";
    }

    @Override
    public Service createNewObjectToDatabase(BaseModel model) throws SQLException {
        Service object = (Service) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getType().name());
        st.setLong(++i, this.getLastServiceNumber(object.getDateOfCreate().getYear()) + 1);
        st.setDate(++i, Helper.convertLocalDateToSqlDate(object.getDateOfCreate()));
        st.setString(++i, object.getStatus().name());
        st.setString(++i, object.getTitle());
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getParentOid());
        st.setLong(++i, object.getBuyer().getId());
        st.setLong(++i, object.getCurrentUser().getId());
        if (object.getInvoiceItemOid() == null) {
            st.setNull(++i, java.sql.Types.NULL);
        } else {
            st.setLong(++i, BaseModel.getIdFromOid(object.getInvoiceItemOid()));
        }

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Service modifyObject(String oid, BaseModel model) throws SQLException {
        Service object = (Service) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_type=?,"
                + this.getTableName() + "_number=?,"
                + this.getTableName() + "_date_of_create=?,"
                + this.getTableName() + "_status=?,"
                + this.getTableName() + "_title=?,"
                + this.getTableName() + "_description=?,"
                + this.getTableName() + "_parent_oid=?,"
                + this.getTableName() + "_buyer_buyer_id=?,"
                + this.getTableName() + "_user_user_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getType().name());
        st.setLong(++i, object.getNumber());
        st.setDate(++i, java.sql.Date.valueOf(object.getDateOfCreate()));
        st.setString(++i, object.getStatus().name());
        st.setString(++i, object.getTitle());
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getParentOid());
        st.setLong(++i, object.getBuyer().getId());
        st.setLong(++i, object.getCurrentUser().getId());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    public void setInvoiceItemForService(String serviceOid, String invoiceItemOid) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoice_item_invoice_item_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(invoiceItemOid));
        st.setLong(++i, BaseModel.getIdFromOid(serviceOid));
        st.executeUpdate();
    }

    public boolean removeInvoiceItemForService(String serviceOid) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_invoice_item_invoice_item_id=null"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setLong(++i, BaseModel.getIdFromOid(serviceOid));
        return st.executeUpdate() > 0;
    }

    @Override
    public Service getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Service object = new Service(resultSet.getLong(this.getPrimaryKey()));
        object.setType(ServiceType.valueOf(resultSet.getString(this.getTableName() + "_type")));
        object.setNumber(resultSet.getLong(this.getTableName() + "_number"));
        object.setDateOfCreate(resultSet.getDate(this.getTableName() + "_date_of_create").toLocalDate());
        object.setStatus(ServiceStatus.valueOf(resultSet.getString(this.getTableName() + "_status")));
        object.setTitle(resultSet.getString(this.getTableName() + "_title"));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        object.setParentOid(resultSet.getString(this.getTableName() + "_parent_oid"));
        object.setBuyer(new Buyer(resultSet.getLong(this.getTableName() + "_buyer_buyer_id")));
        object.setCurrentUser(new User(resultSet.getLong(this.getTableName() + "_user_user_id")));
        object.setInvoiceItemOid(new InvoiceItem(resultSet.getLong(this.getTableName() + "_invoice_item_invoice_item_id")).getOid());
        return object;
    }

    public long getLastServiceNumber(int year) throws SQLException {
        long lastServiceNumber = 0;
        Statement st = this.getConn().createStatement();
        ResultSet resultSet = st.executeQuery("SELECT * from " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE " + this.getPrimaryKey() + "=(SELECT MAX(service_number) FROM " + ConnectionToDatabase.DATABASE_NAME + "." + this.tableName + " WHERE year(service_date_of_create)=" + year + ")");
        while (resultSet.next()) {
            lastServiceNumber = resultSet.getLong(this.getTableName() + "_number");
        }
        return lastServiceNumber;
    }
}

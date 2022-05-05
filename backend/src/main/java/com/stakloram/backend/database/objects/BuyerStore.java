package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Buyer;
import com.stakloram.backend.models.Buyer.BuyerType;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BuyerStore extends ObjectStore {

    public BuyerStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        this.tableName = "buyer";
    }

    @Override
    public Buyer createNewObjectToDatabase(BaseModel model) throws SQLException {
        Buyer object = (Buyer) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getType().name());
        st.setString(++i, object.getName());
        st.setString(++i, object.getAddress());
        st.setString(++i, object.getAddressContact());
        st.setString(++i, object.getMaticalNumber());
        st.setString(++i, object.getPib());
        st.setString(++i, object.getContactPerson());
        st.setString(++i, object.getPhoneNumberFix());
        st.setString(++i, object.getPhoneNumberMobile());
        st.setString(++i, object.getEmail());
        st.setString(++i, object.getGender() == null ? null : object.getGender().name());
        st.setLong(++i, object.getCity().getId());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Buyer modifyObject(String oid, BaseModel model) throws SQLException {
        Buyer object = (Buyer) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_type=?,"
                + this.getTableName() + "_name=?,"
                + this.getTableName() + "_address=?,"
                + this.getTableName() + "_address_contact=?,"
                + this.getTableName() + "_matical_number=?,"
                + this.getTableName() + "_pib=?,"
                + this.getTableName() + "_contact_person=?,"
                + this.getTableName() + "_phone_number_fix=?,"
                + this.getTableName() + "_phone_number_mobile=?,"
                + this.getTableName() + "_email=?,"
                + this.getTableName() + "_gender=?,"
                + this.getTableName() + "_city_city_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getType().name());
        st.setString(++i, object.getName());
        st.setString(++i, object.getAddress());
        st.setString(++i, object.getAddressContact());
        st.setString(++i, object.getMaticalNumber());
        st.setString(++i, object.getPib());
        st.setString(++i, object.getContactPerson());
        st.setString(++i, object.getPhoneNumberFix());
        st.setString(++i, object.getPhoneNumberMobile());
        st.setString(++i, object.getEmail());
        st.setString(++i, object.getGender() == null ? null : object.getGender().name());
        st.setLong(++i, object.getCity().getId());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Buyer getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Buyer object = new Buyer(resultSet.getLong(this.getPrimaryKey()));
        object.setType(BuyerType.valueOf(resultSet.getString(this.getTableName() + "_type")));
        object.setName(resultSet.getString(this.getTableName() + "_name"));
        object.setAddress(resultSet.getString(this.getTableName() + "_address"));
        object.setAddressContact(resultSet.getString(this.getTableName() + "_address_contact"));
        object.setMaticalNumber(resultSet.getString(this.getTableName() + "_matical_number"));
        object.setPib(resultSet.getString(this.getTableName() + "_pib"));
        object.setContactPerson(resultSet.getString(this.getTableName() + "_contact_person"));
        object.setPhoneNumberFix(resultSet.getString(this.getTableName() + "_phone_number_fix"));
        object.setPhoneNumberMobile(resultSet.getString(this.getTableName() + "_phone_number_mobile"));
        object.setEmail(resultSet.getString(this.getTableName() + "_email"));
        object.setGender(resultSet.getString(this.getTableName() + "_gender") == null ? null : Buyer.GenderType.valueOf(resultSet.getString(this.getTableName() + "_gender")));
        object.setCity(new City(resultSet.getLong(this.getTableName() + "_city_city_id")));
        return object;
    }
}

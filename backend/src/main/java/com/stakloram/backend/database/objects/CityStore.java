package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.City;
import com.stakloram.backend.models.Country;
import com.stakloram.backend.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CityStore extends ObjectStore {

    public CityStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        super.tableName = "city";
    }

    @Override
    public City createNewObjectToDatabase(BaseModel model) throws SQLException {
        City object = (City) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getZipCode());
        st.setString(++i, object.getName());
        st.setLong(++i, object.getCountry().getId());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public City modifyObject(String oid, BaseModel model) throws SQLException {
        City object = (City) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_zip_code=?,"
                + this.getTableName() + "_name=?,"
                + this.getTableName() + "_country_country_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getZipCode());
        st.setString(++i, object.getName());
        st.setLong(++i, object.getCountry().getId());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public City getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        City object = new City(resultSet.getLong(this.getPrimaryKey()));
        object.setZipCode(resultSet.getString(this.getTableName() + "_zip_code"));
        object.setName(resultSet.getString(this.getTableName() + "_name"));
        object.setCountry(new Country(resultSet.getLong(this.getTableName() + "_country_country_id")));
        return object;
    }
}

package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Country;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CountryStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "country";
    }

    @Override
    public Country createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        Country object = (Country) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getIdentificationCode());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Country modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Country object = (Country) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_description=?, "
                + this.getTableName() + "_identification_code=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getDescription());
        st.setString(++i, object.getIdentificationCode());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Country getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Country object = new Country(resultSet.getLong(this.getPrimaryKey()));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        object.setIdentificationCode(resultSet.getString(this.getTableName() + "_identification_code"));
        return object;
    }
}

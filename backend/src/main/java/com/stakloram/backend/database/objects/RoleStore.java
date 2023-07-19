package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Role;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RoleStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "role";
    }

    @Override
    public Role createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        Role object = (Role) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getName());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Role modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Role object = (Role) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_name=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getName());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Role getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Role object = new Role(resultSet.getLong(this.getPrimaryKey()));
        object.setName(resultSet.getString(this.getTableName() + "_name"));
        return object;
    }
}

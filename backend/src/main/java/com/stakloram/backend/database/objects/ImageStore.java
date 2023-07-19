package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Image;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ImageStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "image";
    }

    @Override
    public Image createNewObjectToDatabase(BaseModel model, Connection conn) {
        return null;
    }

    public Image createNewObjectToDatabase(BaseModel model, String workOrderOID, Connection conn) throws SQLException {
        Image object = (Image) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getUrl());
        st.setString(++i, object.getDescription());
        st.setLong(++i, BaseModel.getIdFromOid(workOrderOID));

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Image modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Image object = (Image) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_url=?,"
                + this.getTableName() + "_description=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getUrl());
        st.setString(++i, object.getDescription());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Image getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Image object = new Image(resultSet.getLong(this.getPrimaryKey()));
        object.setUrl(resultSet.getString(this.getTableName() + "_url"));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        return object;
    }
}

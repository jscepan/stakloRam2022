package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Pdf;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PdfStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "pdf";
    }

    @Override
    public Pdf createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        Pdf object = (Pdf) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getUrl());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public Pdf modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Pdf object = (Pdf) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_url=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getUrl());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Pdf getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Pdf object = new Pdf(resultSet.getLong(this.getPrimaryKey()));
        object.setUrl(resultSet.getString(this.getTableName() + "_url"));
        return object;
    }
}

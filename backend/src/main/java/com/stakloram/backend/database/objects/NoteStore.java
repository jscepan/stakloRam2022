package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Note;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class NoteStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "note";
    }

    public Note createNewObjectToDatabase(BaseModel model, Long invoiceId, Connection conn) throws SQLException {
        Note object = (Note) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getName());
        st.setString(++i, object.getDescription());
        st.setLong(++i, invoiceId);

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return object;
    }

    @Override
    public Note createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        return null;
    }

    @Override
    public Note modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        Note object = (Note) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_name=?,"
                + this.getTableName() + "_description=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getName());
        st.setString(++i, object.getDescription());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public Note getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        Note object = new Note(resultSet.getLong(this.getPrimaryKey()));
        object.setName(resultSet.getString(this.getTableName() + "_name"));
        object.setDescription(resultSet.getString(this.getTableName() + "_description"));
        return object;
    }
}

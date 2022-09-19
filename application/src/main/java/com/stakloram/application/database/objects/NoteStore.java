package com.stakloram.application.database.objects;

import com.stakloram.application.database.ObjectStore;
import static com.stakloram.application.database.ObjectStore.DATABASE_NAME;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Note;
import com.stakloram.application.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class NoteStore extends ObjectStore {

    public NoteStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        super.tableName = "note";
    }

    public Note createNewObjectToDatabase(BaseModel model, Long invoiceId) throws SQLException {
        Note object = (Note) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
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
    public Note createNewObjectToDatabase(BaseModel model) throws SQLException {
        return null;
    }

    @Override
    public Note modifyObject(String oid, BaseModel model) throws SQLException {
        Note object = (Note) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
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

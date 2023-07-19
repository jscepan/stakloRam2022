package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.User;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class HistoryStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "history";
    }

    @Override
    public History createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        History object = (History) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getAction().name());
        st.setString(++i, object.getObjectType());
        st.setString(++i, object.getPreviousValue());
        st.setString(++i, object.getNewValue());
        st.setTimestamp(++i, Helper.convertLocalDateToSqlTime(object.getTime()));
        st.setLong(++i, object.getUser().getId());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public History modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        History object = (History) model;
        int i = 0;
        PreparedStatement st = conn.prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_action=?,"
                + this.getTableName() + "_object_type=?,"
                + this.getTableName() + "_previous_value=?,"
                + this.getTableName() + "_new_value=?,"
                + this.getTableName() + "_time=?,"
                + this.getTableName() + "_user_user_id=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getAction().name());
        st.setString(++i, object.getObjectType());
        st.setString(++i, object.getPreviousValue());
        st.setString(++i, object.getNewValue());
        st.setTimestamp(++i, Helper.convertLocalDateToSqlTime(object.getTime()));
        st.setLong(++i, object.getUser().getId());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public History getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        History object = new History(resultSet.getLong(this.getPrimaryKey()));
        object.setAction(History.Action.valueOf(resultSet.getString(this.getTableName() + "_action")));
        object.setObjectType(resultSet.getString(this.getTableName() + "_object_type"));
        object.setPreviousValue(resultSet.getString(this.getTableName() + "_previous_value"));
        object.setNewValue(resultSet.getString(this.getTableName() + "_new_value"));
        object.setTime(Helper.convertStringToLocalDateTime(resultSet.getString(this.getTableName() + "_time")));
        object.setUser(new User(resultSet.getLong(this.getTableName() + "_user_user_id")));
        return object;
    }
}

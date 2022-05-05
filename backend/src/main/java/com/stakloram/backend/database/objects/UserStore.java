package com.stakloram.backend.database.objects;

import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserStore extends ObjectStore {

    public UserStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        super.tableName = "user";
    }

    @Override
    public User createNewObjectToDatabase(BaseModel model) throws SQLException {
        User object = (User) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(null,?,?,?,?,?,?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setString(++i, object.getUsername());
        st.setString(++i, object.getPassword());
        st.setString(++i, object.getFullName());
        st.setString(++i, object.getEmail());
        st.setString(++i, object.getLanguage());
        st.setString(++i, object.getThumbnail());
        st.setBoolean(++i, object.isEnabled());

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            rs.next();
            object.setOid(BaseModel.getOidFromId(object, rs.getLong(1)));
            return object;
        }
        return null;
    }

    @Override
    public User modifyObject(String oid, BaseModel model) throws SQLException {
        User object = (User) model;
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_username=?,"
                //                + this.getTableName() + "_password=?,"
                + this.getTableName() + "_full_name=?,"
                + this.getTableName() + "_email=?,"
                + this.getTableName() + "_language=?,"
                + this.getTableName() + "_thumbnail=?,"
                + this.getTableName() + "_enabled=? "
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, object.getUsername());
//        st.setString(++i, object.getPassword());
        st.setString(++i, object.getFullName());
        st.setString(++i, object.getEmail());
        st.setString(++i, object.getLanguage());
        st.setString(++i, object.getThumbnail());
        st.setBoolean(++i, object.isEnabled());
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        if (st.executeUpdate() > 0) {
            return object;
        }
        return null;
    }

    @Override
    public User getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        User object = new User(resultSet.getLong(this.getPrimaryKey()));
        object.setUsername(resultSet.getString(this.getTableName() + "_username"));
//        object.setPassword(resultSet.getString(this.getTableName() + "_password"));
        object.setFullName(resultSet.getString(this.getTableName() + "_full_name"));
        object.setEmail(resultSet.getString(this.getTableName() + "_email"));
        object.setLanguage(resultSet.getString(this.getTableName() + "_language"));
        object.setThumbnail(resultSet.getString(this.getTableName() + "_thumbnail"));
        object.setEnabled(resultSet.getBoolean(this.getTableName() + "_enabled"));
        return object;
    }

    public User getUserWithPasswordFromResultSet(ResultSet resultSet) throws SQLException {
        User object = new User(resultSet.getLong(this.getPrimaryKey()));
        object.setUsername(resultSet.getString(this.getTableName() + "_username"));
        object.setPassword(resultSet.getString(this.getTableName() + "_password"));
        object.setFullName(resultSet.getString(this.getTableName() + "_full_name"));
        object.setEmail(resultSet.getString(this.getTableName() + "_email"));
        object.setLanguage(resultSet.getString(this.getTableName() + "_language"));
        object.setThumbnail(resultSet.getString(this.getTableName() + "_thumbnail"));
        object.setEnabled(resultSet.getBoolean(this.getTableName() + "_enabled"));
        return object;
    }

    public boolean changeUserPassword(String oid, String newPassword) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("UPDATE " + DATABASE_NAME + "." + this.getTableName() + " SET "
                + this.getTableName() + "_password=?"
                + " WHERE " + this.getPrimaryKey() + "=?");
        st.setString(++i, newPassword);
        st.setLong(++i, BaseModel.getIdFromOid(oid));
        return st.executeUpdate() > 0;
    }
}

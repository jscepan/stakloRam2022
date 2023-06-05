package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Locator;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserHasRoleStore extends ObjectStore {

    public UserHasRoleStore(Locator locator) {
        super(locator);
    }

    @Override
    public void setTableName() {
        super.tableName = "user_has_role";
    }

    public ResultSet getAllUserRoles(String userOid, Long skip, Long top) throws SQLException {
        Statement st = null;
        st = this.getConn().createStatement();
        return st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " JOIN " + DATABASE_NAME + ".role on " + this.tableName + ".role_role_id=role.role_id WHERE " + this.tableName + ".user_user_id=" + BaseModel.getIdFromOid(userOid) + " limit " + skip + ", " + top);
    }

    public ResultSet getAllUserRoles(String userOid) throws SQLException {
        Statement st = null;
        st = this.getConn().createStatement();
        return st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " JOIN " + DATABASE_NAME + ".role on " + this.tableName + ".role_role_id=role.role_id WHERE " + this.tableName + ".user_user_id=" + BaseModel.getIdFromOid(userOid));
    }

    @Override
    public BaseModel createNewObjectToDatabase(BaseModel model) throws SQLException {
        return null;
    }

    public boolean createNewObjectToDatabase(Long userId, Long roleId) throws SQLException {
        int i = 0;
        PreparedStatement st = this.getConn().prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setLong(++i, userId);
        st.setLong(++i, roleId);

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            return rs.next();
        }
        return false;
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel model) throws SQLException {
        return null;
    }

    @Override
    public BaseModel getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        return null;
    }

    @Override
    public boolean deleteObjectByOid(String oid) throws SQLException {
        return false;
    }

    public boolean deleteRoleByOidForUserOid(String userOid, String roleOid) throws SQLException {
        PreparedStatement st = this.getConn().prepareStatement("DELETE FROM " + DATABASE_NAME + "." + this.tableName + " WHERE " + "user_user_id=" + BaseModel.getIdFromOid(userOid) + " AND role_role_id=" + BaseModel.getIdFromOid(roleOid));
        return st.executeUpdate() > 0;
    }
}

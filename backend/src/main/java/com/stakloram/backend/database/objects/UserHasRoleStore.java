package com.stakloram.backend.database.objects;

import static com.stakloram.backend.database.ConnectionToDatabase.DATABASE_NAME;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.database.ObjectStore;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.BaseModel;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserHasRoleStore extends ObjectStore {

    @Override
    public void setTableName() {
        super.tableName = "user_has_role";
    }

    public ResultSet getAllUserRoles(String userOid, Long skip, Long top, Connection conn) throws SQLException, SException {
        Statement st = null;
        st = conn.createStatement();
        return st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " JOIN " + DATABASE_NAME + ".role on " + this.tableName + ".role_role_id=role.role_id WHERE " + this.tableName + ".user_user_id=" + BaseModel.getIdFromOid(userOid) + " limit " + skip + ", " + top);
    }

    public ResultSet getAllUserRoles(String userOid, Connection conn) throws SQLException, SException {
        Statement st = null;
        st = conn.createStatement();
        return st.executeQuery("SELECT * from " + DATABASE_NAME + "." + this.tableName + " JOIN " + DATABASE_NAME + ".role on " + this.tableName + ".role_role_id=role.role_id WHERE " + this.tableName + ".user_user_id=" + BaseModel.getIdFromOid(userOid));
    }

    @Override
    public BaseModel createNewObjectToDatabase(BaseModel model, Connection conn) throws SQLException {
        return null;
    }

    public boolean createNewObjectToDatabase(Long userId, Long roleId, Connection conn) throws SQLException {
        int i = 0;
        PreparedStatement st = conn.prepareStatement("INSERT into " + DATABASE_NAME + "." + this.getTableName() + " value(?,?)", PreparedStatement.RETURN_GENERATED_KEYS);
        st.setLong(++i, userId);
        st.setLong(++i, roleId);

        if (st.executeUpdate() > 0) {
            ResultSet rs = st.getGeneratedKeys();
            return rs.next();
        }
        return false;
    }

    @Override
    public BaseModel modifyObject(String oid, BaseModel model, Connection conn) throws SQLException {
        return null;
    }

    @Override
    public BaseModel getObjectFromResultSet(ResultSet resultSet) throws SQLException {
        return null;
    }

    @Override
    public boolean deleteObjectByOid(String oid, Connection conn) throws SQLException {
        return false;
    }

    public boolean deleteRoleByOidForUserOid(String userOid, String roleOid, Connection conn) throws SQLException, SException {
        PreparedStatement st = conn.prepareStatement("DELETE FROM " + DATABASE_NAME + "." + this.tableName + " WHERE " + "user_user_id=" + BaseModel.getIdFromOid(userOid) + " AND role_role_id=" + BaseModel.getIdFromOid(roleOid));
        return st.executeUpdate() > 0;
    }
}

package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.RoleStore;
import com.stakloram.backend.database.objects.UserHasRoleStore;
import com.stakloram.backend.database.objects.UserStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Role;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class UserBuilder extends BaseBuilder {

    private final UserStore USER_STORE = (UserStore) this.getObjectStore();
    private final RoleStore ROLE_STORE = new RoleStore();
    private final UserHasRoleStore USER_HAS_ROLE_STORE = new UserHasRoleStore();

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForAttributes.put("enabled", "enabled");
        this.databaseColumnsForQuickSearch = Arrays.asList("user_username", "user_full_name", "user_email");
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new UserStore();
    }

    @Override
    public User getObjectByOid(String oid, Connection conn) throws SException {
        User user = (User) super.getObjectByOid(oid, conn);
        user.setRoles(this.getAllUserRoles(user, conn));
        return user;
    }

    @Override
    public User createNewObject(BaseModel object, Connection conn) throws SException {
        User user = (User) super.createNewObject(object, conn);
        for (Role role : user.getRoles()) {
            try {
                USER_HAS_ROLE_STORE.createNewObjectToDatabase(user.getId(), role.getId(), conn);
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        return user;
    }

    @Override
    public User modifyObject(String oid, BaseModel object, Connection conn) throws SException {
        try {
            User user = (User) super.modifyObject(oid, object, conn);
            ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid(), conn);
            List<Role> previousUserRoles = new ArrayList<>();
            try {
                while (rs.next()) {
                    previousUserRoles.add(ROLE_STORE.getObjectFromResultSet(rs));
                }
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
            }
            Map<Helper.Action, List<? extends BaseModel>> mapOfDifferences = Helper.findDifferenceBetweenLists(user.getRoles(), previousUserRoles);
            for (BaseModel role : mapOfDifferences.get(Helper.Action.FOR_CREATE)) {
                USER_HAS_ROLE_STORE.createNewObjectToDatabase(user.getId(), role.getId(), conn);
            }
            for (BaseModel role : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                USER_HAS_ROLE_STORE.deleteRoleByOidForUserOid(user.getOid(), role.getOid(), conn);
            }
            return user;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean changeUserPassword(User user, String newPassword, Connection conn) throws SException {
        try {
            return USER_STORE.changeUserPassword(user.getOid(), newPassword, conn);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean changeUserPassword(String userOid, String newPassword, Connection conn) throws SException {
        try {
            return USER_STORE.changeUserPassword(userOid, newPassword, conn);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public User getUserByUsername(String username, Connection conn) throws SException {
        try {
            ResultSet resultSet = USER_STORE.getAllObjectsFromDatabase(USER_STORE.getTableName() + "_username='" + username + "'", conn);
            if (resultSet.next()) {
                User user = USER_STORE.getObjectFromResultSet(resultSet);
                ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid(), conn);
                List<Role> roles = new ArrayList<>();
                while (rs.next()) {
                    roles.add(ROLE_STORE.getObjectFromResultSet(rs));
                }
                user.setRoles(roles);
                return user;
            } else {
                throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public User getUserDetailsByUsername(String username, Connection conn) throws SException {
        try {
            ResultSet resultSet = USER_STORE.getAllObjectsFromDatabase(USER_STORE.getTableName() + "_username='" + username + "'", conn);
            if (resultSet.next()) {
                User user = USER_STORE.getUserWithPasswordFromResultSet(resultSet);
                ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid(), conn);
                List<Role> roles = new ArrayList<>();
                while (rs.next()) {
                    roles.add(ROLE_STORE.getObjectFromResultSet(rs));
                }
                user.setRoles(roles);
                return user;
            } else {
                throw new SException(UserMessage.getLocalizedMessage("objectNotFound"));
            }
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    private List<Role> getAllUserRoles(User user, Connection conn) throws SException {
        List<Role> roles = new ArrayList<>();
        try {
            ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid(), conn);
            while (rs.next()) {
                roles.add(ROLE_STORE.getObjectFromResultSet(rs));
            }
            return roles;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }
}

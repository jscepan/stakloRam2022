package com.stakloram.application.services.impl.builder.impl;

import com.stakloram.application.database.objects.RoleStore;
import com.stakloram.application.database.objects.UserHasRoleStore;
import com.stakloram.application.database.objects.UserStore;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.models.Locator;
import com.stakloram.application.models.Role;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.User;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.impl.builder.BaseBuilder;
import com.stakloram.application.util.Helper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UserBuilder extends BaseBuilder {

    private final UserStore USER_STORE = (UserStore) this.getObjectStore();
    private final RoleStore ROLE_STORE = new RoleStore(this.getLocator());
    private final UserHasRoleStore USER_HAS_ROLE_STORE = new UserHasRoleStore(this.getLocator());

    public UserBuilder(Locator locator) {
        super(locator);
    }

    @Override
    public void setColumnsForSearch() {
        this.databaseColumnsForAttributes.put("enabled", "enabled");
        this.databaseColumnsForQuickSearch = Arrays.asList("user_username", "user_full_name", "user_email");
    }

    @Override
    public void setObjectStore() {
        this.objectStore = new UserStore(this.getLocator());
    }

    @Override
    public User getObjectByOid(String oid) throws SException {
        User user = (User) super.getObjectByOid(oid);
        user.setRoles(this.getAllUserRoles(user));
        return user;
    }

    @Override
    public User createNewObject(BaseModel object) throws SException {
        User user = (User) super.createNewObject(object);
        for (Role role : user.getRoles()) {
            try {
                USER_HAS_ROLE_STORE.createNewObjectToDatabase(user.getId(), role.getId());
            } catch (SQLException ex) {
                super.logger.error(ex.toString());
                throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
            }
        }
        return user;
    }

    @Override
    public User modifyObject(String oid, BaseModel object) throws SException {
        try {
            User user = (User) super.modifyObject(oid, object);
            ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid());
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
                USER_HAS_ROLE_STORE.createNewObjectToDatabase(user.getId(), role.getId());
            }
            for (BaseModel role : mapOfDifferences.get(Helper.Action.FOR_DELETE)) {
                USER_HAS_ROLE_STORE.deleteRoleByOidForUserOid(user.getOid(), role.getOid());
            }
            return user;
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean changeUserPassword(User user, String newPassword) throws SException {
        try {
            return USER_STORE.changeUserPassword(user.getOid(), newPassword);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public boolean changeUserPassword(String userOid, String newPassword) throws SException {
        try {
            return USER_STORE.changeUserPassword(userOid, newPassword);
        } catch (SQLException ex) {
            super.logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
        }
    }

    public User getUserByUsername(String username) throws SException {
        try {
            ResultSet resultSet = USER_STORE.getAllObjectsFromDatabase(USER_STORE.getTableName() + "_username='" + username + "'");
            if (resultSet.next()) {
                User user = USER_STORE.getObjectFromResultSet(resultSet);
                ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid());
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

    public User getUserDetailsByUsername(String username) throws SException {
        try {
            ResultSet resultSet = USER_STORE.getAllObjectsFromDatabase(USER_STORE.getTableName() + "_username='" + username + "'");
            if (resultSet.next()) {
                User user = USER_STORE.getUserWithPasswordFromResultSet(resultSet);
                ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid());
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

    private List<Role> getAllUserRoles(User user) throws SException {
        List<Role> roles = new ArrayList<>();
        try {
            ResultSet rs = USER_HAS_ROLE_STORE.getAllUserRoles(user.getOid());
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
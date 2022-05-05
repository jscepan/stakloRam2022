package com.stakloram.backend.services.impl.builder.impl;

import com.stakloram.backend.database.objects.RoleStore;
import com.stakloram.backend.database.objects.UserHasRoleStore;
import com.stakloram.backend.database.objects.UserStore;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.Role;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.User;
import com.stakloram.backend.services.impl.builder.BaseBuilder;
import com.stakloram.backend.util.Helper;
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
                throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
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
                Logger.getLogger(UserBuilder.class.getName()).log(Level.SEVERE, null, ex);
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
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    public boolean changeUserPassword(User user, String newPassword) throws SException {
        try {
            return USER_STORE.changeUserPassword(user.getOid(), newPassword);
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }

    public boolean changeUserPassword(String userOid, String newPassword) throws SException {
        try {
            return USER_STORE.changeUserPassword(userOid, newPassword);
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
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
                throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx");
            }
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
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
                throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx");
            }
        } catch (SQLException ex) {
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
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
            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx", ex);
        }
    }
}

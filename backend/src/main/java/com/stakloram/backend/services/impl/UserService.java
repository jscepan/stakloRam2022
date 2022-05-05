package com.stakloram.backend.services.impl;

import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.User;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.UserBuilder;
import com.stakloram.backend.util.DataChecker;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new UserBuilder(this.locator);
    }

    public BaseModel changeUserProfile(String oid, User object) throws SException {
        if (DataChecker.isNull(oid) || oid.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("oidCantBeEmpty"));
        }
        if (DataChecker.isNull(oid) || oid.trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("userCantBeEmpty"));
        }
        if (DataChecker.isNull(object.getEmail()) || object.getEmail().trim().isEmpty() || !DataChecker.isEmail(object.getEmail())) {
            throw new SException(UserMessage.getLocalizedMessage("emailError"));
        }
        if (DataChecker.isNull(object.getFullName()) || object.getFullName().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("fullNameIsRequiredField"));
        }
        if (DataChecker.isNull(object.getLanguage()) || object.getLanguage().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("languageIsRequiredField"));
        }
        if (DataChecker.isNull(object.getUsername()) || object.getUsername().trim().isEmpty()) {
            throw new SException(UserMessage.getLocalizedMessage("usernameIsRequiredField"));
        }
        if (object.getUsername().contains(" ")) {
            throw new SException(UserMessage.getLocalizedMessage("usernameCantContainsEmptySpace"));
        }
        User user = ((UserBuilder) this.getBaseBuilder()).getObjectByOid(oid);
        if (user == null) {
            this.rollback();
            throw new SException(UserMessage.getLocalizedMessage("cantFindUserWithThisUsername"));
        }
        this.startTransaction();
        user.setEmail(object.getEmail());
        user.setFullName(object.getFullName());
        user.setLanguage(object.getLanguage());
        user.setUsername(object.getUsername());
        user = ((UserBuilder) this.getBaseBuilder()).modifyObject(oid, user);
        this.endTransaction();
        return user;
    }

    @Override
    public void checkRequestDataForCreate(BaseModel object) throws SException {
    }

    @Override
    public void checkRequestDataForModify(String oid, BaseModel object) throws SException {
    }

    public User getCurrentUserProfile() throws SException {
        return this.getCurrentUser();
    }

    public boolean setNewUserPassword(String oid, String password) throws SException {
        this.startTransaction();
        if (((UserBuilder) this.getBaseBuilder()).changeUserPassword(oid, password)) {
            this.endTransaction();
            return true;
        } else {
            this.rollback();
            return false;
        }
    }
}

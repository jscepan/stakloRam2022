package com.stakloram.application.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stakloram.application.models.BaseModel;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.History;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.models.User;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.UserBuilder;
import com.stakloram.application.util.DataChecker;
import java.time.LocalDateTime;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new UserBuilder(this.locator);
    }

    public BaseModel changeUserProfile(String oid, User object) throws SException {
        this.checkRequestDataForModify(oid, object);
        User previousUser = ((UserBuilder) this.getBaseBuilder()).getObjectByOid(oid);
        if (previousUser == null) {
            this.rollback();
            throw new SException(UserMessage.getLocalizedMessage("cantFindUserWithThisUsername"));
        }
        this.startTransaction();
        previousUser.setEmail(object.getEmail());
        previousUser.setFullName(object.getFullName());
        previousUser.setLanguage(object.getLanguage());
        previousUser.setUsername(object.getUsername());
        previousUser = ((UserBuilder) this.getBaseBuilder()).modifyObject(oid, previousUser);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.history.createNewObject(new History(History.Action.UPDATE, object.getClass().getSimpleName().toLowerCase(), previousUser != null ? objectMapper.writeValueAsString(previousUser) : "", objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.locator.getCurrentUserOID()), object.getOid()));
        } catch (JsonProcessingException ex) {
            super.logger.error(ex.toString());
        }
        this.endTransaction();
        return previousUser;
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        User object = (User) baseModel;
        String oid = object.getOid();
//        if (DataChecker.isNull(object.getEmail()) || object.getEmail().trim().isEmpty() || !DataChecker.isEmail(object.getEmail())) {
//            throw new SException(UserMessage.getLocalizedMessage("emailError"));
//        }
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
    }

    public User getCurrentUserProfile() throws SException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            if (authentication.getName() == null) {
                throw new SException(UserMessage.getLocalizedMessage("wrongUsername"));
            }
            return (new UserBuilder(this.locator)).getUserByUsername(authentication.getName());
        }
        throw new SException(UserMessage.getLocalizedMessage("wrongUsername"));
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

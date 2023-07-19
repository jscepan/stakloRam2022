package com.stakloram.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.models.BaseModel;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.History;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.models.User;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.UserBuilder;
import com.stakloram.backend.util.DataChecker;
import java.sql.Connection;
import java.time.LocalDateTime;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends ServiceModel {

    @Override
    public void setBaseBuilder() {
        super.baseBuilder = new UserBuilder();
    }

    public BaseModel changeUserProfile(String oid, User object) throws SException {
        this.checkRequestDataForModify(oid, object);
        User previousUser = ((UserBuilder) this.getBaseBuilder()).getObjectByOid(oid);
        Connection conn = ConnectionToDatabase.connect();
        if (previousUser == null) {
            this.rollback(conn);
            throw new SException(UserMessage.getLocalizedMessage("cantFindUserWithThisUsername"));
        }
        this.startTransaction(conn);
        previousUser.setEmail(object.getEmail());
        previousUser.setFullName(object.getFullName());
        previousUser.setLanguage(object.getLanguage());
        previousUser.setUsername(object.getUsername());
        previousUser = ((UserBuilder) this.getBaseBuilder()).modifyObject(oid, previousUser, conn);
        ObjectMapper objectMapper = JsonMapper.builder()
                .addModule(new JavaTimeModule())
                .build();
        try {
            this.history.createNewObject(new History(History.Action.UPDATE, object.getClass().getSimpleName().toLowerCase(), previousUser != null ? objectMapper.writeValueAsString(previousUser) : "", objectMapper.writeValueAsString(object), LocalDateTime.now(), new User(this.getCurrentUserOID()), object.getOid()), conn);
        } catch (JsonProcessingException ex) {
            super.logger.error(ex.toString());
        }
        this.endTransaction(conn);
        return previousUser;
    }

    @Override
    public void checkRequestDataForCreate(BaseModel baseModel) throws SException {
        User object = (User) baseModel;
        String oid = object.getOid();
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
            return (new UserBuilder()).getUserByUsername(authentication.getName());
        }
        throw new SException(UserMessage.getLocalizedMessage("wrongUsername"));
    }

    public boolean setNewUserPassword(String oid, String password) throws SException {
        Connection conn = ConnectionToDatabase.connect();
        this.startTransaction(conn);
        if (((UserBuilder) this.getBaseBuilder()).changeUserPassword(oid, password)) {
            this.endTransaction(conn);
            return true;
        } else {
            this.rollback(conn);
            return false;
        }
    }
}

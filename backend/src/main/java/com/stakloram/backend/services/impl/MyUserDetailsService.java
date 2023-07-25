package com.stakloram.backend.services.impl;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.models.MyUserDetails;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.impl.builder.impl.UserBuilder;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            User user = (new UserBuilder()).getUserDetailsByUsername(username, conn);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority((role.getName())));
            });
            return new MyUserDetails(user.getOid(), user.getUsername(), user.getPassword(), user.isEnabled(), authorities);
        } catch (SException ex) {
            logger.error(ex.toString());
            throw new UsernameNotFoundException(UserMessage.getLocalizedMessage("wrongUsername"));
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new UsernameNotFoundException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
    }

    public boolean changeUserPassword(String username, String oldPassword, String newPassword) throws SException {
        try ( Connection conn = ConnectionToDatabase.connect()) {
            UserBuilder userBuilder = new UserBuilder();
            User user = userBuilder.getUserDetailsByUsername(username, conn);
            if (user != null) {
                return userBuilder.changeUserPassword(user, newPassword, conn);
            }
        } catch (SQLException ex) {
            logger.error(ex.toString());
            throw new SException(UserMessage.getLocalizedMessage("connectionToDatabaseIssue"));
        }
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }
}

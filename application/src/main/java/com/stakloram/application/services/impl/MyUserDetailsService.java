package com.stakloram.application.services.impl;

import com.stakloram.application.database.ConnectionToDatabase;
import com.stakloram.application.models.Locator;
import com.stakloram.application.models.MyUserDetails;
import com.stakloram.application.exception.SException;
import com.stakloram.application.models.User;
import com.stakloram.application.models.UserMessage;
import com.stakloram.application.services.ServiceModel;
import com.stakloram.application.services.impl.builder.impl.UserBuilder;
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

    protected final Locator locator = new Locator(new ConnectionToDatabase().connect());

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = (new UserBuilder(this.locator)).getUserDetailsByUsername(username);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority((role.getName())));
            });
            return new MyUserDetails(user.getOid(), user.getUsername(), user.getPassword(), user.isEnabled(), authorities);
        } catch (SException ex) {
            logger.error(ex.toString());
            throw new UsernameNotFoundException(UserMessage.getLocalizedMessage("wrongUsername"));
        }
    }

    public boolean changeUserPassword(String username, String oldPassword, String newPassword) throws SException {
        UserBuilder userBuilder = new UserBuilder(this.locator);
        User user = userBuilder.getUserDetailsByUsername(username);
        if (user != null) {
            return userBuilder.changeUserPassword(user, newPassword);
        }
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }
//
//    public boolean changeUserPassword(User user, String newPassword) throws SException {
//        try {
//            return ((UserBuilder)new UserBuilder(this.locator)).changeUserPassword(user.getOid(), newPassword);
//        } catch (SQLException ex) {
//            throw new SException("xxxxxxxEXCEPTIONxxxxxxxxx" + ex);
//        }
//    }
}

package com.stakloram.backend.services.impl;

import com.stakloram.backend.database.ConnectionToDatabase;
import com.stakloram.backend.models.Locator;
import com.stakloram.backend.models.MyUserDetails;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
import com.stakloram.backend.services.ServiceModel;
import com.stakloram.backend.services.impl.builder.impl.UserBuilder;
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
            return new MyUserDetails(user.getUsername(), user.getPassword(), user.isEnabled(), authorities);
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

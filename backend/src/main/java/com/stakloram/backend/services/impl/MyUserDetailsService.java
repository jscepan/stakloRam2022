package com.stakloram.backend.services.impl;

import com.stakloram.backend.models.MyUserDetails;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.User;
import com.stakloram.backend.models.UserMessage;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = (new UserBuilder()).getUserDetailsByUsername(username);
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
        UserBuilder userBuilder = new UserBuilder();
        User user = userBuilder.getUserDetailsByUsername(username);
        if (user != null) {
            return userBuilder.changeUserPassword(user, newPassword);
        }
        throw new SException(UserMessage.getLocalizedMessage("unexpectedError"));
    }
}

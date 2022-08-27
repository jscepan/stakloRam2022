package com.stakloram.backend.controllers;

import com.stakloram.backend.models.AuthPasswordChange;
import com.stakloram.backend.models.AuthRequest;
import com.stakloram.backend.models.AuthResponse;
import com.stakloram.backend.services.impl.MyUserDetailsService;
import com.stakloram.backend.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MyUserDetailsService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(method = RequestMethod.POST, value = "/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            logger.error(e.toString());
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails user = userService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/auth/password-change")
    public ResponseEntity<?> changePassword(@RequestBody AuthPasswordChange authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getOldPassword())
            );
        } catch (BadCredentialsException e) {
            logger.error(e.toString());
            throw new Exception("Incorrect username or password", e);
        }
        if (userService.changeUserPassword(authRequest.getUsername(), authRequest.getOldPassword(), authRequest.getNewPassword())) {
            final UserDetails user = userService.loadUserByUsername(authRequest.getUsername());

            final String jwt = jwtUtil.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(jwt));
        }
        throw new Exception("Incorrect username or password");
    }
}

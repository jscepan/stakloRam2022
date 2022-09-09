package com.stakloram.backend.auth;

import com.stakloram.backend.services.impl.MyUserDetailsService;
import com.stakloram.backend.util.JwtUtil;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Autowired
    private MyUserDetailsService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // IF user try to login then don't ask for JWT
        if (request.getServletPath().equals("/auth/login")) {
            filterChain.doFilter(request, response);
        } else {
            final String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String username = null;
                    String jwt = null;
                    jwt = authorizationHeader.substring(7);
                    username = jwtUtil.extractUsername(jwt);

                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails user = this.userService.loadUserByUsername(username);
                        if (jwtUtil.validateToken(jwt, user)) {
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                        }
                    }
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    logger.error(e.toString());
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }
}

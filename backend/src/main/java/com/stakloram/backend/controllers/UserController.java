package com.stakloram.backend.controllers;

import com.stakloram.backend.models.ArrayResponse;
import com.stakloram.backend.exception.SException;
import com.stakloram.backend.models.AuthPasswordReset;
import com.stakloram.backend.models.SearchRequest;
import com.stakloram.backend.models.User;
import com.stakloram.backend.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/users/search")
    public ArrayResponse search(@RequestBody SearchRequest searchObject, @RequestParam Long skip, @RequestParam Long top) throws SException {
        return userService.searchObjects(searchObject, skip, top);
    }

    @RequestMapping("/users/{userOid}")
    public User getById(@PathVariable String userOid) throws SException {
        return (User) userService.getObjectByOID(userOid);
    }

    @RequestMapping("/users/profile")
    public User getUserProfile() throws SException {
        return userService.getCurrentUserProfile();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public User createNew(@RequestBody User object) throws SException {
        System.out.println("object");
        System.out.println(object);
        return (User) this.userService.createNewObject(object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{userOid}")
    public User modify(@PathVariable String userOid, @RequestBody User object) throws SException {
        return (User) this.userService.modifyObject(userOid, object);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/profile/{userOid}")
    public User changeUserProfile(@PathVariable String userOid, @RequestBody User object) throws SException {
        return (User) this.userService.changeUserProfile(userOid, object);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users/profile/{userOid}")
    public ResponseEntity<?> setNewUserPassword(@PathVariable String userOid, @RequestBody AuthPasswordReset authPasswordReset) throws SException {
        return ResponseEntity.ok(this.userService.setNewUserPassword(userOid, authPasswordReset.getNewPassword()));
    }
}

package com.zewu.crochetassistant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zewu.crochetassistant.model.IUsersRepository;
import com.zewu.crochetassistant.model.Users;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class RegistrationController {

    static Logger logger = LoggerFactory.getLogger(RegistrationController.class);
    @Autowired
    private IUsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/signup", consumes = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        logger.info("Registering user: " + user);
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

}

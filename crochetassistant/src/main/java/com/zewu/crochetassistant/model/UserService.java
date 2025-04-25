package com.zewu.crochetassistant.model;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private IUsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = usersRepository.findByUsername(username);
        if (user.isPresent()) {
            var u = user.get();
            return User.builder()
                .username(u.getUsername())
                .password(u.getPassword())
                .build(); 
        }
        else {
            throw new UsernameNotFoundException(username);
        }
    }
}

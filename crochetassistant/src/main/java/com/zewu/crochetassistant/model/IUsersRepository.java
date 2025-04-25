package com.zewu.crochetassistant.model;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface IUsersRepository extends JpaRepository<Users, Long> {
    
    Optional<Users> findByUsername(String username);
    

}

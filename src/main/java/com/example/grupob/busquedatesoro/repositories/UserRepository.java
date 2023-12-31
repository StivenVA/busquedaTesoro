package com.example.grupob.busquedatesoro.repositories;

import com.example.grupob.busquedatesoro.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    //@Query("select u from User u where u.email = ?1 or u.id=?2")
    User findByEmailOrId(String email,String id);
}

package com.example.grupob.busquedatesoro.repositories;

import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    //@Query("select u from User u where u.email = ?1 or u.id=?2")
    User findByEmailOrId(String email,String id);

    @Modifying
    @Query("update User u set u.locationId = ?1 where u.id = ?2")
    @Transactional
    void updateLocation(Location locationId, String id);

    @Query("select u.locationId from User u where u.id=?1")
    Location getUserLocation(String userId);
}

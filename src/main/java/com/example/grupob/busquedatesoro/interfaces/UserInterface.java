package com.example.grupob.busquedatesoro.interfaces;

import com.example.grupob.busquedatesoro.models.User;

import java.util.Optional;

public interface UserInterface {

    Optional<User> validationUser(User user);

    boolean addUser(User user);

    void updateLocation(int locationId,User userId);
}

package com.example.grupob.busquedatesoro.interfaces;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.models.User;

public interface UserInterface {
    void updateLocation(Clue codeClue, User user);

    Location getLocation(String userId);
}

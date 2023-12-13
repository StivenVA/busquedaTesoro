package com.example.grupob.busquedatesoro.interfaces;

import com.example.grupob.busquedatesoro.DTO.ClueDTO;
import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.models.User;

public interface UserInterface {
    ClueDTO updateLocation(String codeClue, String user);

    Location getLocation(String userId);
}

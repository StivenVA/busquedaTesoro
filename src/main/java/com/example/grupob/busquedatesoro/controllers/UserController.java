package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.services.LocationService;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/{locationId}")
    public boolean updateUserLocation(@PathVariable int locationId,@RequestBody User user){
        try {
            userService.updateLocation(locationId, user);
        }
        catch (NullPointerException e){
            return false;
        }
        return true;
    }

    /*@GetMapping(value = "location/{userId}")
    public ResponseEntity<LocationService> getUserLocation(@PathVariable String userId){

    }*/
}

package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("code-clue={code}&user={userId}")
    public ResponseEntity<?> getNextCLue(@PathVariable String code,@PathVariable String userId){

        Clue gottenClue;

        try {
          gottenClue = userService.getClue(code,userId);
        }
        catch (NullPointerException | IllegalArgumentException e){
                return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok(gottenClue);
    }

    @GetMapping("/user_location/{userId}")
    public ResponseEntity<?> getUserLocation(@PathVariable String userId){
        Location userLocation;

        try {
            userLocation = userService.getLocation(userId);
        }
        catch (NullPointerException | IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok(userLocation);
    }

}

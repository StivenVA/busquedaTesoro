package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.services.UserService;
import com.example.grupob.busquedatesoro.DTO.ClueDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("update/")
    public ResponseEntity<?> updateLocation(@RequestParam String code, @RequestParam String userId){

        try {
          userService.updateLocation(code,userId);
        }
        catch (NullPointerException | IllegalArgumentException e){
                return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok().build();
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

    @GetMapping
    public ResponseEntity<?> getClue(@RequestParam String clue,@RequestParam String user){
        ClueDTO gottenClue;

        try{
            gottenClue = userService.getClue(clue,user);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(gottenClue);
    }

}

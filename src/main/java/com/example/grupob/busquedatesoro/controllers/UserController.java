package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("code-clue={code}&user={userId}")
    public ResponseEntity<?> getCLue(@PathVariable String code,@PathVariable String userId){

        Clue gottenClue;

        try {
          gottenClue = userService.getClue(code,userId);
        }
        catch (NullPointerException e){
                return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok(gottenClue);
    }

}

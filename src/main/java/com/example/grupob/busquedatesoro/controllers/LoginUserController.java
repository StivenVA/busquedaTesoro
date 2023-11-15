package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.services.LoginService;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "login")
@RequiredArgsConstructor
public class LoginUserController {

    private final LoginService LoginService;

    @PostMapping
    public ResponseEntity<User> validateUser(@RequestBody User user){

        Optional<User> userFound = LoginService.validationUser(user);

        return userFound.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}

package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.services.SignUpService;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "signup")
@RequiredArgsConstructor
public class SignUpUserController {

    private final SignUpService signUpService;

    @PostMapping
    public ResponseEntity<Boolean> userRegister(@RequestBody User user){

        if (signUpService.addUser(user)) return ResponseEntity.ok(true);

        return ResponseEntity.badRequest().build();
    }

}

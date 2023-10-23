package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){

        User user = userService.findUser(id);

       if (user == null) return ResponseEntity.notFound().build();

       return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();

        if (users.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(users);
    }
}
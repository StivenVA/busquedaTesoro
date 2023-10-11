package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.interfaces.UserInterface;
import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserInterface {

        /*private final UserRepository userRepository;

        public User findUser(String id){
                return userRepository.findById(id).orElse(null);
        }*/
}

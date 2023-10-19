package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.interfaces.UserInterface;
import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.UserRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserInterface {

        private final UserRepository userRepository;

        private final EntityManager entityManager;

        public User findUser(String id){
                return userRepository.findById(id).orElse(null);
        }

        public List<User> getUsers(){
            return userRepository.findAll();
        }
}

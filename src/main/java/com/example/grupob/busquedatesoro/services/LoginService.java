package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public Optional<User> validationUser(User user){

        User userBd = userRepository.findByEmail(user.getEmail());

        try {
            if (BCrypt.checkpw(user.getPassword(),userBd.getPassword())) return Optional.of(userBd);

        } catch (NullPointerException e){
            return Optional.empty();
        }
        return Optional.empty();
    }
}

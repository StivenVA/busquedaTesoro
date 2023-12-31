package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.interfaces.UserInterface;
import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserInterface {

        private final UserRepository userRepository;

        @Override
        public Optional<User> validationUser(User user){

                User userBd = userRepository.findByEmail(user.getEmail());

                try {
                        if (BCrypt.checkpw(user.getPassword(),userBd.getPassword())) return Optional.of(userBd);

                } catch (NullPointerException e){
                        return Optional.empty();
                }
                return Optional.empty();
        }

        @Override
        public boolean addUser(User user){

                boolean added = userRepository.findByEmailOrId(user.getEmail(), user.getId()) == null;

                if (added){
                        String hashedPassword = BCrypt.hashpw(user.getPassword().trim(),BCrypt.gensalt());
                        user.setPassword(hashedPassword);
                        userRepository.save(user);
                }

            return added;
        }

}

package com.example.grupob.busquedatesoro.services;


import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignUpService {
    private final UserRepository userRepository;

    public boolean addUser(User user){

        boolean added = userRepository.findByEmailOrId(user.getEmail(), user.getId()) == null;
        boolean fieldsAreBlank = userFieldsAreBlank(user);

        if (fieldsAreBlank) throw new IllegalArgumentException("Tiene que llenar todos los campos del usuario");

        if (added){
            String hashedPassword = BCrypt.hashpw(user.getPassword().trim(),BCrypt.gensalt());
            user.setPassword(hashedPassword);
            user.setLocationId(null);
            userRepository.save(user);
        }

        return added;
    }

    private boolean userFieldsAreBlank(User user){

        return user.getPhone().isBlank()
                || user.getEmail().isBlank()
                || user.getPassword().isBlank()
                || user.getName().isBlank()
                || user.getId().isBlank();
    }

}
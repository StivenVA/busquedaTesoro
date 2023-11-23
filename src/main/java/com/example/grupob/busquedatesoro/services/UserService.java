package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.interfaces.UserInterface;
import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.models.User;
import com.example.grupob.busquedatesoro.repositories.ClueRepository;
import com.example.grupob.busquedatesoro.repositories.LocationRepository;
import com.example.grupob.busquedatesoro.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserInterface {

        private final UserRepository userRepository;
        private final LocationRepository locationRepository;
        private final ClueRepository clueRepository;

        public Clue getClue(String codeClue,String id){
                Clue foundedClue = clueRepository.findById(codeClue).orElse(null);
                User foundedUser = userRepository.findById(id).orElse(null);

                updateLocation(foundedClue,foundedUser);

                return foundedClue;
        }

        @Override
        public void updateLocation(Clue foundedClue,User user) {
                if (foundedClue==null) throw new NullPointerException("Codigo incorrecto");
                if (user==null) throw new NullPointerException("Usuario no encontrado");

                Location clueLocation = locationRepository.findByClueId(foundedClue);

                if (clueLocation.getLocationId() == nextLocationIdFromUser(user)) {
                        userRepository.updateLocation(clueLocation, user.getId());
                }
                else throw new IllegalArgumentException("El codigo no corresponde al de la siguiente locacion");

        }

        @Override
        public Location getLocation(String userId) {

                if (userId.isBlank()) throw new IllegalArgumentException("El id del usuario no puede estar vacio");

                if (userRepository.findById(userId).isEmpty()) throw new NullPointerException("El usuario no existe");

                return userRepository.getUserLocation(userId);
        }

        private int nextLocationIdFromUser(User user){
                Location currentLocation;
                currentLocation = user.getLocationId();

                int nextLocation;

                if (currentLocation==null) nextLocation = 1;

                else if (currentLocation.getLocationId()==10) nextLocation = 10;

                else nextLocation = currentLocation.getLocationId()+1;

                return nextLocation;
        }

}

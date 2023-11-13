package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.interfaces.LocationInterface;
import com.example.grupob.busquedatesoro.models.Location;
import com.example.grupob.busquedatesoro.repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LocationService implements LocationInterface {

    private final LocationRepository locationRepository;

    @Override
    public Location getLocation(int locationId) {
        return locationRepository.findById(locationId).orElse(null);
    }

}

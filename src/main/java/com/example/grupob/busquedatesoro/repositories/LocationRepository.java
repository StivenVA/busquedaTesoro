package com.example.grupob.busquedatesoro.repositories;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findByClueId(Clue clueId);
}

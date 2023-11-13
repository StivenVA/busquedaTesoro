package com.example.grupob.busquedatesoro.services;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.repositories.ClueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClueService {

    private final ClueRepository clueRepository;

    public Clue getClue(String codeClue){
        return clueRepository.findById(codeClue).orElse(null);
    }
}

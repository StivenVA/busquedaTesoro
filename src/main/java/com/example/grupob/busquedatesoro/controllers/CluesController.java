package com.example.grupob.busquedatesoro.controllers;

import com.example.grupob.busquedatesoro.models.Clue;
import com.example.grupob.busquedatesoro.services.ClueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "clues")
@RequiredArgsConstructor
public class CluesController {

    private final ClueService clueService;

    @GetMapping(value = "/{codeClue}")
    public ResponseEntity<Clue> getClue(@PathVariable String codeClue){

        Clue clue = clueService.getClue(codeClue);

        if ( clue == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(clue);
    }
}

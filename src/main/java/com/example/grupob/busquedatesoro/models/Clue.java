package com.example.grupob.busquedatesoro.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "clues")
@Entity
@Data
public class Clue {

    @Id
    @Column(name = "clue_id")
    int clueId;
    String description;
}

package com.example.grupob.busquedatesoro.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "locations")
public class Location {
    @Id
    @Column(name = "location_id")
    int locationId;
    String name;
    @JoinColumn(name = "clue_id")
    @OneToOne(fetch = FetchType.EAGER)
    Clue clueId;
}

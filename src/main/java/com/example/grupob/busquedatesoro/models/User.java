package com.example.grupob.busquedatesoro.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String password;

    @JoinColumn(name = "location_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Location locationId;
}

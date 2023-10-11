package com.example.grupob.busquedatesoro.repositories;

import com.example.grupob.busquedatesoro.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}

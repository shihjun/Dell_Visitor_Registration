package com.example.visitorregistration.repositories;

import com.example.visitorregistration.entities.Request;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * RequestRepository
 */
public interface RequestRepository extends JpaRepository<Request, Long> {
}
package com.example.visitorregistration.repositories;

import com.example.visitorregistration.entities.Registration;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * RegistrationRepository
 */
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

}
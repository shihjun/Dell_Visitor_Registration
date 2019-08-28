package com.example.visitorregistration.repositories;

import java.util.ArrayList;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * RegistrationRepository
 */
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
  ArrayList<Registration> findByRequest(Request request, Sort sort);
}
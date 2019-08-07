package com.example.visitorregistration.repositories;

import java.util.List;

import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * RequestRepository
 */
public interface RequestRepository extends JpaRepository<Request, Long> {
  List<Request> findAllByCreatedBy(User createdBy, Sort Sort);

}
package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.RequestRepository;
import com.example.visitorregistration.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * RequestController
 */
@RestController
@RequestMapping(path = "/api")
public class RequestController {

  @Autowired
  RequestRepository requestRepository;

  @Autowired
  UserRepository userRepository;

  @GetMapping(value = "/requests", produces = "application/json")
  public List<Request> displayAllRequest() {
    return requestRepository.findAll();
  }

  @PostMapping(value = "/user/{userId}/requests")
  public void addRequestForUser(@RequestBody Request request, @PathVariable("userId") long userId,
      @RequestParam long primarycontactId, @RequestParam(required = false) long alternativeContactId) {
    User createBy = userRepository.findById(userId).orElse(new User());
    User primaryContact = userRepository.findById(primarycontactId).orElse(new User());
    User alternativeContact = userRepository.findById(alternativeContactId).orElse(new User());
    if (createBy.getId() != null && primaryContact.getId() != null) {
      request.setCreatedBy(createBy);
      request.setPrimaryContact(primaryContact);
      request.setAlternativeContact(alternativeContact);
      requestRepository.save(request);
    }

  }

}
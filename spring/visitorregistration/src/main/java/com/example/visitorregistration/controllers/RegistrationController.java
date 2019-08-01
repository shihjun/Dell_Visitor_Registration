package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.RegistrationRepository;
import com.example.visitorregistration.repositories.RequestRepository;
import com.example.visitorregistration.repositories.UserRepository;
import com.example.visitorregistration.responseFormats.RegistrationDetailsJson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * RegistrationController
 */
@RestController
@RequestMapping(path = "/api")
public class RegistrationController {

  @Autowired
  RegistrationRepository registrationRepository;

  @Autowired
  RequestRepository requestRepository;

  @Autowired
  UserRepository userRepository;

  @GetMapping(value = "/registrations", produces = "application/json")
  public List<Registration> displayAllRegistrations() {
    return registrationRepository.findAll();
  }

  @GetMapping(value = "request/{requestId}/registration", produces = "application/json")
  public RegistrationDetailsJson displayRegistrationDetails(@PathVariable long requestId) {

    RegistrationDetailsJson json = new RegistrationDetailsJson();
    Request request = requestRepository.findById(requestId).orElse(new Request());

    Registration registration = registrationRepository.findByRequest(request);
    if (registration != null) {
      User checkinBy = registration.getCheckinBy();
      User escortBy = registration.getEscortBy();
      json.setCheckinBy(checkinBy);
      json.setEscortBy(escortBy);
    }
    json.setRegistration(registration);
    json.setRequest(request);
    return json;
  }

  @PostMapping(value = "/user/{userId}/request/{requestId}/registrations")
  public void checkInForRegistration(@RequestBody Registration registration, @PathVariable("userId") Long userId,
      @PathVariable("requestId") Long requestId, @RequestParam Long escortById) {
    User createdBy = userRepository.findById(userId).orElse(new User());
    User checkinBy = userRepository.findById(userId).orElse(new User());
    User escortBy = userRepository.findById(escortById).orElse(new User());
    Request request = requestRepository.findById(requestId).orElse(new Request());
    registration.setRequest(request);
    registration.setCreatedBy(createdBy);
    registration.setCheckinBy(checkinBy);
    registration.setEscortBy(escortBy);
    registrationRepository.save(registration);
    request.setId(requestId);
    request.setStatus("Visiting");
    requestRepository.save(request);
  }

  @PostMapping(value = "/user/{userId}/registration/{registrationId}")
  public void updateOrCheckoutRegistration(@RequestBody Registration registration, @PathVariable("userId") Long userId,
      @PathVariable("registrationId") Long registrationId, @RequestParam Long escortById,
      @RequestParam(required = false) String status) {
    User updatedBy = userRepository.findById(userId).orElse(new User());
    User checkinBy = userRepository.findById(userId).orElse(new User());
    User escortBy = userRepository.findById(escortById).orElse(new User());
    Registration existingRegistration = registrationRepository.findById(registrationId).orElse(new Registration());
    Request request = requestRepository.findById(existingRegistration.getRequest().getId()).orElse(new Request());
    if (status != null) {
      registration.setCheckinBy(existingRegistration.getCheckinBy());
      registration.setEscortBy(existingRegistration.getEscortBy());
      request.setId(request.getId());
      request.setStatus(status);
      requestRepository.save(request);
    } else {
      registration.setCheckinBy(checkinBy);
      registration.setEscortBy(escortBy);
    }
    registration.setId(registrationId);
    registration.setRequest(existingRegistration.getRequest());
    registration.setCreatedBy(existingRegistration.getCreatedBy());
    registration.setUpdatedBy(updatedBy);
    registrationRepository.save(registration);

  }
}
package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.RegistrationRepository;
import com.example.visitorregistration.repositories.RequestRepository;
import com.example.visitorregistration.repositories.UserRepository;
import com.example.visitorregistration.responseFormats.RequestDetailsJson;

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

  @Autowired
  RegistrationRepository registrationRepository;

  @GetMapping(value = "/requests", produces = "application/json")
  public List<Request> displayAllRequest() {
    return requestRepository.findAll();
  }

  @GetMapping(value = "/request/{id}", produces = "application/json")
  public RequestDetailsJson displayRequestDetails(@PathVariable long id) {

    RequestDetailsJson json = new RequestDetailsJson();
    Request request = requestRepository.findById(id).orElse(new Request());
    User primaryContact = request.getPrimaryContact();
    User alternativeContact = request.getAlternativeContact();
    Registration registration = registrationRepository.findById(request.getId()).orElse(new Registration());
    if (registration.getId() != null) {
      User checkinBy = registration.getCheckinBy();
      User escortBy = registration.getEscortBy();
      json.setRegistration(registration);
      json.setCheckinBy(checkinBy);
      json.setEscortBy(escortBy);
    }
    json.setRequest(request);
    json.setPrimaryContact(primaryContact);
    json.setAlternativeContact(alternativeContact);

    return json;
  }

  @PostMapping(value = "/user/{userId}/requests")
  public void addRequestForUser(@RequestBody Request request, @PathVariable("userId") Long userId,
      @RequestParam Long primarycontactId, @RequestParam(required = false) Long alternativeContactId) {
    User createBy = userRepository.findById(userId).orElse(new User());
    User primaryContact = userRepository.findById(primarycontactId).orElse(new User());
    if (alternativeContactId != null) {
      User alternativeContact = userRepository.findById(alternativeContactId).orElse(new User());
      request.setAlternativeContact(alternativeContact);
    }
    if (createBy.getId() != null && primaryContact.getId() != null) {
      request.setCreatedBy(createBy);
      request.setPrimaryContact(primaryContact);
      requestRepository.save(request);
    }
  }

  @PostMapping(value = "/request/{requestId}")
  public void updateRequestForUser(@RequestBody Request request, @PathVariable("requestId") Long requestId,
      @RequestParam Long primarycontactId, @RequestParam(required = false) Long alternativeContactId,
      @RequestParam(required = false) String status) {
    User primaryContact = userRepository.findById(primarycontactId).orElse(new User());
    Request existingRequest = requestRepository.findById(requestId).orElse(new Request());

    if (alternativeContactId != null) {
      User alternativeContact = userRepository.findById(alternativeContactId).orElse(new User());
      request.setAlternativeContact(alternativeContact);
    }
    request.setId(requestId);
    request.setCreatedBy(existingRequest.getCreatedBy());
    request.setCreatedAt(existingRequest.getCreatedAt());
    request.setPrimaryContact(primaryContact);
    requestRepository.save(request);
  }

  @PostMapping(value = "/request/{requestId}/cancel")
  public void cancelRequestForUser(@PathVariable("requestId") Long requestId) {
    Request existingRequest = requestRepository.findById(requestId).orElse(new Request());

    existingRequest.setId(requestId);
    existingRequest.setStatus("Cancelled");
    requestRepository.save(existingRequest);
  }

}
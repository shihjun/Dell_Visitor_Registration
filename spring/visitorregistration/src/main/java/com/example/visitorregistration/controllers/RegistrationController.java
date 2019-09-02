package com.example.visitorregistration.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.RegistrationRepository;
import com.example.visitorregistration.repositories.RequestRepository;
import com.example.visitorregistration.repositories.UserRepository;
import com.example.visitorregistration.responseFormats.NullCheckoutRegistrationsJson;
import com.example.visitorregistration.responseFormats.RegistrationDetailsJson;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    return registrationRepository.findAll(Sort.by(Sort.Order.desc("checkinAt"), Sort.Order.desc("id")));
  }

  @GetMapping(value = "/registrations/nullcheckout", produces = "application/json")
  public NullCheckoutRegistrationsJson displayNullCheckoutRegistrations() {
    NullCheckoutRegistrationsJson json = new NullCheckoutRegistrationsJson();

    List<Registration> registrations = registrationRepository
        .findAll(Sort.by(Sort.Order.desc("checkinAt"), Sort.Order.desc("id")));

    ArrayList<Registration> registrationList = new ArrayList<>();
    ArrayList<Request> requestList = new ArrayList<>();

    if (registrations != null) {
      for (int i = 0; i < registrations.size(); i++) {
        if (registrations.get(i).getCheckoutAt() == null) {
          Request requestDetails = registrations.get(i).getRequest();
          registrationList.add(registrations.get(i));
          requestList.add(requestDetails);
        }
      }
      json.setRegistrations(registrationList);
      json.setRequest(requestList);
    }
    return json;
  }

  @GetMapping(value = "request/{requestId}/registrations", produces = "application/json")
  public RegistrationDetailsJson displayRegistrationDetails(@PathVariable long requestId) {

    RegistrationDetailsJson json = new RegistrationDetailsJson();
    Request request = requestRepository.findById(requestId).orElse(new Request());

    ArrayList<Registration> registrations = registrationRepository.findByRequest(request,
        Sort.by(Sort.Order.asc("checkinAt")));

    ArrayList<Registration> registrationList = new ArrayList<>();
    ArrayList<User> checkinByList = new ArrayList<>();
    ArrayList<User> escortByList = new ArrayList<>();

    if (registrations != null) {
      for (int i = 0; i < registrations.size(); i++) {
        User checkinBy = registrations.get(i).getCheckinBy();
        User escortBy = registrations.get(i).getEscortBy();
        registrationList.add(registrations.get(i));
        checkinByList.add(checkinBy);
        escortByList.add(escortBy);

      }
      json.setRegistrations(registrationList);
      json.setCheckinBy(checkinByList);
      json.setEscortBy(escortByList);
    }
    json.setRequest(request);
    return json;
  }

  @PostMapping(value = "/user/{userId}/request/{requestId}/registrations")
  public void checkInForRegistration(@RequestBody Registration registration, @PathVariable("userId") Long userId,
      @PathVariable("requestId") Long requestId, @RequestParam Long escortById) {

    User createdBy = userRepository.findById(userId).orElse(new User());
    User updatedBy = userRepository.findById(userId).orElse(new User());
    User checkinBy = userRepository.findById(userId).orElse(new User());
    User escortBy = userRepository.findById(escortById).orElse(new User());
    Request request = requestRepository.findById(requestId).orElse(new Request());
    if (request.getId() != null && escortBy.getId() != null) {
      registration.setRequest(request);
      registration.setCreatedBy(createdBy);
      registration.setUpdatedBy(updatedBy);
      registration.setCheckinBy(checkinBy);
      registration.setEscortBy(escortBy);
      registrationRepository.save(registration);
      request.setId(requestId);
      request.setStatus("On-Site");
      requestRepository.save(request);
    }
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
    if (existingRegistration.getId() != null) {
      if (status != null) {
        registration.setCheckinAt(existingRegistration.getCheckinAt());
        registration.setCheckinBy(existingRegistration.getCheckinBy());
        registration.setEscortBy(existingRegistration.getEscortBy());
        registration.setBelongings(existingRegistration.getBelongings());
        request.setId(request.getId());
        request.setStatus(status);
        requestRepository.save(request);
      } else {
        if (escortBy.getId() != null) {
          registration.setEscortBy(escortBy);
        }
        registration.setCheckinBy(checkinBy);
      }
      registration.setRequest(existingRegistration.getRequest());
      registration.setCreatedAt(existingRegistration.getCreatedAt());
      registration.setCreatedBy(existingRegistration.getCreatedBy());
      registration.setId(registrationId);
      registration.setUpdatedBy(updatedBy);
      registrationRepository.save(registration);
    }
  }
}
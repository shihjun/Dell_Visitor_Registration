package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.repositories.RequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * RequestController
 */
@RestController
@RequestMapping(path = "/api")
public class RequestController {

  @Autowired
  RequestRepository requestRepository;

  @GetMapping(value = "/request", produces = "application/json")
  public List<Request> displayAllRequest() {
    return requestRepository.findAll();
  }

  @PostMapping(value = "/request")
  public void addRequest(@RequestBody Request request) {
    requestRepository.save(request);
  }

}
package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * UserController
 */
@RestController
@RequestMapping(path = "/api")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping(value = "/users", produces = "application/json")
  public List<User> displayUsers() {
    return userRepository.findAll();
  }

  @GetMapping(value = "/user/{id}", produces = "application/json")
  public User displayUser(@PathVariable("id") long id) {
    return userRepository.findById(id).orElse(new User());
  }

}
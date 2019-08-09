package com.example.visitorregistration.controllers;

import java.util.List;

import com.example.visitorregistration.entities.User;
import com.example.visitorregistration.repositories.UserRepository;

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
 * UserController
 */
@RestController
@RequestMapping(path = "/api")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping(value = "/users", produces = "application/json")
  public List<User> displayAllUsers() {
    return userRepository.findAll(Sort.by(Sort.Order.asc("isSecurity"), Sort.Order.asc("id")));
  }

  @GetMapping(value = "/user/{id}", produces = "application/json")
  public User displayUser(@PathVariable("id") long id) {
    return userRepository.findById(id).orElse(new User());
  }

  @PostMapping(value = "/user")
  public void AddOrUpdateUser(@RequestBody User user, @RequestParam(required = false) Long userId) {
    if (userId != null) {
      User existingUser = userRepository.findById(userId).orElse(new User());
      if (existingUser.getId() != null) {
        user.setId(userId);
        userRepository.save(user);
      }
    } else {
      userRepository.save(user);
    }
  }

}
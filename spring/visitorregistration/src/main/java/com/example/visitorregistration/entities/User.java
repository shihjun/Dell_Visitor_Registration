package com.example.visitorregistration.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

/**
 * User
 */
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
// property = "id")
@Entity(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "badge_id")
  private String badgeId;

  @Column(name = "department")
  private String department;

  @Column(name = "extension")
  private String extension;

  @Column(name = "email")
  private String email;

  @Column(name = "is_security")
  private boolean isSecurity;

  // @JsonManagedReference("createdBy")
  // @OneToMany(mappedBy = "createdBy")
  // @OrderBy("id")
  // private Set<Request> createdRequests;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getBadgeId() {
    return this.badgeId;
  }

  public void setBadgeId(String badgeId) {
    this.badgeId = badgeId;
  }

  public String getDepartment() {
    return this.department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public String getExtension() {
    return this.extension;
  }

  public void setExtension(String extension) {
    this.extension = extension;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isIsSecurity() {
    return this.isSecurity;
  }

  public boolean getIsSecurity() {
    return this.isSecurity;
  }

  public void setIsSecurity(boolean isSecurity) {
    this.isSecurity = isSecurity;
  }

}
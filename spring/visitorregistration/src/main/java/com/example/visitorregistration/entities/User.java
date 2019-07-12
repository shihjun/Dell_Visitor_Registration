package com.example.visitorregistration.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * User
 */
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

  @Column(name = "phone")
  private String phone;

  @Column(name = "email")
  private String email;

  @Column(name = "isSecurity")
  private boolean isSecurity;

  @JsonManagedReference
  @OneToMany(mappedBy = "primaryContactId")
  private Set<Request> primaryContactId;

  @JsonManagedReference
  @OneToMany(mappedBy = "alternativeContactId")
  private Set<Request> alternativeContactId;

  @JsonManagedReference
  @OneToMany(mappedBy = "createdBy")
  private Set<Request> requestCreatedBy;

  @JsonManagedReference
  @OneToMany(mappedBy = "checkinBy")
  private Set<Registration> checkinBy;

  @JsonManagedReference
  @OneToMany(mappedBy = "escortBy")
  private Set<Registration> escortBy;

  @JsonManagedReference
  @OneToMany(mappedBy = "createdBy")
  private Set<Registration> registrationCreatedBy;

  @JsonManagedReference
  @OneToMany(mappedBy = "updatedBy")
  private Set<Registration> updatedBy;

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

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
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
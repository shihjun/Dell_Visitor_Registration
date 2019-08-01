package com.example.visitorregistration.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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

  @Column(name = "isSecurity")
  private boolean isSecurity;

  @JsonManagedReference("createdBy")
  @OneToMany(mappedBy = "createdBy")
  private Set<Request> createdRequests;

  // @JsonManagedReference("primaryContact")
  // @OneToMany(mappedBy = "primaryContact")
  // private Set<Request> primaryContactRequests;

  // @JsonManagedReference("alternativeContact")
  // @OneToMany(mappedBy = "alternativeContact")
  // private Set<Request> alternativeContactRequests;

  // @JsonManagedReference("checkinBy")
  // @OneToMany(mappedBy = "checkinBy")
  // private Set<Registration> CheckinByRequests;

  // @JsonManagedReference("escortBy")
  // @OneToMany(mappedBy = "escortBy")
  // private Set<Registration> EscortByRequests;

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

  // public Set<Request> getCreatedRequests() {
  // return this.createdRequests;
  // }

  // public void setCreatedRequests(Set<Request> createdRequests) {
  // this.createdRequests = createdRequests;
  // }

  // public Set<Request> getPrimaryContactRequests() {
  // return this.primaryContactRequests;
  // }

  // public void setPrimaryContactRequests(Set<Request> primaryContactRequests) {
  // this.primaryContactRequests = primaryContactRequests;
  // }

  // public Set<Request> getAlternativeContactRequests() {
  // return this.alternativeContactRequests;
  // }

  // public void setAlternativeContactRequests(Set<Request>
  // alternativeContactRequests) {
  // this.alternativeContactRequests = alternativeContactRequests;
  // }

  // public Set<Registration> getCheckinByRequests() {
  // return this.CheckinByRequests;
  // }

  // public void setCheckinByRequests(Set<Registration> CheckinByRequests) {
  // this.CheckinByRequests = CheckinByRequests;
  // }

  // public Set<Registration> getEscortByRequests() {
  // return this.EscortByRequests;
  // }

  // public void setEscortByRequests(Set<Registration> EscortByRequests) {
  // this.EscortByRequests = EscortByRequests;
  // }

}
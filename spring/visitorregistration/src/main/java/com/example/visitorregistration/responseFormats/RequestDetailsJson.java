package com.example.visitorregistration.responseFormats;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;

public class RequestDetailsJson {
  Request request;
  User primaryContact;
  User alternativeContact;

  public Request getRequest() {
    return this.request;
  }

  public void setRequest(Request request) {
    this.request = request;
  }

  public User getPrimaryContact() {
    return this.primaryContact;
  }

  public void setPrimaryContact(User primaryContact) {
    this.primaryContact = primaryContact;
  }

  public User getAlternativeContact() {
    return this.alternativeContact;
  }

  public void setAlternativeContact(User alternativeContact) {
    this.alternativeContact = alternativeContact;
  }

  public Registration getRegistration() {
    return this.registration;
  }

  public void setRegistration(Registration registration) {
    this.registration = registration;
  }

  public User getCheckinBy() {
    return this.checkinBy;
  }

  public void setCheckinBy(User checkinBy) {
    this.checkinBy = checkinBy;
  }

  public User getEscortBy() {
    return this.escortBy;
  }

  public void setEscortBy(User escortBy) {
    this.escortBy = escortBy;
  }

}

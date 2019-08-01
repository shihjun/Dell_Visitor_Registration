package com.example.visitorregistration.responseFormats;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;

public class RegistrationDetailsJson {
  Request request;
  Registration registration;
  User checkinBy;
  User escortBy;

  public Registration getRegistration() {
    return this.registration;
  }

  public void setRegistration(Registration registration) {
    this.registration = registration;
  }

  public Request getRequest() {
    return this.request;
  }

  public void setRequest(Request request) {
    this.request = request;
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

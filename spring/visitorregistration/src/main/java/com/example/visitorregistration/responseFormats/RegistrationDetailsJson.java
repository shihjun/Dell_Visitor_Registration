package com.example.visitorregistration.responseFormats;

import java.util.ArrayList;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;
import com.example.visitorregistration.entities.User;

public class RegistrationDetailsJson {
  Request request;
  ArrayList<Registration> registrations = new ArrayList<>();
  ArrayList<User> checkinBy = new ArrayList<>();
  ArrayList<User> escortBy = new ArrayList<>();

  public Request getRequest() {
    return this.request;
  }

  public void setRequest(Request request) {
    this.request = request;
  }

  public ArrayList<Registration> getRegistrations() {
    return this.registrations;
  }

  public void setRegistrations(ArrayList<Registration> registrations) {
    this.registrations = registrations;
  }

  public ArrayList<User> getCheckinBy() {
    return this.checkinBy;
  }

  public void setCheckinBy(ArrayList<User> checkinBy) {
    this.checkinBy = checkinBy;
  }

  public ArrayList<User> getEscortBy() {
    return this.escortBy;
  }

  public void setEscortBy(ArrayList<User> escortBy) {
    this.escortBy = escortBy;
  }

}

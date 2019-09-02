package com.example.visitorregistration.responseFormats;

import java.util.ArrayList;

import com.example.visitorregistration.entities.Registration;
import com.example.visitorregistration.entities.Request;

public class NullCheckoutRegistrationsJson {
  ArrayList<Registration> registrations = new ArrayList<>();
  ArrayList<Request> requests = new ArrayList<>();

  public ArrayList<Registration> getRegistrations() {
    return this.registrations;
  }

  public void setRegistrations(ArrayList<Registration> registrations) {
    this.registrations = registrations;
  }

  public ArrayList<Request> getRequest() {
    return this.requests;
  }

  public void setRequest(ArrayList<Request> request) {
    this.requests = request;
  }

}

package com.example.visitorregistration.responseFormats;

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

}

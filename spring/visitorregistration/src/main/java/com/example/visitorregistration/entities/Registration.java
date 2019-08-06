package com.example.visitorregistration.entities;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Registration
 */
@Entity(name = "registrations")
public class Registration {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @JsonBackReference("request")
  @ManyToOne
  @JoinColumn(name = "request_id")
  private Request request;

  @Column(name = "checkin_at")
  private Timestamp checkinAt;

  @Column(name = "checkout_at")
  private Timestamp checkoutAt;

  @JsonBackReference("checkinBy")
  @ManyToOne
  @JoinColumn(name = "checkin_by")
  private User checkinBy;

  @JsonBackReference("escortBy")
  @ManyToOne
  @JoinColumn(name = "escort_by")
  private User escortBy;

  @Column(name = "belongings")
  private String belongings;

  @Column(name = "created_at")
  private Timestamp createdAt;

  @JsonBackReference("createdBy")
  @ManyToOne
  @JoinColumn(name = "created_by")
  private User createdBy;

  @Column(name = "updated_at")
  private Timestamp updatedAt;

  @JsonBackReference("updatedBy")
  @ManyToOne
  @JoinColumn(name = "updated_by")
  private User updatedBy;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Request getRequest() {
    return this.request;
  }

  public void setRequest(Request request) {
    this.request = request;
  }

  public Timestamp getCheckinAt() {
    return this.checkinAt;
  }

  public void setCheckinAt(Timestamp checkinAt) {
    this.checkinAt = checkinAt;
  }

  public Timestamp getCheckoutAt() {
    return this.checkoutAt;
  }

  public void setCheckoutAt(Timestamp checkoutAt) {
    this.checkoutAt = checkoutAt;
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

  public String getBelongings() {
    return this.belongings;
  }

  public void setBelongings(String belongings) {
    this.belongings = belongings;
  }

  public Timestamp getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public User getCreatedBy() {
    return this.createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public Timestamp getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

  public User getUpdatedBy() {
    return this.updatedBy;
  }

  public void setUpdatedBy(User updatedBy) {
    this.updatedBy = updatedBy;
  }
}
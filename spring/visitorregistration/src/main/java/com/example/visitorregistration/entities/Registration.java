package com.example.visitorregistration.entities;

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

  @Column(name = "request_id")
  private Long requestId;

  @Column(name = "checkin_at")
  private String checkinAt;

  @Column(name = "checkout_at")
  private String checkoutAt;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "checkin_by")
  private User checkinBy;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "escort_by")
  private User escortBy;

  @Column(name = "belongings")
  private String belongings;

  @Column(name = "created_at")
  private String createdAt;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "created_by")
  private User createdBy;

  @Column(name = "updated_at")
  private String updatedAt;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "updated_by")
  private User updatedBy;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getRequestId() {
    return this.requestId;
  }

  public void setRequestId(Long requestId) {
    this.requestId = requestId;
  }

  public String getCheckinAt() {
    return this.checkinAt;
  }

  public void setCheckinAt(String checkinAt) {
    this.checkinAt = checkinAt;
  }

  public String getCheckoutAt() {
    return this.checkoutAt;
  }

  public void setCheckoutAt(String checkoutAt) {
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

  public String getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public User getCreatedBy() {
    return this.createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public String getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public User getUpdatedBy() {
    return this.updatedBy;
  }

  public void setUpdatedBy(User updatedBy) {
    this.updatedBy = updatedBy;
  }
}
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
 * Request
 */
@Entity(name = "requests")
public class Request {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "ic")
  private String ic;

  @Column(name = "phone")
  private String phone;

  @Column(name = "car_plate")
  private String carPlate;

  @Column(name = "visit_from")
  private Timestamp visitFrom;

  @Column(name = "visit_to")
  private Timestamp visitTo;

  @Column(name = "purpose")
  private String purpose;

  @Column(name = "status")
  private String status;

  @Column(name = "primary_contact_phone")
  private String primaryContactPhone;

  @Column(name = "alternative_contact_phone")
  private String alternativeContactPhone;

  @JsonBackReference("createdBy")
  @ManyToOne
  @JoinColumn(name = "created_by")
  private User createdBy;

  @JsonBackReference("primaryContact")
  @ManyToOne
  @JoinColumn(name = "primary_contact_id")
  private User primaryContact;

  @JsonBackReference("alternativeContact")
  @ManyToOne
  @JoinColumn(name = "alternative_contact_id")
  private User alternativeContact;

  @Column(name = "created_at")
  private Timestamp createdAt;

  @Column(name = "updated_at")
  private Timestamp updatedAt;

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

  public String getIc() {
    return this.ic;
  }

  public void setIc(String ic) {
    this.ic = ic;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getCarPlate() {
    return this.carPlate;
  }

  public void setCarPlate(String carPlate) {
    this.carPlate = carPlate;
  }

  public Timestamp getVisitFrom() {
    return this.visitFrom;
  }

  public void setVisitFrom(Timestamp visitFrom) {
    this.visitFrom = visitFrom;
  }

  public Timestamp getVisitTo() {
    return this.visitTo;
  }

  public void setVisitTo(Timestamp visitTo) {
    this.visitTo = visitTo;
  }

  public String getPurpose() {
    return this.purpose;
  }

  public void setPurpose(String purpose) {
    this.purpose = purpose;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Timestamp getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public Timestamp getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

  public User getCreatedBy() {
    return this.createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
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

  public String getPrimaryContactPhone() {
    return this.primaryContactPhone;
  }

  public void setPrimaryContactPhone(String primaryContactPhone) {
    this.primaryContactPhone = primaryContactPhone;
  }

  public String getAlternativeContactPhone() {
    return this.alternativeContactPhone;
  }

  public void setAlternativeContactPhone(String alternativeContactPhone) {
    this.alternativeContactPhone = alternativeContactPhone;
  }

}
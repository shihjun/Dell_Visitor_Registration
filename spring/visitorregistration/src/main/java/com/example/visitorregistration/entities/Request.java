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
  private String visitFrom;

  @Column(name = "visit_to")
  private String visitTo;

  @Column(name = "purpose")
  private String purpose;

  @Column(name = "department")
  private String department;

  @Column(name = "status")
  private String status;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "primary_contact_id")
  private User primaryContactId;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "alternative_contact_id")
  private User alternativeContactId;

  @Column(name = "created_at")
  private String createdAt;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "created_by")
  private User createdBy;

  @Column(name = "updated_at")
  private String updatedAt;

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

  public String getVisitFrom() {
    return this.visitFrom;
  }

  public void setVisitFrom(String visitFrom) {
    this.visitFrom = visitFrom;
  }

  public String getVisitTo() {
    return this.visitTo;
  }

  public void setVisitTo(String visitTo) {
    this.visitTo = visitTo;
  }

  public String getPurpose() {
    return this.purpose;
  }

  public void setPurpose(String purpose) {
    this.purpose = purpose;
  }

  public String getDepartment() {
    return this.department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public User getPrimaryContactId() {
    return this.primaryContactId;
  }

  public void setPrimaryContactId(User primaryContactId) {
    this.primaryContactId = primaryContactId;
  }

  public User getAlternativeContactId() {
    return this.alternativeContactId;
  }

  public void setAlternativeContactId(User alternativeContactId) {
    this.alternativeContactId = alternativeContactId;
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
}
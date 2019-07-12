import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Requests } from "./Requests";
import { Registrations } from "./Registrations";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  badge_id: string;

  @Column()
  department: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  isSecurity: boolean;

  @OneToMany(type => Requests, request => request.primaryContactId)
  requestPrimaryContact: Requests[];

  @OneToMany(type => Requests, request => request.alternativeContactId)
  requestAlternativeContact: Requests[];

  @OneToMany(type => Requests, request => request.createdBy)
  requestCreatedBy: Requests[];

  @OneToMany(type => Registrations, registration => registration.checkinBy)
  registrationCheckinBy: Registrations[];

  @OneToMany(type => Registrations, registration => registration.escortBy)
  registrationEscortBy: Registrations[];

  @OneToMany(type => Registrations, registration => registration.createdBy)
  registrationCreatedBy: Registrations[];

  @OneToMany(type => Registrations, registration => registration.updatedBy)
  registrationUpdatedBy: Registrations[];
}

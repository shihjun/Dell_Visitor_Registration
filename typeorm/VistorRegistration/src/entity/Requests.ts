import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ic: string;

  @Column()
  phone: string;

  @Column()
  car_plate: string;

  @Column("timestamp")
  visit_from;

  @Column("timestamp")
  visit_to;

  @Column()
  purpose: string;

  @Column()
  department: string;

  @Column()
  status: string;

  @Column()
  primary_contact_id: number;

  @Column()
  primary_contact_phone: string;

  @Column()
  alternative_contact_id: number;

  @Column()
  alternative_contact_phone: string;

  @Column("timestamp")
  created_at;

  @Column()
  created_by: number;

  @Column("timestamp")
  updated_at;

  @ManyToOne(type => Users, user => user.requestPrimaryContact)
  @JoinColumn({ name: "primary_contact_id" })
  primaryContactId: Users;

  @ManyToOne(type => Users, user => user.requestAlternativeContact)
  @JoinColumn({ name: "alternative_contact_id" })
  alternativeContactId: Users;

  @ManyToOne(type => Users, user => user.requestCreatedBy)
  @JoinColumn({ name: "created_by" })
  createdBy: Users;
}

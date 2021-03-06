import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Requests } from "./Requests";
import { Users } from "./Users";
import { request } from "http";

@Entity()
export class Registrations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_id: number;

  @Column("timestamp")
  checkin_at;

  @Column("timestamp", { nullable: true })
  checkout_at;

  @Column()
  checkin_by: number;

  @Column()
  escort_by: number;

  @Column({ nullable: true })
  belongings: string;

  @Column("timestamp")
  created_at;

  @Column()
  created_by: number;

  @Column("timestamp")
  updated_at;

  @Column()
  updated_by: number;

  @ManyToOne(type => Requests, request => request.registrationId)
  @JoinColumn({ name: "request_id" })
  requestId: Requests;

  @ManyToOne(type => Users, user => user.registrationCheckinBy)
  @JoinColumn({ name: "checkin_by" })
  checkinBy: Users;

  @ManyToOne(type => Users, user => user.registrationEscortBy)
  @JoinColumn({ name: "escort_by" })
  escortBy: Users;

  @ManyToOne(type => Users, user => user.registrationCreatedBy)
  @JoinColumn({ name: "created_by" })
  createdBy: Users;

  @ManyToOne(type => Users, user => user.registrationUpdatedBy)
  @JoinColumn({ name: "updated_by" })
  updatedBy: Users;
}

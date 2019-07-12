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

@Entity()
export class Registrations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_id: number;

  @Column("datetime")
  checkin_at;

  @Column("datetime")
  checkout_at;

  @Column()
  checkin_by: number;

  @Column()
  escort_by: number;

  @Column()
  belongings: string;

  @Column("datetime")
  created_at;

  @Column()
  created_by: number;

  @Column("datetime")
  updated_at;

  @Column()
  updated_by: number;

  @OneToOne(type => Requests)
  @JoinColumn({ name: "request_id" })
  requests: Requests;

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

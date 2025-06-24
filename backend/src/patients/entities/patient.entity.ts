import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Appointment } from "../../appointments/entities/appointment.entity"
import { MedicalRecord } from "../../medical-records/entities/medical-record.entity"

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @ManyToOne(
    () => User,
    (user) => user.patients,
  )
  @JoinColumn({ name: "userId" })
  user: User

  @Column({ nullable: true })
  emergencyContact: string

  @Column({ nullable: true })
  emergencyPhone: string

  @Column({ type: "text", nullable: true })
  notes: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.patient,
  )
  appointments: Appointment[]

  @OneToMany(
    () => MedicalRecord,
    (record) => record.patient,
  )
  medicalRecords: MedicalRecord[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

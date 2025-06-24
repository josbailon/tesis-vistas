import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Exclude } from "class-transformer"
import { Patient } from "../../patients/entities/patient.entity"
import { Appointment } from "../../appointments/entities/appointment.entity"
import { MedicalRecord } from "../../medical-records/entities/medical-record.entity"

export enum UserRole {
  ADMIN = "admin",
  PROFESSOR = "professor",
  STUDENT = "student",
  SECRETARY = "secretary",
  PATIENT = "patient",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  name: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  specialty: string

  @Column({ nullable: true })
  studentId: string

  @Column({ nullable: true })
  professorId: string

  @Column({ type: "text", nullable: true })
  address: string

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date

  @Column({ type: "text", nullable: true })
  allergies: string

  @Column({ type: "text", nullable: true })
  medicalHistory: string

  @OneToMany(
    () => Patient,
    (patient) => patient.user,
  )
  patients: Patient[]

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.patient,
  )
  patientAppointments: Appointment[]

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.student,
  )
  studentAppointments: Appointment[]

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.professor,
  )
  professorAppointments: Appointment[]

  @OneToMany(
    () => MedicalRecord,
    (record) => record.patient,
  )
  patientRecords: MedicalRecord[]

  @OneToMany(
    () => MedicalRecord,
    (record) => record.student,
  )
  studentRecords: MedicalRecord[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

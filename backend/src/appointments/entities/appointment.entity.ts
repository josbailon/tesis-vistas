import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Patient } from "../../patients/entities/patient.entity"

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum AppointmentPriority {
  LOW = "low",
  NORMAL = "normal",
  HIGH = "high",
  URGENT = "urgent",
}

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  patientId: string

  @Column({ nullable: true })
  studentId: string

  @Column({ nullable: true })
  professorId: string

  @Column({ type: "datetime" })
  appointmentDate: Date

  @Column({ type: "int", default: 60 })
  duration: number

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus

  @Column({
    type: "enum",
    enum: AppointmentPriority,
    default: AppointmentPriority.NORMAL,
  })
  priority: AppointmentPriority

  @Column()
  treatmentType: string

  @Column({ nullable: true })
  specialty: string

  @Column({ type: "text", nullable: true })
  notes: string

  @Column({ type: "text", nullable: true })
  reason: string

  @ManyToOne(
    () => Patient,
    (patient) => patient.appointments,
  )
  @JoinColumn({ name: "patientId" })
  patient: Patient

  @ManyToOne(
    () => User,
    (user) => user.studentAppointments,
  )
  @JoinColumn({ name: "studentId" })
  student: User

  @ManyToOne(
    () => User,
    (user) => user.professorAppointments,
  )
  @JoinColumn({ name: "professorId" })
  professor: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

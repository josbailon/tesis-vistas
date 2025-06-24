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

@Entity("medical_records")
export class MedicalRecord {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  patientId: string

  @Column()
  studentId: string

  @Column({ nullable: true })
  professorId: string

  @Column()
  title: string

  @Column({ type: "text" })
  description: string

  @Column()
  recordType: string

  @Column()
  specialty: string

  @Column({ type: "text", nullable: true })
  treatment: string

  @Column({ type: "text", nullable: true })
  diagnosis: string

  @Column({ type: "json", nullable: true })
  odontogram: any

  @Column({ type: "json", nullable: true })
  attachments: string[]

  @ManyToOne(
    () => Patient,
    (patient) => patient.medicalRecords,
  )
  @JoinColumn({ name: "patientId" })
  patient: Patient

  @ManyToOne(
    () => User,
    (user) => user.studentRecords,
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

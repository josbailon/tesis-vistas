import { Injectable, NotFoundException } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Patient } from "./entities/patient.entity"
import type { CreatePatientDto } from "./dto/create-patient.dto"
import type { UpdatePatientDto } from "./dto/update-patient.dto"

@Injectable()
export class PatientsService {
  constructor(private patientsRepository: Repository<Patient>) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto)
    return this.patientsRepository.save(patient)
  }

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find({
      relations: ["user", "appointments", "medicalRecords"],
    })
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ["user", "appointments", "medicalRecords"],
    })

    if (!patient) {
      throw new NotFoundException("Paciente no encontrado")
    }

    return patient
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id)
    Object.assign(patient, updatePatientDto)
    return this.patientsRepository.save(patient)
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id)
    await this.patientsRepository.remove(patient)
  }

  async findByUserId(userId: string): Promise<Patient> {
    return this.patientsRepository.findOne({
      where: { userId },
      relations: ["user", "appointments", "medicalRecords"],
    })
  }
}

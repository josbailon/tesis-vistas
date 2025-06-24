import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"
import type { PatientsService } from "./patients.service"
import type { CreatePatientDto } from "./dto/create-patient.dto"
import type { UpdatePatientDto } from "./dto/update-patient.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Patients")
@Controller("patients")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new patient" })
  create(createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto)
  }

  @Get()
  @ApiOperation({ summary: "Get all patients" })
  findAll() {
    return this.patientsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update patient" })
  update(@Param('id') id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get patient by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.patientsService.findByUserId(userId);
  }
}

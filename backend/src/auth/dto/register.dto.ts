import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "../../users/entities/user.entity"

export class RegisterDto {
  @ApiProperty({ example: "usuario@clinica.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: "password123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty({ example: "Juan Pérez" })
  @IsNotEmpty()
  name: string

  @ApiProperty({ enum: UserRole, example: UserRole.PATIENT })
  @IsEnum(UserRole)
  role: UserRole

  @ApiProperty({ required: false })
  @IsOptional()
  phone?: string

  @ApiProperty({ required: false })
  @IsOptional()
  specialty?: string

  @ApiProperty({ required: false })
  @IsOptional()
  studentId?: string
}

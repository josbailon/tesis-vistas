import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { PatientsModule } from "./patients/patients.module"
import { AppointmentsModule } from "./appointments/appointments.module"
import { MedicalRecordsModule } from "./medical-records/medical-records.module"
import { TreatmentsModule } from "./treatments/treatments.module"
import { SpecialtiesModule } from "./specialties/specialties.module"
import { FilesModule } from "./files/files.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "dental_clinic",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV !== "production",
      logging: process.env.NODE_ENV === "development",
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    TreatmentsModule,
    SpecialtiesModule,
    FilesModule,
  ],
})
export class AppModule {}

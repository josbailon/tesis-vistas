import { Injectable, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { UsersService } from "../users/users.service"
import * as bcrypt from "bcryptjs"
import type { LoginDto } from "./dto/login.dto"
import type { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas")
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        specialty: user.specialty,
      },
    }
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    })

    const { password, ...result } = user
    return result
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findOne(userId)
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"
import type { AuthService } from "./auth.service"
import type { LoginDto } from "./dto/login.dto"
import type { RegisterDto } from "./dto/register.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "User login" })
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post("register")
  @ApiOperation({ summary: "User registration" })
  async register(registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.userId);
  }
}

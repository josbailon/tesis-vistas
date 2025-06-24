import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { User } from "./entities/user.entity"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    })

    if (existingUser) {
      throw new ConflictException("El email ya está registrado")
    }

    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ["id", "email", "name", "role", "status", "phone", "specialty", "createdAt"],
    })
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ["id", "email", "name", "role", "status", "phone", "specialty", "createdAt"],
    })

    if (!user) {
      throw new NotFoundException("Usuario no encontrado")
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    Object.assign(user, updateUserDto)
    return this.usersRepository.save(user)
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id)
    await this.usersRepository.remove(user)
  }

  async findByRole(role: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: role as any },
      select: ["id", "email", "name", "role", "status", "phone", "specialty", "createdAt"],
    })
  }
}

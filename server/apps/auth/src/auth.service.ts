import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { NewUserDto } from './dtos/new-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDto>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = user;
    const existingUser = this.findByEmail(email);
    if (!existingUser) throw new ConflictException('An account with this email already exists');

    const hashedPassword = await this.hashPassword(password);
    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    delete savedUser.password;

    return savedUser;
  }
}

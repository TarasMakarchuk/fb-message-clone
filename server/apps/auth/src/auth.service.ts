import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@app/shared/entities/user.entity';
import { NewUserDto } from './dtos/new-user.dto';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from '@app/shared/interfaces/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,

    private readonly jwtService: JwtService,
  ) {}

  async getUsers() {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByCondition({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDto>): Promise<UserEntity> {
    const { firstName, lastName, email, password } = user;
    const existingUser = await this.findByEmail(email);
    if (existingUser) throw new ConflictException('An account with this email already exists');

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

  async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);
    if (!doesPasswordMatch) return null;

    return user;
  }

  async login(existingUser: Readonly<ExistingUserDto>) {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

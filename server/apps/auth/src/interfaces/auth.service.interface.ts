import { UserEntity } from '@app/shared/entities/user.entity';
import { NewUserDto } from '../dtos/new-user.dto';
import { ExistingUserDto } from '../dtos/existing-user.dto';

export interface AuthServiceInterface {
  getUsers(): Promise<UserEntity[]>;
  findByEmail(email: string): Promise<UserEntity>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDto>): Promise<UserEntity>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<UserEntity>;
  login(existingUser: Readonly<ExistingUserDto>);
  verifyJwt(jwt: string): Promise<{ exp: number }>;
}

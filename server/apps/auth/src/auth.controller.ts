import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { NewUserDto } from './dtos/new-user.dto';
import { ExistingUserDto } from './dtos/existing-user.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext, @Payload() user: NewUserDto) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.register(user);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Ctx() context: RmqContext, @Payload() user: ExistingUserDto) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(@Ctx() context: RmqContext, @Payload() payload: { jwt: string }) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'decode-jwt' })
  @UseGuards(JwtGuard)
  async decodeJwt(@Ctx() context: RmqContext, @Payload() payload: { jwt: string }) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }

  @MessagePattern({ cmd: 'add-friend' })
  @UseGuards(JwtGuard)
  async addFriend(@Ctx() context: RmqContext, @Payload() payload: { userId: number; friendId: number }) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.addFriend(payload.userId, payload.friendId);
  }

  @MessagePattern({ cmd: 'get-friends' })
  @UseGuards(JwtGuard)
  async getFriends(@Ctx() context: RmqContext, @Payload() payload: { userId: number }) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getFriends(payload.userId);
  }
}

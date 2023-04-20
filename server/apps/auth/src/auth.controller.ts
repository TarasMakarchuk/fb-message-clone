import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { NewUserDto } from './dtos/new-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly sharedService: SharedService) {}

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
}

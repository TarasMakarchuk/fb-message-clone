import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly sharedService: SharedService
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.createUser();
  }
}

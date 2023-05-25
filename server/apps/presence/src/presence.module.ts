import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { SharedModule, SharedService } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
  ],
  controllers: [PresenceController],
  providers: [PresenceService, SharedService, ConfigService],
})
export class PresenceModule {}

import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { SharedService } from '@app/shared';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [PresenceController],
  providers: [PresenceService, SharedService, ConfigService],
})
export class PresenceModule {}

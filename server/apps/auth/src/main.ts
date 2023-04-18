import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();
}

bootstrap();

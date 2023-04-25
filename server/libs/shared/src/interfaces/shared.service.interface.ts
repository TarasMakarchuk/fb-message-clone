import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface SharedServiceInterface {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(content: RmqContext): void;
}

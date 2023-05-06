import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@app/shared/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequestsRepositoryInterface } from '@app/shared/interfaces/friend-request.repository.interface';
import { FriendRequestEntity } from '@app/shared/entities/friend-request.entity';

@Injectable()
export class FriendRequestsRepository
  extends BaseAbstractRepository<FriendRequestEntity>
  implements FriendRequestsRepositoryInterface
{
  constructor(
    @InjectRepository(FriendRequestEntity)
    private readonly FriendRequestRepository: Repository<FriendRequestEntity>,
  ) {
    super(FriendRequestRepository);
  }
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/shared';

@Entity('friend-requests')
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.friendRequestCreator)
  creator: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.friendRequestReceiver)
  receiver: UserEntity;
}

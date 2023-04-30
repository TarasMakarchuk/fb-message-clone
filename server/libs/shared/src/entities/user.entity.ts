import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendRequestEntity } from '@app/shared/entities/friend-request.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.creator)
  friendRequestCreator: FriendRequestEntity[];

  @OneToMany(() => FriendRequestEntity, (friendRequestEntity) => friendRequestEntity.receiver)
  friendRequestReceiver: FriendRequestEntity[];
}

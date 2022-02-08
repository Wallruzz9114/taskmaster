import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../modules/users/entities/user';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.tasks)
  user: User;

  constructor(
    id: number,
    name: string,
    description: string,
    isActive: boolean,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    user: User
  ) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.isActive = isActive),
      (this.isDeleted = isDeleted),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt),
      (this.user = user);
  }
}

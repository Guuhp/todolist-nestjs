import { Status } from './../enum/task.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_table')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  status: Status = Status.PENDING;
}

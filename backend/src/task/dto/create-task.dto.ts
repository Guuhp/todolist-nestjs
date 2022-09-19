import { Status } from './../enum/task.enum';
export class CreateTaskDto {
  id: string;

  description: string;

  status: Status;
}

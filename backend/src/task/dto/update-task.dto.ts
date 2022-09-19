import { Status } from './../enum/task.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({
    message: 'Inform a valid description',
  })
  description: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}

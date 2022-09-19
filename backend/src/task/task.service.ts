import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Status } from './enum/task.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  //----------------------------------------------------------------------------->
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      createTaskDto.status = Status.PENDING;
      await this.taskRepository.save(createTaskDto);
      delete createTaskDto.id;
      return createTaskDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the user in database',
      );
    }
  }
  //----------------------------------------------------------------------------->
  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible to find all users');
    }
  }
  //----------------------------------------------------------------------------->
  async findOneById(id: string): Promise<Task> {
    const task = this.taskRepository
      .createQueryBuilder('task')
      .select(['task.description', 'task.status'])
      .where('task.id = :id', { id: id })
      .getOne();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
  //----------------------------------------------------------------------------->
  async findOneByDescription(description: string): Promise<Task> {
    const task = this.taskRepository
      .createQueryBuilder('task')
      .select(['task.description', 'task.status'])
      .where('task.description = :description', { description: description })
      .getOne();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
  //----------------------------------------------------------------------------->
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    const { description, status } = updateTaskDto;
    task.description = description ? description : task.description;
    task.status = status ? status : task.status;
    try {
      await this.taskRepository.save(task);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the task in database',
      );
    }
  }
  //----------------------------------------------------------------------------->
  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Not found a task with the informed ID');
    }
  }
  //----------------------------------------------------------------------------->
}

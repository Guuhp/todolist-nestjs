import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  showMessage(): string {
    return 'Here comes the User';
  }

  @Get('/list')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOneUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Get('/email/:email')
  @UseGuards(AuthGuard())
  findOneUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<string> {
    await this.userService.remove(id);
    return 'The User was successfully Removed';
  }
}

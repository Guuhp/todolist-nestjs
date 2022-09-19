import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { CredentialsDto } from './../user/dto/credentials.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.confirmationPassword) {
      throw new UnprocessableEntityException("The passwords don't match");
    } else {
      return this.userRepository.create(createUserDto);
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userService.checkCredential(credentialsDto);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwtPayload = {
      is: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);
    return { token };
  }
}

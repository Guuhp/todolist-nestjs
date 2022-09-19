import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Inform a valid username',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Inform a valid email address',
    },
  )
  email: string;

  @IsOptional()
  status: boolean;
}

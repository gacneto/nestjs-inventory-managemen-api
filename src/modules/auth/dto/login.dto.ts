import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'exemplo@gmail.com',
    description: 'E-mail de login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: 'Senha de login' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

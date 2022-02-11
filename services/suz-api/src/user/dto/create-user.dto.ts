import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Length(3, 20)
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone?: string;
}

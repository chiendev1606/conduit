import { CompareConfirmPassword } from '@conduit/validator/compare-confirm-password.validator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @CompareConfirmPassword()
  password: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @CompareConfirmPassword()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

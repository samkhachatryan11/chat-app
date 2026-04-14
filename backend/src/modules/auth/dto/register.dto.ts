import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { IsMatch } from '@root/common/utils/validator.util';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(300)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/,
    {
      message: 'Invalid password',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsMatch('password', {
    message: "Passwords don't match",
  })
  confirmPassword: string;
}

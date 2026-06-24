import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @IsString()
  @MaxLength(600)
  bio: string;
}

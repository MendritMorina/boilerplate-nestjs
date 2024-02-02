import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Image } from "../../images/entities/image.entity";

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  thumbnail: Image;

  @IsOptional()
  status: number;

  @IsOptional()
  user: User;
}

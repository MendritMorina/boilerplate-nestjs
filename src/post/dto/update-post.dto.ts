import { Image } from "../../images/entities/image.entity";
import { IsOptional } from "class-validator";

export class UpdatePostDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  thumbnail: Image;

  @IsOptional()
  status: number;
}

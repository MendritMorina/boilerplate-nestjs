import { IsOptional } from "class-validator";

export class FilterPostDto {
  @IsOptional()
  page:string;

  @IsOptional()
  items_per_page:string;

  @IsOptional()
  search:string;

  @IsOptional()
  category:string;
}

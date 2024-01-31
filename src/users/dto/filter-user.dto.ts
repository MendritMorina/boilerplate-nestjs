import { IsOptional } from "class-validator";

export class FilterUserDto {
  @IsOptional()
  page: string;
  @IsOptional()
  itemsPerPage: string;
  @IsOptional()
  search:string;
}
